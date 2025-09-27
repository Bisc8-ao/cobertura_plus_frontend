import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
    useRef,
} from "react";
import PropTypes from "prop-types";
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

// Componente para controlar GeoJSON no mapa - OTIMIZADO
const MapWithGeoJson = React.memo(function MapWithGeoJson({
    onLoad = null,
    onZoneClick = null,
    hasUserInteracted,
}) {
    const map = useMap();
    const { geodata } = UseGetCoverageAreas();
    const [initialized, setInitialized] = useState(false);
    const clickListenerRef = useRef(null);

    // Efeito para inicializar o GeoJSON
    useEffect(() => {
        if (!map || !geodata?.features || initialized) return;

        console.log("Inicializando GeoJSON no mapa...");

        try {
            const fixedGeo = fixGeoJson(geodata);

            // Limpa dados anteriores
            map.data.forEach((f) => map.data.remove(f));

            // Adiciona GeoJSON corrigido
            map.data.addGeoJson(fixedGeo);

            // Estilo
            map.data.setStyle(() => ({
                fillColor: "#04fde8ff",
                fillOpacity: 0.3,
                strokeColor: "#04fde8ff",
                strokeWeight: 2,
            }));

            // Ajustar bounds apenas se o usuário não interagiu
            if (!hasUserInteracted) {
                const bounds = new window.google.maps.LatLngBounds();
                fixedGeo.features.forEach((f) => {
                    if (f.geometry.type === "Polygon") {
                        f.geometry.coordinates[0].forEach(([lng, lat]) => {
                            bounds.extend(
                                new window.google.maps.LatLng(lat, lng)
                            );
                        });
                    }
                    if (f.geometry.type === "MultiPolygon") {
                        f.geometry.coordinates.forEach((polygon) => {
                            polygon[0].forEach(([lng, lat]) => {
                                bounds.extend(
                                    new window.google.maps.LatLng(lat, lng)
                                );
                            });
                        });
                    }
                });
                map.fitBounds(bounds);

                if (onLoad) {
                    onLoad(map);
                }
            }

            setInitialized(true);
            console.log("GeoJSON inicializado com sucesso");
        } catch (error) {
            console.error("Erro ao inicializar GeoJSON:", error);
        }
    }, [map, geodata, initialized, hasUserInteracted, onLoad]);

    // Efeito para gerenciar o listener de clique
    useEffect(() => {
        if (!map || !initialized || !onZoneClick) return;

        console.log("Adicionando listener de clique nas zonas...");

        // Remove listener anterior se existir
        if (clickListenerRef.current) {
            try {
                window.google.maps.event.removeListener(
                    clickListenerRef.current
                );
            } catch (error) {
                console.warn("Erro ao remover listener anterior:", error);
            }
        }

        // Adiciona novo listener
        try {
            clickListenerRef.current = map.data.addListener(
                "click",
                (event) => {
                    try {
                        const lat = event.latLng.lat();
                        const lng = event.latLng.lng();
                        console.log("Zona clicada:", { lat, lng });

                        if (onZoneClick) {
                            onZoneClick({ lat, lng });
                        }
                    } catch (error) {
                        console.error("Erro no handler de clique:", error);
                    }
                }
            );

            console.log("Listener de clique adicionado com sucesso");
        } catch (error) {
            console.error("Erro ao adicionar listener:", error);
        }

        // Cleanup function
        return () => {
            if (clickListenerRef.current) {
                try {
                    window.google.maps.event.removeListener(
                        clickListenerRef.current
                    );
                } catch (error) {
                    console.warn("Erro no cleanup do listener:", error);
                }
                clickListenerRef.current = null;
            }
        };
    }, [map, initialized, onZoneClick]);

    return null;
});

// PropTypes para MapWithGeoJson
MapWithGeoJson.propTypes = {
    onLoad: PropTypes.func,
    onZoneClick: PropTypes.func,
    hasUserInteracted: PropTypes.bool.isRequired,
};



// Componente para controlar o mapa - OTIMIZADO
const MapController = React.memo(function MapController({
    userLocation = null,
    clickedPosition = null,
    shouldCenterOnUser = true,
    hasUserInteracted = false,
}) {
    const map = useMap();
    const lastClickedPositionRef = useRef(null);

    useEffect(() => {
        if (!map) return;

        // Prioridade 1: Centralizar onde o usuário clicou/pesquisou
        if (clickedPosition?.lat && clickedPosition?.lng) {
            const lastPos = lastClickedPositionRef.current;
            // Só centraliza se a posição mudou (evita loops)
            if (
                !lastPos ||
                lastPos.lat !== clickedPosition.lat ||
                lastPos.lng !== clickedPosition.lng
            ) {
                map.setCenter(clickedPosition);
                map.setZoom(15);
                lastClickedPositionRef.current = clickedPosition;
                console.log("Centralizando no ponto clicado:", clickedPosition);
            }
        }
        // Prioridade 2: Centralizar na localização do usuário (só no início)
        else if (
            userLocation?.lat &&
            userLocation?.lng &&
            shouldCenterOnUser &&
            !hasUserInteracted
        ) {
            map.setCenter(userLocation);
            map.setZoom(15);
            console.log(
                "Centralizando na localização do usuário:",
                userLocation
            );
        }
    }, [
        map,
        userLocation,
        clickedPosition,
        shouldCenterOnUser,
        hasUserInteracted,
    ]);

    return null;
});

// PropTypes para MapController
MapController.propTypes = {
    userLocation: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }),
    clickedPosition: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }),
    shouldCenterOnUser: PropTypes.bool,
    hasUserInteracted: PropTypes.bool,
};



// Componente para mostrar marcador do usuário - OTIMIZADO
const MapWithUserLocation = React.memo(function MapWithUserLocation({
    userLocation=null,
    showUserMarker,
}) {
    if (!showUserMarker || !userLocation?.lat || !userLocation?.lng) {
        return null;
    }

    return <Marker position={userLocation} />;
});

// PropTypes para MapWithUserLocation
MapWithUserLocation.propTypes = {
    userLocation: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }),
    showUserMarker: PropTypes.bool.isRequired,
};


// Função debounced fora do componente para evitar recriação
const debouncedFetchSuggestions = debounce(
    async (input, callback, apiKey, setIsSearching) => {
        if (!input || input.length < 2) {
            callback([]);
            return;
        }

        // Controller para cancelar requests se necessário
        const controller = new AbortController();
        const signal = controller.signal;

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
                    signal, // Adiciona signal para cancelar se necessário
                }
            );

            // Verifica se a requisição foi cancelada
            if (signal.aborted) {
                return;
            }

            if (!response.ok) throw new Error("Erro HTTP: " + response.status);

            const data = await response.json();

            // Verifica novamente se foi cancelada após parsing
            if (signal.aborted) {
                return;
            }

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
            // Não loga erro se foi apenas cancelado
            if (!signal.aborted) {
                console.error("Erro ao buscar sugestões:", error);
                callback([]);
            }
        } finally {
            // Só atualiza estado se não foi cancelado
            if (!signal.aborted) {
                setIsSearching(false);
            }
        }
    },
    300
);

// Componente principal OTIMIZADO
function Sandbox({
    initialCenter = null,
    initialZoom = 12,
    onLocationChange = null,
    onCoverageCheck = null,
    customMapStyles = null,

}) {
    // Estados
    const [markerPos, setMarkerPos] = useState(null);
    const [userLocation, setUserLocation] = useState({});
    const [address, setAddress] = useState("");
    const [options, setOptions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [apiLoaded, setApiLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);

    // Hooks
    const { location, setLocation } = UseLocation();
    const { translations } = useLangContext();
    const { mode } = UseThemeMode();
    const { showAvalibe, setShowAvalibe, showVerific, setShowNavigate } =
        UseTimeoutEffect();
    const { checkCoverage } = UseCheckCoverage();
    const { getIpUser } = UseUserIp();
    const { getAddressFromLatLng } = useReverseGeocode();

    // Constantes
    const API_KEY_GOOGLEMAPS = import.meta.env.VITE_API_KEY_GOOGLE;

    // Memoized values
    const memoizedUserLocation = useMemo(
        () => (userLocation?.lat && userLocation?.lng ? userLocation : null),
        [userLocation]
    );

    const memoizedMapStyles = useMemo(
        () => customMapStyles || (mode === "dark" ? darkMapStyles : []),
        [mode, customMapStyles]
    );

    // Verifica se a API do Google Maps está carregada
    useEffect(() => {
        let timeoutId;
        let isCancelled = false;

        const checkGoogleAPI = () => {
            if (isCancelled) return;

            if (window.google?.maps?.places) {
                console.log("Google Maps API carregada com sucesso");
                if (!isCancelled) {
                    setApiLoaded(true);
                }
            } else {
                console.log("Aguardando Google Maps API...");
                timeoutId = setTimeout(checkGoogleAPI, 100);
            }
        };

        checkGoogleAPI();

        return () => {
            isCancelled = true;
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, []);

    // Fetch suggestions callback
    const fetchSuggestions = useCallback(
        (input, callback) => {
            // Cancela requests anteriores se existirem
            if (debouncedFetchSuggestions.cancel) {
                debouncedFetchSuggestions.cancel();
            }

            debouncedFetchSuggestions(
                input,
                callback,
                API_KEY_GOOGLEMAPS,
                setIsSearching
            );
        },
        [API_KEY_GOOGLEMAPS]
    );

    // Handle input change
    const handleInputChange = useCallback(
        (event, newInputValue) => {
            setAddress(newInputValue || "");

            if (newInputValue && newInputValue.length >= 2 && apiLoaded) {
                fetchSuggestions(newInputValue, (results) => {
                    setOptions(results || []);
                });
            } else {
                setOptions([]);
            }
        },
        [fetchSuggestions, apiLoaded]
    );

    // Handle select - MEMOIZADO
    const handleSelect = useCallback(
        async (event, newValue) => {
            if (!newValue?.place_id) return;

            const controller = new AbortController();

            try {
                const res = await fetch(
                    `https://places.googleapis.com/v1/places/${newValue.place_id}?key=${API_KEY_GOOGLEMAPS}`,
                    {
                        headers: {
                            "X-Goog-FieldMask":
                                "id,displayName,formattedAddress,location",
                        },
                        signal: controller.signal,
                    }
                );

                if (controller.signal.aborted) return;

                const data = await res.json();

                if (data?.location && !controller.signal.aborted) {
                    const pos = {
                        lat: data.location.latitude,
                        lng: data.location.longitude,
                    };

                    setMarkerPos(pos);
                    setHasUserInteracted(true);
                    setAddress(newValue.description);

                    // Callback opcional para mudança de localização
                    if (onLocationChange) {
                        onLocationChange(pos, newValue.description);
                    }
                }
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error("Erro ao buscar detalhes do lugar:", error);
                }
            }
        },
        [API_KEY_GOOGLEMAPS, onLocationChange]
    );

    // Handle map click - MEMOIZADO
    const handleMapClick = useCallback(
        async (event) => {
            const lat = event.detail.latLng.lat;
            const lng = event.detail.latLng.lng;
            const clickPosition = { lat, lng };

            setHasUserInteracted(true);
            setMarkerPos(clickPosition);

            if (lat && lng && getIpUser) {
                try {
                    const result = await getAddressFromLatLng(lat, lng);
                    const addressText = result.results[0]?.formatted_address;
                    setAddress(addressText);

                    // Callback opcional para mudança de localização
                    if (onLocationChange) {
                        onLocationChange(clickPosition, addressText);
                    }
                } catch (error) {
                    console.error("Erro ao obter endereço:", error);
                    const fallbackAddress = `${lat.toFixed(6)}, ${lng.toFixed(
                        6
                    )}`;
                    setAddress(fallbackAddress);

                    if (onLocationChange) {
                        onLocationChange(clickPosition, fallbackAddress);
                    }
                }
            }
        },
        [getIpUser, getAddressFromLatLng, onLocationChange]
    );

    // Handle zone click - MEMOIZADO
    const handleZoneClick = useCallback(
        async (pos) => {
            setHasUserInteracted(true);
            setMarkerPos(pos);

            if (pos.lat && pos.lng) {
                try {
                    const result = await getAddressFromLatLng(pos.lat, pos.lng);
                    const addressText = result.results[0]?.formatted_address;
                    setAddress(addressText);

                    // Callback opcional para mudança de localização
                    if (onLocationChange) {
                        onLocationChange(pos, addressText);
                    }
                } catch (error) {
                    console.error("Erro ao obter endereço da zona:", error);
                    const fallbackAddress = `${pos.lat.toFixed(
                        6
                    )}, ${pos.lng.toFixed(6)}`;
                    setAddress(fallbackAddress);

                    if (onLocationChange) {
                        onLocationChange(pos, fallbackAddress);
                    }
                }
            }
        },
        [getAddressFromLatLng, onLocationChange]
    );

    // Handle check coverage - MEMOIZADO
    const handleCheckCoverage = useCallback(async () => {
        if (!markerPos || !getIpUser) {
            console.warn(
                "Posição ou IP não disponível para verificar cobertura"
            );
            return;
        }

        setLoading(true);

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

            // Callback opcional para verificação de cobertura
            if (onCoverageCheck) {
                onCoverageCheck(result, markerPos);
            }
        } catch (error) {
            console.error("Erro ao verificar cobertura:", error);
            setLoading(false);
        }
    }, [
        markerPos,
        getIpUser,
        checkCoverage,
        setLocation,
        setShowAvalibe,
        setShowNavigate,
        onCoverageCheck,
    ]);

    // Geolocalização do usuário
    useEffect(() => {
        if (!navigator.geolocation) {
            console.warn("Geolocalização não suportada");
            return;
        }

        let watcherId = null;
        let isActive = true;

        const options = {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 15000,
        };

        const successCallback = (pos) => {
            if (!isActive) return;

            const userPos = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            };
            console.log("Localização do usuário:", userPos);
            setUserLocation(userPos);
        };

        const errorCallback = (err) => {
            if (!isActive) return;
            console.error("Erro na geolocalização:", err);
        };

        try {
            watcherId = navigator.geolocation.watchPosition(
                successCallback,
                errorCallback,
                options
            );
        } catch (error) {
            console.error("Erro ao iniciar geolocalização:", error);
        }

        return () => {
            isActive = false;
            if (watcherId !== null) {
                try {
                    navigator.geolocation.clearWatch(watcherId);
                } catch (error) {
                    console.warn("Erro ao parar geolocalização:", error);
                }
            }
        };
    }, []);

    // Callback para onLoad do mapa - MEMOIZADO
    const handleMapLoad = useCallback(
        (map) => {
            const centerLocation = initialCenter || userLocation;
            if (map && centerLocation?.lat && centerLocation?.lng) {
                map.setCenter(centerLocation);
                map.setZoom(initialZoom || 15);
            }
        },
        [userLocation, initialCenter, initialZoom]
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
                        styles={memoizedMapStyles}
                        defaultCenter={
                            initialCenter || { lat: -8.8383, lng: 13.2344 }
                        }
                        defaultZoom={initialZoom || 12}
                        gestureHandling="auto"
                        minZoom={4.5}
                        disableDefaultUI
                        onClick={handleMapClick}
                    >
                        <MapController
                            userLocation={memoizedUserLocation}
                            clickedPosition={markerPos}
                            hasUserInteracted={hasUserInteracted}
                        />

                        <MapWithUserLocation
                            userLocation={memoizedUserLocation}
                            showUserMarker={!markerPos}
                        />

                        <MapWithGeoJson
                            onZoneClick={handleZoneClick}
                            hasUserInteracted={hasUserInteracted}
                            onLoad={handleMapLoad}
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
                    <Styled.Sand_FormControl>
                        <Autocomplete
                            sx={{ width: "100%" }}
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
                                apiLoaded
                                    ? "Sem resultados"
                                    : "Carregando API..."
                            }
                            onInputChange={handleInputChange}
                            onChange={handleSelect}
                            renderInput={(params) => (
                                <Styled.Input
                                    {...params}
                                    label={
                                        translations.pages.sandbox.input
                                            .placeholder
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
                                                sx={{
                                                    display: "flex",
                                                    width: 44,
                                                }}
                                            >
                                                <LocationSearchingIcon
                                                    sx={{
                                                        color: "text.secondary",
                                                    }}
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
                    </Styled.Sand_FormControl>

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


Sandbox.propTypes = {

    initialCenter: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
    }),

    initialZoom: PropTypes.number,

    onLocationChange: PropTypes.func,

    onCoverageCheck: PropTypes.func,

    customMapStyles: PropTypes.arrayOf(
        PropTypes.shape({
            elementType: PropTypes.string,
            featureType: PropTypes.string,
            stylers: PropTypes.arrayOf(PropTypes.object),
        })
    ),


};



export { Sandbox };
