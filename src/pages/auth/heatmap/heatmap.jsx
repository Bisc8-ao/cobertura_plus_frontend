import { useEffect, useMemo, useState } from "react";
import {
    APIProvider,
    Map,
    useMap,
    useMapsLibrary,
} from "@vis.gl/react-google-maps";

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

// ---- Lista de pontos em Angola ----
const angolaPoints = [
    { lat: -8.839, lng: 13.2894 }, // Luanda
    { lat: -12.5763, lng: 13.4055 }, // Benguela
    { lat: -12.7761, lng: 15.7396 }, // Huambo
    { lat: -14.917, lng: 13.4925 }, // Lobito
    { lat: -14.9167, lng: 13.5 }, // Catumbela
    { lat: -12.3833, lng: 16.9333 }, // Kuito
    { lat: -14.917, lng: 13.5 }, // Sumbe
    { lat: -15.1961, lng: 12.1522 }, // Namibe
    { lat: -16.7833, lng: 14.9167 }, // Lubango
];

// ---- Função que converte lista para GeoJSON ----
const makeGeojson = () => ({
    type: "FeatureCollection",
    features: angolaPoints.map((p, i) => ({
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [p.lng, p.lat],
        },
        properties: {
            id: `p-${i}`,
            mag: 1,
        },
    })),
});

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

function HeatMap() {
    const [radius, setRadius] = useState(25);
    const [opacity, setOpacity] = useState(0.8);
    const [angolaGeojson, setAngolaGeojson] = useState();
    const API_KEY_GOOGLEMAPS =
        (window.__RUNTIME__ && window.__RUNTIME__.VITE_API_KEY_GOOGLE) ||
        import.meta.env.VITE_API_KEY_GOOGLE;
    
    useEffect(() => {
        setAngolaGeojson(makeGeojson());
    }, []);

    return (
        <APIProvider apiKey={API_KEY_GOOGLEMAPS}>
            <Map
                mapId={"7a9e2ebecd32a903"}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
                style={{
                    width: "100%",
                    height: "90vh",
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
    );
}

export { HeatMap };
