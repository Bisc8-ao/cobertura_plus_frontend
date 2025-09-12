import React, { useState } from "react";
import {
    Box,
    styled,
    Typography,
    IconButton,
    Card as MuiCard,
    CardContent as MuiCardContent,
    Switch as MuiSwitch,
} from "@mui/material";
import { vectorImages } from "../../assets";
import CloseIcon from "@mui/icons-material/Close";
import { UseLangContext } from "../../hooks";
const Wrapper = styled("div")({
    height: "100%",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
});

const Switch = styled((props) => (
    <MuiSwitch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
    />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor: "#65C466",
                opacity: 1,
                border: 0,
                ...theme.applyStyles("dark", {
                    backgroundColor: "#2ECA45",
                }),
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
            },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color: theme.palette.grey[100],
            ...theme.applyStyles("dark", {
                color: theme.palette.grey[600],
            }),
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: 0.7,
            ...theme.applyStyles("dark", {
                opacity: 0.3,
            }),
        },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 22,
        height: 22,
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: "#E9E9EA",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
        ...theme.applyStyles("dark", {
            backgroundColor: "#39393D",
        }),
    },
}));

const Card = styled(MuiCard)({
    background: "rgba(122, 122, 122, 0.08)",
    width: "100%",
    height: "16rem",
    borderRadius: ".8rem",
    padding: "1rem",
    boxShadow: "none",
});

const CardContent = styled(MuiCardContent)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
});

const CardHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    "& > span:last-child": {
        color: theme.palette.primary.main,
        fontWeight: "700",
        fontSize: "1.4rem",
    },
}));

const CardFooter = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    "&:last-child": {
        color: theme.palette.primary.main,
        fontWeight: "700",
        fontSize: "1.4rem",
    },
}));

function DrawerSettings() {
     const { langSelected, setLangSelected } = UseLangContext();
    const [isPortuguese, setIsPortuguese] = useState(() => {
        const portuguesSelected = langSelected === "Português" ? true : false;
        return portuguesSelected;
    });
    const [isIngles, setIsIngles] = useState(() => {
        const InglesSelected = langSelected === "Inglês" ? true : false;
        return InglesSelected;
    });
    const flags = {
        Português: vectorImages.flags.Pt_flag,
        Inglês: vectorImages.flags.GB_flag,
    };

    function handleSwitchChangePt(event) {

        if (isPortuguese === false) {

            setLangSelected("Português");
            setIsPortuguese(true);
            setIsIngles(false);
        } else {
            setIsIngles(true)
            setIsPortuguese(event.target.checked);
             setLangSelected("Inglês");
        }
    }

     function handleSwitchChangeIng(event) {
         if (isIngles === false) {

             setLangSelected("Inglês");
             setIsIngles(true);
              setIsPortuguese(false);
            } else {
             setIsPortuguese(true);
             setLangSelected("Português");
            setIsIngles(event.target.checked);
         }
     }
    return (
        <React.Fragment>
            <Wrapper>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h5"
                        component="span"
                        sx={{ fontWeight: "700" }}
                    >
                        Settings
                    </Typography>

                    <IconButton>
                        <CloseIcon fontSize="3rem" />
                    </IconButton>
                </Box>

                <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2rem",
                        width: "100%",

                    }}
                >
                    <Card>
                        <CardContent>
                            <CardHeader>
                                <img
                                    src={flags["Português"]}
                                    alt="flag"
                                    width={27}
                                />
                                <Switch
                                    sx={{ m: 1 }}
                                    checked={isPortuguese}
                                    onChange={handleSwitchChangePt}
                                />
                            </CardHeader>

                            <CardFooter>
                                <Typography
                                    variant="h3"
                                    component="span"
                                    sx={{
                                        fontSize: "1.4rem",
                                        fontWeight: "700",
                                    }}
                                >
                                    Portugues
                                </Typography>
                            </CardFooter>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <CardHeader>
                                <img
                                    src={flags["Inglês"]}
                                    alt="flag"
                                    width={27}
                                />
                                <Switch
                                    sx={{ m: 1 }}
                                    checked={isIngles}
                                    onChange={handleSwitchChangeIng}
                                />
                            </CardHeader>

                            <CardFooter>
                                <Typography
                                    variant="h3"
                                    component="span"
                                    sx={{
                                        fontSize: "1.4rem",
                                        fontWeight: "700",
                                    }}
                                >
                                    Inglês
                                </Typography>
                            </CardFooter>
                        </CardContent>
                    </Card>
                </Box>
            </Wrapper>
        </React.Fragment>
    );
}

export { DrawerSettings };
