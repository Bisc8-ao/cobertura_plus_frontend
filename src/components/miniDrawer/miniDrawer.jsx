import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
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
const ListText = styled(ListItemText)(({ theme, isActive, open }) => ({

    minWidth: 0,
    justifyContent: "center",

    opacity: open ? 1 : 0,
    "& span": {
        color: isActive ? theme.palette.primary.main : theme.palette.gray[400],
        fontSize: "1.2rem",
        fontWeight: "800",
    },
}));

function MiniDrawer({ children }) {
    const [open, setOpen] = useState(true);
    const [isActiveLink, setIsActiveLink] = useState();
    const location = useLocation();
    const navigate = useNavigate()
    const itemSidebar = [
        {
            text: "All mail",
            icon: <InboxIcon />,
            to: "/dashboard",
        },
        {
            text: "Estatísticas",
            icon: <MailIcon />,
            to: "/statistics",
        },
        {
            text: "Mapas",
            icon: <InboxIcon />,
            to: "/map",
        },
        {
            text: "Mapas",
            icon: <InboxIcon />,
            to: "/map",
        },
        {
            text: "Utilizador",
            icon: <InboxIcon />,
            to: "/map",
        },
    ];

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const handleClick = (to) => {
        navigate(to)
    }

    useEffect(() => {
        setIsActiveLink(location.pathname);
    }, [location]);
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
                sx={{
                    background: "transparent",
                    boxShadow: "none",
                    zIndex: "1300",
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

                                background: "#919eab36",
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
                                marginLeft: -5,

                                background: "#919eab36",
                                position: "absolute",
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
                        <Typography variant="h6" noWrap component="div">
                            Mini variant drawer
                        </Typography>
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
                {/*list 1*/}
                <List>
                    <ListItem>
                        <ListText
                            open={open}
                            primary={"Overview"}
                            sx={{ textTransform: "uppercase" }}
                        />
                    </ListItem>
                    {itemSidebar.map((item, index) => {
                        const isActive = item.to === isActiveLink;

                       return index <= 3 && (
                            <ListItem
                                key={index}
                                disablePadding
                                sx={{
                                    display: "block",
                                    padding: "0 1rem",

                                }}
                            >
                                <ListItemButton
                                    onClick={() => handleClick(item.to)}
                                    sx={[
                                        {
                                            background: isActive
                                                ? "#1ca6e61e"
                                                : "transparent",
                                            padding: ".5rem 1rem",
                                            margin: "1rem 0",
                                            borderRadius: ".4rem",

                                        },
                                        open
                                            ? {
                                                  justifyContent: "initial",
                                              }
                                            : {
                                                  justifyContent: "center",
                                              },
                                    ]}
                                >
                                    <ListItemIcon
                                        sx={[
                                            {
                                                color: isActive && "#1CA5E6",
                                                minWidth: 0,
                                                justifyContent: "center",
                                            },
                                            open
                                                ? {
                                                      mr: 3,
                                                  }
                                                : {
                                                      mr: "auto",
                                                  },
                                        ]}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListText
                                        isActive={isActive}
                                        open={open}
                                        primary={item.text}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
                {/*list 2*/}
                <List>
                    <ListItem>
                        <ListText
                            open={open}
                            primary={"Gestão"}
                            sx={{ textTransform: "uppercase" }}
                        />
                    </ListItem>
                    {itemSidebar.map((item, index) => {
                        const isActive = item.to === isActiveLink;
                         return (
                             index > 3 && (
                                 <ListItem
                                     key={index}
                                     disablePadding
                                     sx={{
                                         display: "block",
                                         padding: "0 1rem",
                                     }}
                                 >
                                     <ListItemButton
                                         onClick={() => handleClick(item.to)}
                                         sx={[
                                             {
                                                 background: isActive
                                                     ? "#1ca6e61e"
                                                     : "transparent",
                                                 padding: ".5rem 1rem",
                                                 margin: "1rem 0",
                                                 borderRadius: ".4rem",
                                             },
                                             open
                                                 ? {
                                                       justifyContent:
                                                           "initial",
                                                   }
                                                 : {
                                                       justifyContent: "center",
                                                   },
                                         ]}
                                     >
                                         <ListItemIcon
                                             sx={[
                                                 {
                                                     color:
                                                         isActive && "#1CA5E6",
                                                     minWidth: 0,
                                                     justifyContent: "center",
                                                 },
                                                 open
                                                     ? {
                                                           mr: 3,
                                                       }
                                                     : {
                                                           mr: "auto",
                                                       },
                                             ]}
                                         >
                                             {item.icon}
                                         </ListItemIcon>
                                         <ListText
                                             isActive={isActive}
                                             open={open}
                                             primary={item.text}
                                         />
                                     </ListItemButton>
                                 </ListItem>
                             )
                         );
                    })}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}

export { MiniDrawer };
