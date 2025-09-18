import React, { useEffect, useState } from "react";
import {
    APIProvider,
    Map as GoogleMap,
    Marker,
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
    backgroundPosition: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",

    "&::after": {
        content: '""',
        position: "absolute",
        top: "0",
        left: "0",
        background: `linear-gradient(0deg, rgba(14, 14, 14, 0.03), rgba(14, 14, 14, 0.02))`,
        filter: "blur(2px)",
        backgroundPosition: "100%",
        backgroundSize: "cover",
        zIndex: -1,
        width: "100%",
        height: "100%",
    },
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

    "@media (max-width: 430px)": {
        padding: "4rem 0",
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
        lineHeight: "2.4rem",
    },

    "& label.Mui-focused": {
        color: "#1d1b20",
        top: "-.2rem",
        fontWeight: "600",
    },

    "& label.MuiInputLabel-shrink": {
        top: "-.1rem",
        color: theme.palette.gray[900],
    },

    "& .MuiInputBase-input": {
        fontSize: theme.typography.sizes.base,
        padding: "1.4rem",
        color: theme.palette.gray[900],
    },

    "& .MuiOutlinedInput-root": {
        borderColor: theme.palette.red[500],
        position: "relative",
        zIndex: "2",

        "& fieldset": {
            borderRadius: ".4rem",
            border: `.1rem solid ${theme.palette.gray["900_25"]}`,
            borderWidth: ".1rem",
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.gray["900_25"],
            borderWidth: ".1rem",
        },
        "&::after": {
            content: '""',
            position: "absolute",
            top: "0",
            left: "0",
            background: `linear-gradient(0deg, rgba(236, 236, 236, 0.86), rgba(236, 236, 236, 0.86))`,
            filter: "blur(12px)",
            backgroundPosition: "100%",
            backgroundSize: "cover",
            zIndex: -1,
            width: "100%",
            height: "100%",
        },
    },
}));
const ContainerLoader = styled("div")(() => ({
    position: "absolute",
    top: "0",
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
    width: "100%",
    height: "100&",
    background:"#e41b1b3a"
}))

function Sandbox() {
    const [markerPos, setMarkerPos] = useState(null);
    const API_KEY = import.meta.env.VITE_API_KEY_GOOGLE;
    const [showAvalibe, setShowAvalibe] = useState(false);
    const [showVerific, setShowVerific] = useState(false);

    const handleMapClick = (event) => {
        const lat = event.detail.latLng.lat;
        const lng = event.detail.latLng.lng;
        console.log("Local clicado:", lat, lng);
        setMarkerPos({ lat, lng });
        setShowAvalibe(true);
    };
    useEffect(() => {
        if (showAvalibe) {
            const timeOut = setTimeout(() => {
                setShowAvalibe(false);
                ///setShowVerific(true);
            }, 3000);
            return () => clearTimeout(timeOut);
        }
    }, [showAvalibe]);
    return (
        <React.Fragment>
            <Wrapper>
                {showAvalibe && (

                        <Loader Animation={lotties.MarkAnimation} width ="20%" bg={true}/>

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
                        {" "}
                        {markerPos && <Marker position={markerPos} />}
                    </GoogleMap>
                </APIProvider>
                <Container>
                    <FormControl variant="outlined" sx={{ width: "60%" }}>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                "aria-label": "weight",
                            }}
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
