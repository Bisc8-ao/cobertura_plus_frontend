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
import { UseCheckCoverage, UseLocation, UseTimeoutEffect, UseUserIp,UseGetCoverageAreas } from "../../../hooks";
import * as Styled from "../../../styles";

import {MapWithGeoJson} from "../../../components"


function MapController({
    userLocation,
    clickedPosition,
    shouldCenterOnUser = true,
}) {
    const map = useMap();
    const [hasInitialized, setHasInitialized] = useState(false);

    // Efeito separado para posição clicada - sempre executa quando há clique
    useEffect(() => {
        if (map && clickedPosition?.lat && clickedPosition?.lng) {
            map.setCenter(clickedPosition);
            map.setZoom(15);
        }
    }, [map, clickedPosition]);

    // Efeito separado para localização do usuário - só executa uma vez no início
    useEffect(() => {
        if (
            map &&
            userLocation?.lat &&
            userLocation?.lng &&
            shouldCenterOnUser &&
            !hasInitialized
        ) {
            map.setCenter(userLocation);
            map.setZoom(15);
            setHasInitialized(true);
        }
    }, [map, userLocation, shouldCenterOnUser, hasInitialized]);

    return null;
}

function MapWithUserLocation({ userLocation, showUserMarker }) {
    const [location, setLocation] = useState({});
    const { checkCoverage: rawCheckCoverage } = UseCheckCoverage();

    const { getIpUser } = UseUserIp();

    const checkCoverage = useCallback(
        (payload) => rawCheckCoverage(payload),
        [rawCheckCoverage]
    );

    useEffect(() => {
        if (userLocation?.lat && userLocation?.lng) {
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
        }
    }, [userLocation, checkCoverage, getIpUser]);

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
    const { location, setLocation } =
        UseLocation();
    const API_KEY_GOOGLEMAPS =
        (window.__RUNTIME__ && window.__RUNTIME__.VITE_API_KEY_GOOGLE) ||
        import.meta.env.VITE_API_KEY_GOOGLE;

    const [userLoctaion, setUserLocation] = useState({});
    const { showAvalibe, setShowAvalibe, showVerific } = UseTimeoutEffect();
    const { checkCoverage } = UseCheckCoverage();
    const { getIpUser } = UseUserIp();


    // clique no mapa fora das zonas
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
                corvaged: result.available ?? false,
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
                corvaged: result.available ?? false,
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

    console.log(location);

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

                        <MapController
                            userLocation={memoizedUserLocation}
                            clickedPosition={markerPos}
                            shouldCenterOnUser={markerPos === null}
                        />


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
                                    userLoctaion?.lng &&
                                    !markerPos
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
