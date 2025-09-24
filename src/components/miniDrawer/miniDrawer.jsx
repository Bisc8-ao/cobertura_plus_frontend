import { useState } from "react";
import PropTypes from "prop-types";
import { drawerWidth, closedMixin, openedMixin } from "./mix";

import {
    styled,
    Box,
    Drawer as MuiDrawer,
    CssBaseline,
} from "@mui/material";
import { AppBarDrawer } from "./appBarDrawer";

import { NavLink } from "../navLink";

import { vectorImages } from "../../assets";
import { UseThemeMode } from "../../hooks";
import { Link } from "react-router-dom";

const Nav = styled("nav", {
    shouldForwardProp: (prop) => !["open"].includes(prop),
})(({ open }) => ({
    paddingLeft: open ? "2rem" : "0",
    paddingRight: open ? "2rem" : "0",
   
}));
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
    const {mode} = UseThemeMode()

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
                        <Link to="/">
                            <img
                                src={
                                    mode=== "dark"
                                        ? vectorImages.logos.brand.brand_logo_1
                                        : vectorImages.logos.brand.brand_logo_2
                                }
                                width="100"
                            />
                        </Link>
                    )}
                </DrawerHeader>
                <Nav open={open}>
                    <NavLink open={open} />
                </Nav>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}

MiniDrawer.propTypes = {
    children: PropTypes.node.isRequired,
};

export { MiniDrawer };
