import PropTypes from "prop-types";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useLangContext } from "../../hooks";
import PersonIcon from "@mui/icons-material/Person";
import SpeedIcon from "@mui/icons-material/Speed";
import MapIcon from "@mui/icons-material/Map";
import BarChartIcon from "@mui/icons-material/BarChart";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";

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
        {
            title: translations.navlink.category.management,
            items: [
                {
                    text: translations.navlink.user,
                    icon: <PersonIcon fontSize="2.4rem" />,
                    to: "/dashboard/profile",
                },
            ],
        },
    ];

    const renderList = (title, items, index) => (
        <List key={index} sx={{paddingX:" 1.6rem"}}>
            <ListItem>
                <ListText
                    open={open}
                    fontSize="1.2rem"
                    primary={title}
                    sx={{ textTransform: "uppercase" }}
                />
            </ListItem>

            {items.map((item, index) => {
                const isActive = location.pathname === item.to;
                return (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: "block", padding: ` 0 ${open === false ? "0" :"1rem" }` }}
                    >
                        <ListItemButton
                            onClick={() => navigate(item.to)}
                            sx={[
                                {
                                    background: isActive
                                        ? "#1ca6e61e"
                                        : "transparent",
                                    padding:` 1rem ${open === false ? "2rem" :"1rem" }` ,
                                    margin: "2rem 0",
                                    borderRadius: ".8rem",
                                    "@media (max-width:1024px)": {
                                        gap: "2rem",
                                    },
                                },
                                open
                                    ? { justifyContent: "initial" }
                                    : { justifyContent: "center" },
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    {
                                        color: isActive && "#1CA5E6",
                                        minWidth: 0,
                                        justifyContent: "center",
                                        fontSize: "2rem",
                                    },
                                    open ? { mr: 3 } : { mr: "auto" },
                                ]}
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
            })}
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
