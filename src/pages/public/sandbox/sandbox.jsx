import React, { useEffect, useState } from "react";
import {
    APIProvider,
    Map as GoogleMap,
    Marker,
    InfoWindow,
    useMap,
} from "@vis.gl/react-google-maps";
import { renderToStaticMarkup } from "react-dom/server";
import { vectorImages } from "../../../assets";
import {
    styled,
    FormControl as MuiFormControl,
    OutlinedInput as MuiOutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Button, Loader } from "../../../components";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { lotties } from "../../../assets";
import { UseCheckCoverage, UseTimeoutEffect, UseUserIp } from "../../../hooks";

const Wrapper = styled("div")({
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
    zIndex: 1,
});

const ContainerForm = styled("form")({
    display: "flex",
    justifyContent: "center",

    position: "absolute",
    bottom: "2rem",
    gap: "1rem",
    width: "40%",
    padding: "2rem 0",
    background: "rgba(255, 255, 255, 1)",
    borderRadius: ".8rem",
    overflow: "hidden",
    zIndex: "1",

    "@media (max-width: 820px)": {
        flexDirection: "column",
        padding: "2rem",
        width: "85%",
    },
});

const FormControl = styled(MuiFormControl)(({ theme }) => ({
    "@media (max-width: 820px)": {
        width: "100%",
    },
    "& label": {
        fontSize: theme.typography.sizes.base,
        background: "#fff",
        color: theme.palette.gray[800],
    },
}));

const OutlinedInput = styled(MuiOutlinedInput)(({ theme }) => ({
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.gray[200],
        borderWidth: "2px",
        width: "100%",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000",
    },
    "& .MuiInputBase-input": {
        fontSize: "1.4rem",
        width: "100%",
    },
}));

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
    const fixed = JSON.parse(JSON.stringify(geojson)); // deep clone
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

    useEffect(() => {
        const url_api = `${import.meta.env.VITE_API_URL}/api/coverage/areas`;
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
            const colors = [
                "#FF0000",
                "#008000",
                "#0000FF",
                "#FFA500",
                "#800080",
                "#04fde8ff",
            ];
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
    const map = useMap();

    useEffect(() => {
        if (map && userLocation?.lat && userLocation?.lng) {
            map.setCenter(userLocation);
            map.setZoom(16);
        }
    }, [map, userLocation]);

    return userLocation?.lat && userLocation?.lng ? (
        <Marker position={userLocation} />
    ) : null;
}

// --- MAPA PRINCIPAL ---
function Sandbox() {
    const [markerPos, setMarkerPos] = useState(null);
    const API_KEY = import.meta.env.VITE_API_KEY_GOOGLE;

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
            console.log(result);

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

    return (
        <React.Fragment>
            <Wrapper>
                {showAvalibe && (
                    <Loader
                        Animation={lotties.MarkAnimation}
                        width="20%"
                        bg={true}
                    />
                )}

                <APIProvider apiKey={API_KEY}>
                    <GoogleMap
                        style={{ width: "100%", height: "100vh" }}
                        defaultCenter={{ lat: -8.8383, lng: 13.2344 }}
                        defaultZoom={12}
                        gestureHandling="greedy"
                        minZoom={4.5}
                        disableDefaultUI
                        onClick={(e) => handleMapClick(e)}
                    >
                        <MapWithUserLocation userLocation={userLoctaion} />
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
                <ContainerForm>
                    <FormControl variant="outlined" sx={{ width: "70%" }}>
                        <OutlinedInput
                            placeholder="Digite sua localização"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton>
                                        <LocationSearchingIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button text={"Testar cobertura"} variant="contained" />
                </ContainerForm>
            </Wrapper>
        </React.Fragment>
    );
}

export { Sandbox };
