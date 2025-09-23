import PropTypes from "prop-types";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
} from "@mui/material";
import { useLangContext } from "../../hooks";
import PersonIcon from "@mui/icons-material/Person";
import SpeedIcon from "@mui/icons-material/Speed";
import MapIcon from "@mui/icons-material/Map";
import BarChartIcon from "@mui/icons-material/BarChart";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const ListText = styled(ListItemText, {
    shouldForwardProp: (prop) =>
        !["isActive", "open", "fontSize"].includes(prop),
})(({ theme, isActive, open, fontSize }) => ({
    minWidth: 0,
    justifyContent: "center",
    opacity: open ? 1 : 0,

    "& span": {
        color: isActive ? theme.palette.primary.main : theme.palette.gray[400],
        fontSize,
        fontWeight: 800,
    },

    "@media (max-width:1024px)": {
        opacity: 1,
    },
}));

function NavLink({ open }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { translations } = useLangContext();

    const [openMap, setOpenMap] = useState(false);
    const [openUser, setOpenUser] = useState(false);

    const handleToggleMap = () => setOpenMap(!openMap);
    const handleToggleUser = () => setOpenUser(!openUser);

    const categories = [
        {
            title: translations.navlink.category.overview,
            items: [
                {
                    text: translations.navlink.app,
                    icon: <SpeedIcon fontSize="2.4rem" />,
                    to: "/dashboard",
                },
                {
                    text: translations.navlink.statistics,
                    icon: <BarChartIcon fontSize="2.4rem" />,
                    to: "/dashboard/statistics",
                },
                // Collapse: Map
                {
                    text: translations.navlink.map,
                    icon: <MapIcon fontSize="2.4rem" />,
                    collapse: true,
                    children: [
                        {
                            text: translations.navlink.map,
                            icon: <MapIcon fontSize="2.4rem" />,
                            to: "/dashboard/map",
                        },
                        {
                            text: translations.navlink.hatmap,
                            icon: <MapIcon fontSize="2.4rem" />,
                            to: "/dashboard/hatmap",
                        },
                    ],
                },
            ],
        },
        {
            title: translations.navlink.category.management,
            items: [
                // Collapse: User
                {
                    text: translations.navlink.user,
                    icon: <PersonIcon fontSize="2.4rem" />,
                    collapse: true,
                    children: [
                        {
                            text: translations.navlink.user,
                            icon: <PersonIcon fontSize="2.4rem" />,
                            to: "/dashboard/profile",
                        },
                    ],
                },
            ],
        },
    ];

    const renderItem = (item, index) => {
        const isActive = location.pathname === item.to;

        if (item.collapse) {
            const isMap = item.text === translations.navlink.map;
            const isUser = item.text === translations.navlink.user;
            const isOpen = isMap ? openMap : isUser ? openUser : false;
            const toggle = isMap ? handleToggleMap : handleToggleUser;

            return (
                <div key={index}>
                    <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            onClick={toggle}
                            sx={{
                                padding: `1rem ${
                                    open === false ? "2rem" : "1rem"
                                }`,
                                margin: "1rem 0",
                                borderRadius: ".8rem",
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 1 : "auto",
                                    justifyContent: "center",
                                    fontSize: "2rem",
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListText
                                isActive={false}
                                open={open}
                                fontSize="1.6rem"
                                primary={item.text}
                            />
                            {isOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </ListItem>
                    <Collapse in={isOpen} timeout="auto" unmountOnExit >
                        <List component="div" disablePadding>
                            {item.children.map((child, i) => {
                                const isActiveChild =
                                    location.pathname === child.to;
                                return (
                                    <ListItemButton
                                        key={i}
                                        sx={{
                                            pl: 4,
                                            background: isActiveChild
                                                ? "#1ca6e61e"
                                                : "transparent",
                                            margin: ".4rem 0",
                                            borderRadius: ".6rem",
                                        }}
                                        onClick={() => navigate(child.to)}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                color:
                                                    isActiveChild && "#1CA5E6",
                                                minWidth: 0,
                                                mr: 1,
                                            }}
                                        >
                                            {child.icon}
                                        </ListItemIcon>
                                        <ListText
                                            isActive={isActiveChild}
                                            open={open}
                                            fontSize="1.2rem"
                                            primary={child.text}
                                        />
                                    </ListItemButton>
                                );
                            })}
                        </List>
                    </Collapse>
                </div>
            );
        }

        // Normal item sem collapse
        return (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                    onClick={() => navigate(item.to)}
                    sx={{
                        background: isActive ? "#1ca6e61e" : "transparent",
                        padding: `1rem ${open === false ? "2rem" : "1rem"}`,
                        margin: "1rem 0",
                        borderRadius: ".8rem",
                    }}
                >
                    <ListItemIcon
                        sx={{
                            color: isActive && "#1CA5E6",
                            minWidth: 0,
                            mr: open ? 1 : "auto",
                            justifyContent: "center",
                            fontSize: "2rem",
                        }}
                    >
                        {item.icon}
                    </ListItemIcon>
                    <ListText
                        isActive={isActive}
                        open={open}
                        fontSize="1.6rem"
                        primary={item.text}
                    />
                </ListItemButton>
            </ListItem>
        );
    };

    const renderList = (title, items, index) => (
        <List key={index} sx={{ paddingX: open ? "1.6rem": "0" }}>
            <ListItem>
                <ListText
                    open={open}
                    fontSize="1.2rem"
                    primary={title}
                    sx={{ textTransform: "uppercase" }}
                />
            </ListItem>
            {items.map((item, idx) => renderItem(item, idx))}
        </List>
    );

    return (
        <>
            {categories.map((cat, index) =>
                renderList(cat.title, cat.items, index)
            )}
        </>
    );
}

NavLink.propTypes = {
    open: PropTypes.bool.isRequired,
};

export { NavLink };
