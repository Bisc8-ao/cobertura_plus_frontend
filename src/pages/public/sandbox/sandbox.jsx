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
import {
    UseCheckCoverage,
    UseTimeoutEffect,
    UseUserIp,
    UseLocation,
    UseGetCoverageAreas,
    useLangContext,
} from "../../../hooks";
import * as Styled from "../../../styles";

import { fixGeoJson } from "../../../utils";

function MapWithGeoJson({ onLoad, onZoneClick }) {
    const map = useMap();
    const { geodata } = UseGetCoverageAreas();

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



// Componente separado para controlar o mapa e manter funcionalidade
function MapController({
    userLocation,
    clickedPosition,
    shouldCenterOnUser = true,
}) {
    const map = useMap();

    useEffect(() => {
        if (map && clickedPosition?.lat && clickedPosition?.lng) {
            // Prioriza a posição clicada
            map.setCenter(clickedPosition);
            map.setZoom(15);
        } else if (
            map &&
            userLocation?.lat &&
            userLocation?.lng &&
            shouldCenterOnUser
        ) {
            // Só centraliza na localização do usuário se não houver clique e for permitido
            map.setCenter(userLocation);
        }
    }, [map, userLocation, clickedPosition, shouldCenterOnUser]);

    return null; // Não renderiza nada visual
}

function MapWithUserLocation({ userLocation, showUserMarker }) {
    const [location, setLocation] = useState({});
    const { checkCoverage: rawCheckCoverage } = UseCheckCoverage();
    const { getIpUser } = UseUserIp();



    useEffect(() => {
        if (userLocation?.lat && userLocation?.lng) {
            const checkCoveraged = async () => {
                const payload = {
                    userIp: getIpUser,
                    userLat: userLocation.lat,
                    userLon: userLocation.lng,
                };

                const result = await rawCheckCoverage(payload);

                setLocation({
                    lat: userLocation.lat,
                    lng: userLocation.lng,
                    ip: getIpUser,
                    covered: result.available ?? false,
                });
            };
            checkCoveraged();
        }
    }, [userLocation, getIpUser, rawCheckCoverage]);


    return showUserMarker && userLocation?.lat && userLocation?.lng ? (
        <Marker
            position={userLocation}
            icon={{
                url:
                    location.covered === false
                        ? vectorImages.icons.PinHasNoCoverage
                        : vectorImages.icons.PinHasCoverage,
                scaledSize: new window.google.maps.Size(48, 48),
                anchor: new window.google.maps.Point(24, 48),
            }}
        />
    ) : null;
}

// --- MAPA PRINCIPAL ---

function Sandbox() {
    const [markerPos, setMarkerPos] = useState(null);
    const { location, setLocation } = UseLocation();
    const { translations } = useLangContext();
    const API_KEY_GOOGLEMAPS =
        (window.__RUNTIME__ && window.__RUNTIME__.VITE_API_KEY_GOOGLE) ||
        import.meta.env.VITE_API_KEY_GOOGLE;

    const [userLoctaion, setUserLocation] = useState({});
    const { showAvalibe, setShowAvalibe, showVerific } = UseTimeoutEffect();
    const { checkCoverage } = UseCheckCoverage();
    const { getIpUser } = UseUserIp();

    const handleMapClick = async (event) => {
        const lat = event.detail.latLng.lat;
        const lng = event.detail.latLng.lng;
        const clickPosition = { lat, lng };

        setMarkerPos(clickPosition);
        setShowAvalibe(true);

        if (lat && lng && getIpUser) {
            const payload = {
                userIp: getIpUser,
                userLat: lat,
                userLon: lng,
            };

            const result = await checkCoverage(payload);

            setLocation({
                lat,
                lng,
                ip: getIpUser,
                corvaged: result.available,
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
                lat: pos.lat,
                lng: pos.lng,
                ip: getIpUser,
                corvaged: result.available,
            });
        }
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            return;
        }

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
            { enableHighAccuracy: true, maximumAge: 0, timeout: 1000 }
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
                        gestureHandling="auto"
                        minZoom={4.5}
                        disableDefaultUI
                        onClick={(e) => handleMapClick(e)}
                    >
                        {/* Sempre presente - mantém funcionalidade do mapa */}
                        <MapController userLocation={memoizedUserLocation} />

                        {/* Marker da localização do usuário - só mostra quando não tem marker manual */}
                        <MapWithUserLocation
                            userLocation={memoizedUserLocation}
                            showUserMarker={markerPos === null}
                        />

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

                        {/* Marker clicado pelo usuário */}
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
                            placeholder={
                                translations.pages.sandbox.input.placeholder
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <Styled.Sand_IconButton>
                                        <LocationSearchingIcon />
                                    </Styled.Sand_IconButton>
                                </InputAdornment>
                            }
                        />
                    </Styled.Sand_FormControl>
                    <Button
                        text={translations.pages.sandbox.button.checkCoverage}
                        variant="contained"
                    />
                </Styled.Sand_ContainerForm>
            </Styled.Sand_Wrapper>
        </React.Fragment>
    );
}

export { Sandbox };
