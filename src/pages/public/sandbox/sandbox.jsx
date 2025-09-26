import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    APIProvider,
    Map as GoogleMap,
    Marker,
    useMap,
} from "@vis.gl/react-google-maps";
import parse from "autosuggest-highlight/parse";
import { vectorImages } from "../../../assets";
import {
    InputAdornment,
    Autocomplete,
    Typography,
    Box,
    Grid,
    TextField,
    CircularProgress,
} from "@mui/material";
import { Button, Loader } from "../../../components";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { lotties } from "../../../assets";
import debounce from "lodash/debounce";
import {
    UseCheckCoverage,
    UseTimeoutEffect,
    UseUserIp,
    UseLocation,
    UseGetCoverageAreas,
    useLangContext,
    UseThemeMode,
    useReverseGeocode,
} from "../../../hooks";
import * as Styled from "../../../styles";
import { fixGeoJson } from "../../../utils";

const darkMapStyles = [
    {
        elementType: "geometry",
        stylers: [{ color: "#242f3e" }],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [{ color: "#242f3e" }],
    },
    {
        elementType: "labels.text.fill",
        stylers: [{ color: "#746855" }],
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    },
];

// Componente para controlar GeoJSON no mapa
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

        // Clique em polígono
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

// Componente para controlar o mapa
function MapController({
    userLocation,
    clickedPosition,
    shouldCenterOnUser = true,
}) {
    const map = useMap();

    useEffect(() => {
        if (map && clickedPosition?.lat && clickedPosition?.lng) {
            map.setCenter(clickedPosition);
            map.setZoom(15);
        } else if (
            map &&
            userLocation?.lat &&
            userLocation?.lng &&
            shouldCenterOnUser
        ) {
            map.setCenter(userLocation);
        }
    }, [map, userLocation, clickedPosition, shouldCenterOnUser]);

    return null;
}

// Componente para mostrar marcador do usuário
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
                    userAgent: navigator.userAgent,
                };
                // Descomente quando necessário
                // const result = await rawCheckCoverage(payload);
                // setLocation({
                //     lat: userLocation.lat,
                //     lng: userLocation.lng,
                //     ip: getIpUser,
                //     covered: result.available ?? false,
                // });
            };
            checkCoveraged();
        }
    }, [userLocation, getIpUser, rawCheckCoverage]);

    return showUserMarker && userLocation?.lat && userLocation?.lng ? (
        <Marker
            position={userLocation}
            icon={{
                url:
                    location.covered === false &&
                    vectorImages.icons.PinHasNoCoverage,
                scaledSize: new window.google.maps.Size(48, 48),
                anchor: new window.google.maps.Point(24, 48),
            }}
        />
    ) : null;
}

const debouncedFetchSuggestions = debounce(
    async (input, callback, apiKey, setIsSearching, setOptions) => {
        if (!input || input.length < 2) {
            callback([]);
            return;
        }

        try {
            setIsSearching(true);

            const response = await fetch(
                `https://places.googleapis.com/v1/places:autocomplete?key=${apiKey}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Goog-FieldMask":
                            "suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat",
                    },
                    body: JSON.stringify({
                        input,
                        languageCode: "pt",
                        regionCode: "AO",
                    }),
                }
            );

            if (!response.ok) throw new Error("Erro HTTP: " + response.status);

            const data = await response.json();

            const formattedPredictions =
                data.suggestions?.map((s) => ({
                    description: s.placePrediction?.text?.text,
                    structured_formatting: {
                        main_text:
                            s.placePrediction?.structuredFormat?.mainText
                                ?.text || "",
                        secondary_text:
                            s.placePrediction?.structuredFormat?.secondaryText
                                ?.text || "",
                        main_text_matched_substrings:
                            s.placePrediction?.structuredFormat?.mainText?.matches?.map(
                                (m) => ({
                                    offset: m.startOffset,
                                    length: m.endOffset - m.startOffset,
                                })
                            ) || [],
                    },
                    place_id: s.placePrediction?.placeId,
                })) || [];

            callback(formattedPredictions);
        } catch (error) {
            console.error("Erro ao buscar sugestões:", error);
            callback([]);
        } finally {
            setIsSearching(false);
        }
    },
    300
);
// Componente principal
function Sandbox() {
    // Estados
    const [markerPos, setMarkerPos] = useState(null);
    const [userLocation, setUserLocation] = useState({});
    const [address, setAddress] = useState("");
    const [options, setOptions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [apiLoaded, setApiLoaded] = useState(false);
    const [loading, setLoading] = useState(false)
    // Hooks
    const { location, setLocation } = UseLocation();
    const { translations } = useLangContext();

    const { mode } = UseThemeMode();
    const { showAvalibe, setShowAvalibe, showVerific, setShowNavigate } =
        UseTimeoutEffect();
    const { checkCoverage } = UseCheckCoverage();
    const { getIpUser } = UseUserIp();
    const { getAddressFromLatLng } = useReverseGeocode();

    const API_KEY_GOOGLEMAPS = import.meta.env.VITE_API_KEY_GOOGLE;

    // Verifica se a API do Google Maps está carregada
    useEffect(() => {
        const checkGoogleAPI = () => {
            if (
                window.google &&
                window.google.maps &&
                window.google.maps.places
            ) {
                console.log("Google Maps API carregada com sucesso");
                setApiLoaded(true);
            } else {
                console.log("Aguardando Google Maps API...");
                setTimeout(checkGoogleAPI, 100);
            }
        };
        checkGoogleAPI();
    }, []);



  const fetchSuggestions = useCallback(
      (input, callback) => {
          debouncedFetchSuggestions(
              input,
              callback,
              API_KEY_GOOGLEMAPS,
              setIsSearching,
              setOptions
          );
      },
      [API_KEY_GOOGLEMAPS, setIsSearching, setOptions]
  );



    const handleInputChange = useCallback(
        (event, newInputValue) => {

            setAddress(newInputValue || "");

            if (newInputValue && newInputValue.length >= 2 && apiLoaded) {
                fetchSuggestions(newInputValue, (results) => {
                    ///console.log(" Resultados recebidos:", results);
                    setOptions(results || []);
                });
            } else {
                setOptions([]);
            }
        },
        [fetchSuggestions, apiLoaded]
    );


const handleSelect = useCallback(
    async (event, newValue) => {
        if (!newValue?.place_id) return;

        try {
            const res = await fetch(
                `https://places.googleapis.com/v1/places/${newValue.place_id}?key=${API_KEY_GOOGLEMAPS}`,
                {
                    headers: {
                        "X-Goog-FieldMask":
                            "id,displayName,formattedAddress,location",
                    },
                }
            );
            const data = await res.json();

            if (data?.location) {
                const pos = {
                    lat: data.location.latitude,
                    lng: data.location.longitude,
                };

                setMarkerPos(pos);
                setAddress(newValue.description);
            }
        } catch (error) {
            console.error("Erro ao buscar detalhes do lugar:", error);
        }
    },
    [API_KEY_GOOGLEMAPS]
);


    // Handle map click
    const handleMapClick = useCallback(
        async (event) => {
            const lat = event.detail.latLng.lat;
            const lng = event.detail.latLng.lng;
            const clickPosition = { lat, lng };

            console.log(" Clique no mapa:", clickPosition);
            setMarkerPos(clickPosition);

            if (lat && lng && getIpUser) {
                try {
                    const result = await getAddressFromLatLng(lat, lng);

                    setAddress(result.results[0]?.formatted_address);
                } catch (error) {
                    console.error("Erro ao obter endereço:", error);
                    setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
                }
            }
        },
        [getIpUser, getAddressFromLatLng]
    );

    // Handle zone click
    const handleZoneClick = useCallback(
        async (pos) => {
            console.log("Clique na zona:", pos);
            setMarkerPos(pos);

            if (pos.lat && pos.lng) {
                try {
                    const result = await getAddressFromLatLng(pos.lat, pos.lng);
                   setAddress(result.results[0]?.formatted_address);
                } catch (error) {
                    console.error("Erro ao obter endereço da zona:", error);
                    setAddress(`${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}`);
                }
            }
        },
        [getAddressFromLatLng]
    );

    // Geolocalização do usuário
    useEffect(() => {
        if (!navigator.geolocation) {
            console.warn("Geolocalização não suportada");
            return;
        }

        const watcher = navigator.geolocation.watchPosition(
            (pos) => {
                const userPos = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                };
                console.log("Localização do usuário:", userPos);
                setUserLocation(userPos);
            },
            (err) => {
                console.error(" Erro na geolocalização:", err);
            },
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
        );

        return () => navigator.geolocation.clearWatch(watcher);
    }, []);

    // Memoized user location
    const memoizedUserLocation = useMemo(
        () =>
            userLocation
                ? { lat: userLocation.lat, lng: userLocation.lng }
                : null,
        [userLocation]
    );


    const handleCheckCoverage = useCallback(async () => {
        if (!markerPos || !getIpUser) {
            console.warn(
                " Posição ou IP não disponível para verificar cobertura"
            );
            return;
        }
        setLoading(true)


        try {
            const payload = {
                userIp: getIpUser,
                userLat: markerPos.lat,
                userLon: markerPos.lng,
                userAgent: navigator.userAgent,
            };

            const result = await checkCoverage(payload);
             setLoading(false);
             setShowAvalibe(true);
            setShowNavigate(result.available);
            setLocation({
                lat: markerPos.lat,
                lng: markerPos.lng,
                ip: getIpUser,
                corvaged: result.available,
            });
        } catch (error) {
            console.error(" Erro ao verificar cobertura:", error);
        }
    }, [
        markerPos,
        getIpUser,
        checkCoverage,
        setLocation,
        setShowAvalibe,
        setShowNavigate,
    ]);




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

                {showVerific && (
                    <Loader
                        Animation={
                            location.corvaged
                                ? lotties.CheckAnimation
                                : lotties.Erroranimation
                        }
                        width="20%"
                        bg={true}
                    />
                )}

                <APIProvider
                    apiKey={API_KEY_GOOGLEMAPS}
                    libraries={["places"]}
                    onLoad={() => {
                        console.log("🚀 APIProvider carregado");
                        setApiLoaded(true);
                    }}
                >
                    <GoogleMap
                        style={{ width: "100%", height: "100vh" }}
                        styles={mode === "dark" ? darkMapStyles : []}
                        defaultCenter={{ lat: -8.8383, lng: 13.2344 }}
                        defaultZoom={12}
                        gestureHandling="auto"
                        minZoom={4.5}
                        disableDefaultUI
                        onClick={handleMapClick}
                    >
                        <MapController
                            userLocation={memoizedUserLocation}
                            clickedPosition={markerPos}
                        />

                        <MapWithUserLocation
                            userLocation={memoizedUserLocation}
                            showUserMarker={!markerPos}
                        />

                        <MapWithGeoJson
                            onZoneClick={handleZoneClick}
                            onLoad={(map) => {
                                if (
                                    map &&
                                    userLocation?.lat &&
                                    userLocation?.lng
                                ) {
                                    map.setCenter(userLocation);
                                    map.setZoom(15);
                                }
                            }}
                        />

                        {markerPos && (
                            <Marker
                                position={markerPos}
                                icon={
                                    showVerific === false &&
                                    location.corvaged === false
                                        ? {
                                              url: vectorImages.icons
                                                  .PinHasNoCoverage,
                                              scaledSize:
                                                  new window.google.maps.Size(
                                                      48,
                                                      48
                                                  ),
                                              anchor: new window.google.maps.Point(
                                                  24,
                                                  48
                                              ),
                                          }
                                        : undefined
                                }
                            />
                        )}
                    </GoogleMap>
                </APIProvider>

                <Styled.Sand_ContainerForm>
                    <Autocomplete
                        sx={{ width: "70%" }}
                        options={options}
                        value={address}
                        loading={isSearching}
                        getOptionLabel={(option) =>
                            typeof option === "string"
                                ? option
                                : option.description || ""
                        }
                        filterOptions={(x) => x}
                        autoComplete
                        includeInputInList
                        filterSelectedOptions
                        noOptionsText={
                            apiLoaded ? "Sem resultados" : "Carregando API..."
                        }
                        onInputChange={handleInputChange}
                        onChange={handleSelect}
                        renderInput={(params) => (
                            <Styled.Sand_OutlinedInput
                                {...params}
                                label={
                                    translations.pages.sandbox.input.placeholder
                                }
                                variant="outlined"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {isSearching ? (
                                                <CircularProgress
                                                    color="inherit"
                                                    size={20}
                                                />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                        renderOption={(props, option) => {
                            const matches =
                                option.structured_formatting
                                    ?.main_text_matched_substrings || [];
                            const parts = parse(
                                option.structured_formatting?.main_text ||
                                    option.description,
                                matches.map((m) => [
                                    m.offset,
                                    m.offset + m.length,
                                ])
                            );

                            return (
                                <li {...props}>
                                    <Grid container alignItems="center">
                                        <Grid
                                            sx={{ display: "flex", width: 44 }}
                                        >
                                            <LocationSearchingIcon
                                                sx={{ color: "text.secondary" }}
                                            />
                                        </Grid>
                                        <Grid
                                            sx={{
                                                width: "calc(100% - 44px)",
                                                wordWrap: "break-word",
                                            }}
                                        >
                                            {parts.map((part, index) => (
                                                <Box
                                                    key={index}
                                                    component="span"
                                                    sx={{
                                                        fontWeight:
                                                            part.highlight
                                                                ? "bold"
                                                                : "regular",
                                                    }}
                                                >
                                                    {part.text}
                                                </Box>
                                            ))}
                                            {option.structured_formatting
                                                ?.secondary_text && (
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {
                                                        option
                                                            .structured_formatting
                                                            .secondary_text
                                                    }
                                                </Typography>
                                            )}
                                        </Grid>
                                    </Grid>
                                </li>
                            );
                        }}
                    />

                    <Button
                        text={translations.pages.sandbox.button.checkCoverage}
                        variant="contained"
                        onClick={handleCheckCoverage}
                        disabled={!markerPos}
                        
                    />
                </Styled.Sand_ContainerForm>
            </Styled.Sand_Wrapper>
        </React.Fragment>
    );
}

export { Sandbox };
