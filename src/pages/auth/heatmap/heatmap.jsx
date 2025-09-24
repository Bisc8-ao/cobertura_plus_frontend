import { useEffect, useMemo, useState } from "react";
import {
    APIProvider,
    Map,
    useMap,
    useMapsLibrary,
} from "@vis.gl/react-google-maps";

import { styled } from "@mui/material";

const Wrapper = styled("div")(() => ({
    width: "100%",
    height: "85vh",

    "@media (min-width:1920px)": {
        height: "90vh",
    },
}));

// ---- Estilo Dark ----
const darkMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [{ color: "#757575" }],
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#303030" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#383838" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#000000" }],
    },
];

// ---- Hook para buscar dados da API ----
function GetAllTest() {
    const [data, setData] = useState(null);
    const userToken = localStorage.getItem("auth_token");
    const url = `${import.meta.env.VITE_API_URL}/api/dashboard/tests`;

    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Não autorizado");
                return res.json();
            })
            .then((json) => setData(json))
            .catch((err) => console.error("Erro no fetch:", err));
    }, [url, userToken]);

    return { data };
}

// ---- Função que converte dados da API para GeoJSON ----
const makeGeojsonFromApi = (apiData) => {
    if (!apiData) return { type: "FeatureCollection", features: [] };

    // junta todos os arrays dentro do objeto (testes, 461, etc.)
    const allPoints = Object.values(apiData).flat();

    return {
        type: "FeatureCollection",
        features: allPoints.map((p) => ({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [p.lon, p.lat], // ordem: [lon, lat]
            },
            properties: {
                id: p.id,
                available: p.available,
                mag: p.available ? 2 : 1, // peso maior se disponível
            },
        })),
    };
};

// ---- Componente Heatmap ----
const HeatmapExemple = ({ geojson, radius, opacity }) => {
    const map = useMap();
    const visualization = useMapsLibrary("visualization");

    const heatmap = useMemo(() => {
        if (!visualization) return null;
        return new window.google.maps.visualization.HeatmapLayer({
            radius,
            opacity,
        });
    }, [visualization, radius, opacity]);

    useEffect(() => {
        if (!heatmap) return;

        heatmap.setData(
            geojson.features.map((point) => {
                const [lng, lat] = point.geometry.coordinates;
                return {
                    location: new window.google.maps.LatLng(lat, lng),
                    weight: point.properties?.mag,
                };
            })
        );
    }, [heatmap, geojson]);

    useEffect(() => {
        if (!heatmap) return;
        heatmap.setMap(map);
        return () => heatmap.setMap(null);
    }, [heatmap, map]);

    return null;
};

// ---- Componente principal ----
function HeatMap() {
    const [radius, setRadius] = useState(25);
    const [opacity, setOpacity] = useState(0.8);
    const [angolaGeojson, setAngolaGeojson] = useState();

    const API_KEY_GOOGLEMAPS =
        (window.__RUNTIME__ && window.__RUNTIME__.VITE_API_KEY_GOOGLE) ||
        import.meta.env.VITE_API_KEY_GOOGLE;

    const { data } = GetAllTest();

    useEffect(() => {
        if (data) {
            setAngolaGeojson(makeGeojsonFromApi(data));
        }
    }, [data]);

    return (
        <Wrapper>
            <APIProvider apiKey={API_KEY_GOOGLEMAPS}>
                <Map
                    mapId={"7a9e2ebecd32a903"}
                    gestureHandling={"greedy"}
                    disableDefaultUI={true}
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "2rem",
                        overflow: "hidden",
                    }}
                    defaultCenter={{ lat: -8.839, lng: 13.2344 }}
                    defaultZoom={12}
                    options={{ styles: darkMapStyle }}
                    minZoom={3}
                />

                {angolaGeojson && (
                    <HeatmapExemple
                        geojson={angolaGeojson}
                        radius={radius}
                        opacity={opacity}
                    />
                )}
            </APIProvider>
        </Wrapper>
    );
}

export { HeatMap };
