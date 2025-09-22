import { useState, useEffect } from "react";
import { APIProvider, Map as GooleMap, useMap } from "@vis.gl/react-google-maps";



function MapWithGeoJson() {
    const map = useMap();
    const API_URL = (window.__RUNTIME__ && window.__RUNTIME__.VITE_API_KEY_GOOGLE) || import.meta.env.VITE_API_URL;

    useEffect(() => {
        const url_api = `${API_URL}/api/coverage/areas`;
        const HandleFecthData = async () => {
            const response = await fetch(url_api);
            const data = await response.json()
           // setGetData(data)
        }

        HandleFecthData()
    },[])
    useEffect(() => {
        if (!map) return;

        const geodata = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    properties: { zona: "Kilamba", tecnologia: "FTTH" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [
                            [
                                [13.2344, -8.839],
                                [13.235, -8.84],
                                [13.236, -8.839],
                                [13.2344, -8.839],
                            ],
                        ],
                    },
                },
            ],
        };

        // Adiciona o GeoJSON
        map.data.addGeoJson(geodata);

        // Estilo dos polígonos
        map.data.setStyle({
            fillColor: "#FF0000",
            fillOpacity: 0.3,
            strokeColor: "#FF0000",
            strokeWeight: 2,
        });

        // Clique no polígono
        map.data.addListener("click", () => {
        });

        // Ajustar bounds
        const bounds = new window.google.maps.LatLngBounds();
        geodata.features.forEach((f) => {
            f.geometry.coordinates[0].forEach(([lng, lat]) => {
                bounds.extend(new window.google.maps.LatLng(lat, lng));
            });
        });
        map.fitBounds(bounds);
    }, [map]);

    return null;
}

function Map() {
     const API_KEY_GOOGLEMAPS = (window.__RUNTIME__ && window.__RUNTIME__.VITE_API_KEY_GOOGLE) || import.meta.env.VITE_API_KEY_GOOGLE;
    return (
        <APIProvider apiKey={API_KEY_GOOGLEMAPS}>
            <GooleMap
                style={{ width: "100%", height: "90vh", borderRadius:"2rem", overflow:"hidden"}}
                defaultCenter={{ lat: -8.839, lng: 13.2344 }}
                defaultZoom={12}
                gestureHandling="greedy"
                disableDefaultUI={false}
                minZoom={3}
            >
                <MapWithGeoJson />
            </GooleMap>
        </APIProvider>
    );
}


export {Map}
