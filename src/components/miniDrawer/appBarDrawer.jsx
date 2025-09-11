import React, { useState, useEffect } from "react";
import {
    styled,
    AppBar as MuiAppBar,
    Badge as MuiBadge,
    IconButton,
    Toolbar,
} from "@mui/material";
import { AnchorTemporaryDrawer } from "../anchorTemporaryDrawer";
import { MenuLang } from "../menuLang";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Search } from "../search";
import { drawerWidth } from "./mix";
import { UseUserContext } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { DrawerSettings } from "../drawerSettings";
import {DrawerNotification} from "../drawerNotification"

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, headerChangeBg }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    background: "transparent",
    boxShadow: headerChangeBg
        ? "0px 1px 2px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.1)"
        : "none",
    "&::before": {
        content: '""',
        backdropFilter: "blur(5px)",
        background: "rgba(255, 255, 255, 0.63)",
        visibility: headerChangeBg ? "visible" : "hidden",
        opacity: headerChangeBg ? "1" : "0",
        transition:
            "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), visibility 200ms cubic-bezier(0.4, 0, 0.2, 1)",

        position: "absolute",

        width: "100%",
        height: "100%",
        zIndex: "-1",
    },
    "@media (max-width:1024px)": {
        width: "100%",
    },
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(["width", "margin"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Badge = styled(MuiBadge)({
    "& span": {
        background: "#c20303cb",
        color: "#fff",
        fontWeight: "800",
        fontSize: "1.2rem",
    },
});
function AppBarDrawer({ handleDrawerOpen, handleDrawerClose, open }) {
    const navigate = useNavigate();
    const [headerChangeBg, setHeaderChangeBg] = useState(false);
    const {dispatch} = UseUserContext()

    useEffect(() => {
        const handleScroll = function () {
            if (this.scrollY > 0) {
                setHeaderChangeBg(true);
            } else {
                setHeaderChangeBg(false);
            }

        };
        window.addEventListener("scroll", handleScroll);

        return () => removeEventListener("scroll", handleScroll);
    }, []);



    function handleClickLogout() {

        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_token_exp");


        dispatch({ type: "user_desactive" });

        navigate("/signin", { replace: true });
    }
    return (
        <React.Fragment>
            <AppBar
                position="fixed"
                open={open}
                headerChangeBg={headerChangeBg}
            >
                <Toolbar>
                    <AnchorTemporaryDrawer
                        anchor="left"
                        icon={<MenuIcon fontSize="1rem" />}
                    />
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight: 9,
                                marginLeft: 3,

                                background: "transparent",
                                borderRadius: "50%",
                                border: "1px solid #919eab36",
                                "@media (max-width:1024px)": {
                                    display: "none",
                                },
                            },
                            open && { display: "none" },
                        ]}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerClose}
                        edge="start"
                        sx={[
                            {
                                marginRight: 9,
                                marginLeft: -5.3,

                                background: "transparent",
                                borderRadius: "50%",
                                border: "1px solid #919eab36",
                                "@media (max-width:1024px)": {
                                    display: "none",
                                },
                            },
                            open == false && { display: "none" },
                        ]}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "end",
                            gap: "1rem",
                            alignItems: "center",
                        }}
                    >
                        <Search />
                        <MenuLang />
                        <AnchorTemporaryDrawer
                            anchor="right"
                            icon={
                                <Badge badgeContent={4}>
                                    <NotificationsIcon fontSize="1rem" />
                                </Badge>
                            }
                        >
                            <DrawerNotification />
                        </AnchorTemporaryDrawer>
                        <AnchorTemporaryDrawer
                            anchor="right"
                            icon={<PeopleAltIcon fontSize="1rem" />}
                            width="320px"
                        />
                        <AnchorTemporaryDrawer
                            anchor="right"
                            icon={<SettingsIcon fontSize="1rem" />}
                            width="420px"
                        >
                            <DrawerSettings />
                        </AnchorTemporaryDrawer>
                        <button onClick={handleClickLogout}>Logout</button>
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export { AppBarDrawer };
