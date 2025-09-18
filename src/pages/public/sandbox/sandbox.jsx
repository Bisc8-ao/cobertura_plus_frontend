import React, { useEffect, useState } from "react";
import {
    APIProvider,
    Map as GoogleMap,
    Marker,
    InfoWindow,
    useMap,
} from "@vis.gl/react-google-maps";
import {
    styled,
    FormControl as MuiFormControl,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Button, Loader } from "../../../components";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { lotties } from "../../../assets";

const Wrapper = styled("div")({
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
    zIndex: 1,
});

const Container = styled("div")({
    padding: "8rem 0",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    gap: "1rem",
    width: "50%",
    "@media (max-width: 820px)": {
        flexDirection: "column",
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
function MapWithGeoJson() {
    const map = useMap();
    const [info, setInfo] = useState(null);
    const [geodata, setGeodata] = useState(null);

    useEffect(() => {
        const url_api = `${import.meta.env.VITE_API_URL}/coverage/areas`;
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const response = await fetch(url_api, {
                    signal: controller.signal,
                });
                const data = await response.json();
                if (data.type === "FeatureCollection") {
                    setGeodata(data);
                } else {
                    console.error("GeoJSON inválido:", data);
                }
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Requisição abortada!");
                } else {
                    console.error("Erro ao buscar dados:", error);
                }
            }
        };

        fetchData();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        if (!map || !geodata?.features) return;

        // Corrigir GeoJSON (fechar polígonos)
        const fixedGeo = fixGeoJson(geodata);

        // Limpa dados anteriores
        map.data.forEach((f) => map.data.remove(f));

        // Adiciona GeoJSON corrigido
        map.data.addGeoJson(fixedGeo);

        // Estilo de cada polígono
        map.data.setStyle((feature) => {
            const colors = [
                "#FF0000",
                "#008000",
                "#0000FF",
                "#FFA500",
                "#800080",
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

        // Clique em um polígono
        map.data.addListener("click", (e) => {
            const zona = e.feature.getProperty("zona") || "N/A";
            const tecnologia = e.feature.getProperty("tecnologia") || "N/A";
            setInfo({
                content: `<div><b>Zona:</b> ${zona}<br/><b>Tecnologia:</b> ${tecnologia}</div>`,
                position: e.latLng,
            });
        });

        // Ajustar bounds
        const bounds = new window.google.maps.LatLngBounds();
        fixedGeo.features.forEach((f) => {
            if (f.geometry.type === "Polygon") {
                f.geometry.coordinates[0].forEach(([lng, lat]) => {
                    bounds.extend(new window.google.maps.LatLng(lat, lng)); // inverter [lng,lat] → (lat,lng)
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
    }, [map, geodata]);

    return (
        <>
            {info && (
                <InfoWindow
                    position={info.position}
                    onCloseClick={() => setInfo(null)}
                >
                    <div dangerouslySetInnerHTML={{ __html: info.content }} />
                </InfoWindow>
            )}
        </>
    );
}

// --- MAPA PRINCIPAL ---
function Sandbox() {
    const [markerPos, setMarkerPos] = useState(null);
    const API_KEY = import.meta.env.VITE_API_KEY_GOOGLE;
    const [showAvalibe, setShowAvalibe] = useState(false);

    const handleMapClick = (event) => {
        const lat = event.detail.latLng.lat;
        const lng = event.detail.latLng.lng;
        setMarkerPos({ lat, lng });
        setShowAvalibe(true);
    };

    useEffect(() => {
        if (showAvalibe) {
            const timeOut = setTimeout(() => setShowAvalibe(false), 3000);
            return () => clearTimeout(timeOut);
        }
    }, [showAvalibe]);

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
                        defaultCenter={{ lat: -8.839, lng: 13.2344 }}
                        defaultZoom={12}
                        gestureHandling="greedy"
                        minZoom={4.5}
                        disableDefaultUI
                        onClick={(e) => handleMapClick(e)}
                    >
                        <MapWithGeoJson />
                        {markerPos && <Marker position={markerPos} />}
                    </GoogleMap>
                </APIProvider>
                <Container>
                    <FormControl variant="outlined" sx={{ width: "60%" }}>
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
                </Container>
            </Wrapper>
        </React.Fragment>
    );
}

export { Sandbox };
