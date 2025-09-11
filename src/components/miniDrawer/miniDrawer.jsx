import { useState} from "react";

import {
    styled,
    Box,
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
    Toolbar,
    CssBaseline,
    Button,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import { AnchorTemporaryDrawer } from "../anchorTemporaryDrawer";
import { NavLink } from "../navLink";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { vectorImages } from "../../assets";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
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

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(theme),
                "& .MuiDrawer-paper": openedMixin(theme),
            },
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                "& .MuiDrawer-paper": closedMixin(theme),
            },
        },
    ],
}));

function MiniDrawer({ children }) {
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
                sx={{
                    background: "transparent",
                    boxShadow: "none",
                }}
            >
                <Toolbar>
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
                            alignItems: "center",
                        }}
                    >
                        <AnchorTemporaryDrawer
                            anchor="right"
                            icon={<NotificationsIcon />}
                        />
                        <AnchorTemporaryDrawer
                            anchor="right"
                            icon={<PeopleAltIcon />}
                        />
                        <AnchorTemporaryDrawer
                            anchor="right"
                            icon={<SettingsIcon />}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        paddingLeft: "2rem",
                    }}
                >
                    {open === true && (
                        <img src={vectorImages.logos.brand.brand_logo_2} />
                    )}
                </DrawerHeader>
                <NavLink />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}

export { MiniDrawer };
