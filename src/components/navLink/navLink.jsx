import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import SpeedIcon from "@mui/icons-material/Speed";
import MapIcon from "@mui/icons-material/Map";
import BarChartIcon from "@mui/icons-material/BarChart";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";

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
function NavLink() {
    const [isActiveLink, setIsActiveLink] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    const itemSidebar = [
        {
            text: "App",
            icon: <SpeedIcon />,
            to: "/dashboard",
        },
        {
            text: "Estatísticas",
            icon: <BarChartIcon />,
            to: "/statistics",
        },
        {
            text: "Mapas",
            icon: <MapIcon />,
            to: "/map",
        },
        {
            text: "Mapas",
            icon: <MapIcon />,
            to: "/map",
        },
        {
            text: "Utilizador",
            icon: <PersonIcon />,
            to: "/user",
        },
    ];

    const handleClick = (to) => {
        navigate(to);
    };

    useEffect(() => {
        setIsActiveLink(location.pathname);
    }, [location]);

    return (
        <React.Fragment>
            {/*list 1*/}
            <List>
                <ListItem>
                    <ListText
                        open={open}
                        primary={"Overview"}
                        sx={{
                            textTransform: "uppercase",
                            fontSize: "1.2rem",
                        }}
                    />
                </ListItem>
                {itemSidebar.map((item, index) => {
                    const isActive = item.to === isActiveLink;

                    return (
                        index <= 3 && (
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
                        )
                    );
                })}
            </List>
            {/*list 2*/}
            <List>
                <ListItem>
                    <ListText
                        open={open}
                        primary={"Gestão"}
                        sx={{
                            textTransform: "uppercase",
                            fontSize: "1.2rem",
                        }}
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
                                    <ListItemText
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
        </React.Fragment>
    );
}

export { NavLink };
