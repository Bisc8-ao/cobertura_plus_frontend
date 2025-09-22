import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    APIProvider,
    Map as GoogleMap,
    Marker,
    useMap,
} from "@vis.gl/react-google-maps";

import { vectorImages } from "../../../assets";
import { InputAdornment } from "@mui/material";
import { Button, Loader } from "../../../components";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { lotties } from "../../../assets";
import { UseCheckCoverage, UseTimeoutEffect, UseUserIp } from "../../../hooks";
import * as Styled from "../../../styles";

// ---- Funções utilitárias para corrigir GeoJSON ----
function closePolygon(coords) {
    if (!coords.length) return coords;
    const first = coords[0];
    const last = coords[coords.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) {
        coords.push([...first]); // fecha o polígono
    }
    return coords;
}

function fixGeoJson(geojson) {
    const fixed = JSON.parse(JSON.stringify(geojson));
    fixed.features.forEach((f) => {
        if (f.geometry.type === "Polygon") {
            f.geometry.coordinates = f.geometry.coordinates.map(closePolygon);
        }
        if (f.geometry.type === "MultiPolygon") {
            f.geometry.coordinates = f.geometry.coordinates.map((poly) =>
                poly.map(closePolygon)
            );
        }
    });
    return fixed;
}

// --- COMPONENTE QUE LIDA COM O GEOJSON ---
function MapWithGeoJson({ onLoad, onZoneClick }) {
    const map = useMap();
    const [geodata, setGeodata] = useState(null);
    const API_URL = (window.__RUNTIME__ && window.__RUNTIME__.VITE_API_KEY_GOOGLE) || import.meta.env.VITE_API_URL;

    useEffect(() => {
        const url_api = `${API_URL}/api/coverage/areas`;
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const response = await fetch(url_api, {
                    signal: controller.signal,
                });
                const data = await response.json();
                if (data.type === "FeatureCollection") {
                    setGeodata(data);
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Erro ao buscar dados:", error);
                }
            }
        };

        fetchData();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        if (!map || !geodata?.features) return;

        const fixedGeo = fixGeoJson(geodata);

        // Limpa dados anteriores
        map.data.forEach((f) => map.data.remove(f));

        // Adiciona GeoJSON corrigido
        map.data.addGeoJson(fixedGeo);

        // Estilo
        map.data.setStyle(() => {
            const colors = ["#04fde8ff"];
            const randomColor =
                colors[Math.floor(Math.random() * colors.length)];
            return {
                fillColor: randomColor,
                fillOpacity: 0.3,
                strokeColor: randomColor,
                strokeWeight: 2,
            };
        });

        // Clique em polígono → chama callback para marcar posição
        map.data.addListener("click", (e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();

            if (onZoneClick) {
                onZoneClick({ lat, lng });
            }
        });

        // Ajustar bounds
        const bounds = new window.google.maps.LatLngBounds();
        fixedGeo.features.forEach((f) => {
            if (f.geometry.type === "Polygon") {
                f.geometry.coordinates[0].forEach(([lng, lat]) => {
                    bounds.extend(new window.google.maps.LatLng(lat, lng));
                });
            }
            if (f.geometry.type === "MultiPolygon") {
                f.geometry.coordinates.forEach((polygon) => {
                    polygon[0].forEach(([lng, lat]) => {
                        bounds.extend(new window.google.maps.LatLng(lat, lng));
                    });
                });
            }
        });
        map.fitBounds(bounds);

        if (onLoad) {
            onLoad(map);
        }
    }, [map, geodata, onLoad, onZoneClick]);

    return null;
}

function MapWithUserLocation({ userLocation }) {
     const [location, setLocation] = useState({});
    const { checkCoverage: rawCheckCoverage } = UseCheckCoverage();
    const { getIpUser } = UseUserIp();
    const map = useMap();

    const checkCoverage = useCallback(
        (payload) => rawCheckCoverage(payload),
        [rawCheckCoverage]
    );

   useEffect(() => {
       if (map && userLocation?.lat && userLocation?.lng) {
           const checkCoveraged = async () => {
               const payload = {
                   getIpUser,
                   userLat: userLocation.lat,
                   userLon: userLocation.lng,
               };

               const result = await checkCoverage(payload);

               setLocation({
                   lat: result.userLat,
                   lng: result.userLon,
                   ip: result.userIp,
                   covered: result.covered ?? false,
               });
           };

           checkCoveraged();

           map.setCenter(userLocation);
           map.setZoom(16);
       }
   }, [map, userLocation, checkCoverage, getIpUser]);


    return userLocation?.lat && userLocation?.lng ? (
        <Marker
            position={userLocation}
            icon={
                {
                    url:
                        location.corvaged === false
                            ? vectorImages.icons.PinHasNoCoverage
                            : vectorImages.icons.PinHasCoverage,
                    scaledSize: new window.google.maps.Size(48, 48),
                    anchor: new window.google.maps.Point(24, 48),
                }
            }
        />
    ) : null;
}

// --- MAPA PRINCIPAL ---
function Sandbox() {
    const [markerPos, setMarkerPos] = useState(null);
    const API_KEY_GOOGLEMAPS = (window.__RUNTIME__ && window.__RUNTIME__.VITE_API_KEY_GOOGLE) || import.meta.env.VITE_API_KEY_GOOGLE;

    const [userLoctaion, setUserLocation] = useState({});
    const { showAvalibe, setShowAvalibe, showVerific } = UseTimeoutEffect();
    const { checkCoverage } = UseCheckCoverage();
    const { getIpUser } = UseUserIp();
    const [location, setLocation] = useState({});

    // clique no mapa fora das zonas
    const handleMapClick = async (event) => {
        const lat = event.detail.latLng.lat;
        const lng = event.detail.latLng.lng;
        setMarkerPos({ lat, lng });
        setShowAvalibe(true);

        if (lat && lng && getIpUser) {
            const payload = {
                userIp: getIpUser,
                userLat: lat,
                userLon: lng,
            };

            const result = await checkCoverage(payload);

            setLocation({
                lat: result.userLat,
                lng: result.userLon,
                ip: result.userIp,
                corvaged: false,
            });
        }
    };

    // clique dentro da zona (GeoJSON)
    const handleZoneClick = async (pos) => {
        console.log(pos);
        setMarkerPos(pos);
        setShowAvalibe(true);
        if (pos.lat && pos.lng && getIpUser) {
            const payload = {
                userIp: getIpUser,
                userLat: pos.lat,
                userLon: pos.lng,
            };

            const result = await checkCoverage(payload);

            setLocation({
                lat: result.userLat,
                lng: result.userLon,
                ip: result.userIp,
                corvaged: result.available,
            });
        }
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            return;
        }

        if (!navigator.geolocation) return;

        const watcher = navigator.geolocation.watchPosition(
            (pos) => {
                console.log(pos.coords.latitude, pos.coords.longitude);
                setUserLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            },
            (err) => {
                console.error("Erro:", err);
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
        );

        return () => navigator.geolocation.clearWatch(watcher);
    }, []);

    const memoizedUserLocation = useMemo(
        () =>
            userLoctaion
                ? { lat: userLoctaion.lat, lng: userLoctaion.lng }
                : null,
        [userLoctaion]
    );
    console.log(markerPos)

    return (
        <React.Fragment>
            <Styled.Sand_Wrapper>
                {showAvalibe && (
                    <Loader
                        Animation={lotties.MarkAnimation}
                        width="20%"
                        bg={true}
                    />
                )}

                <APIProvider apiKey={API_KEY_GOOGLEMAPS}>
                    <GoogleMap
                        style={{ width: "100%", height: "100vh" }}
                        defaultCenter={{ lat: -8.8383, lng: 13.2344 }}
                        defaultZoom={12}
                        gestureHandling="greedy"
                        minZoom={4.5}
                        disableDefaultUI
                        onClick={(e) => handleMapClick(e)}
                    >
                        {markerPos === null && (
                            <MapWithUserLocation
                                userLocation={memoizedUserLocation}
                            />
                        )}
                        <MapWithGeoJson
                            onZoneClick={handleZoneClick}
                            onLoad={(map) => {
                                if (
                                    map &&
                                    userLoctaion?.lat &&
                                    userLoctaion?.lng
                                ) {
                                    map.setCenter(userLoctaion);
                                    map.setZoom(15);
                                }
                            }}
                        />
                        {markerPos && (
                            <Marker
                                position={markerPos}
                                icon={
                                    showVerific === false && {
                                        url:
                                            location.corvaged === false
                                                ? vectorImages.icons
                                                      .PinHasNoCoverage
                                                : vectorImages.icons
                                                      .PinHasCoverage,
                                        scaledSize: new window.google.maps.Size(
                                            48,
                                            48
                                        ),
                                        anchor: new window.google.maps.Point(
                                            24,
                                            48
                                        ),
                                    }
                                }
                            />
                        )}
                    </GoogleMap>
                </APIProvider>
                <Styled.Sand_ContainerForm>
                    <Styled.Sand_FormControl
                        variant="outlined"
                        sx={{ width: "70%" }}
                    >
                        <Styled.Sand_OutlinedInput
                            placeholder="Digite sua localização"
                            endAdornment={
                                <InputAdornment position="end">
                                    <Styled.Sand_IconButton>
                                        <LocationSearchingIcon />
                                    </Styled.Sand_IconButton>
                                </InputAdornment>
                            }
                        />
                    </Styled.Sand_FormControl>
                    <Button text={"Testar cobertura"} variant="contained" />
                </Styled.Sand_ContainerForm>
            </Styled.Sand_Wrapper>
        </React.Fragment>
    );
}

export { Sandbox };
