import { useState } from "react";
import { drawerWidth, closedMixin, openedMixin } from "./mix";

import {
    styled,
    Box,
    Drawer as MuiDrawer,
    CssBaseline,
    Badge as MuiBadge,
} from "@mui/material";
import { AppBarDrawer } from "./appBarDrawer";

import { NavLink } from "../navLink";

import { vectorImages } from "../../assets";


const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",

    "@media (max-width:1024px)": {
        display: "none",
    },
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
            <AppBarDrawer
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
                open={open}
            />
            <Drawer variant="permanent" open={open}>
                <DrawerHeader
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        paddingLeft: "3rem",
                    }}
                >
                    {open === true && (
                        <img src={vectorImages.logos.brand.brand_logo_2} />
                    )}
                </DrawerHeader>
                <NavLink open={open} />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}

export { MiniDrawer };
