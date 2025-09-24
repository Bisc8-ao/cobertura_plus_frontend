import { useState, useEffect, useMemo } from "react";
import { APIProvider, Map as GooleMap, useMap } from "@vis.gl/react-google-maps";
import { fixGeoJson } from "../../../utils";
import { UseGetCoverageAreas } from "../../../hooks";




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

function Map() {

     const API_KEY_GOOGLEMAPS =
         (window.__RUNTIME__ && window.__RUNTIME__.VITE_API_KEY_GOOGLE) ||
         import.meta.env.VITE_API_KEY_GOOGLE;

     const [userLoctaion, setUserLocation] = useState({});





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

    return (
        <APIProvider apiKey={API_KEY_GOOGLEMAPS}>
            <GooleMap
                style={{
                    width: "100%",
                    height: "90vh",
                    borderRadius: "2rem",
                    overflow: "hidden",
                }}
                defaultCenter={{ lat: -8.839, lng: 13.2344 }}
                defaultZoom={12}
                gestureHandling="greedy"
                disableDefaultUI={false}
                minZoom={3}
            >
                <MapController userLocation={memoizedUserLocation} />
                <MapWithGeoJson
                    onLoad={(map) => {
                        if (map && userLoctaion?.lat && userLoctaion?.lng) {
                            map.setCenter(userLoctaion);
                            map.setZoom(15);
                        }
                    }}
                />
            </GooleMap>
        </APIProvider>
    );
}


export {Map}
