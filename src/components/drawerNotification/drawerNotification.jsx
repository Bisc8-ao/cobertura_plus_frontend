import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Box,
    styled,
    Typography,
    IconButton,
    Tabs as MuiTabs,
    Tab as MuiTab,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLangContext } from "../../hooks";

const Wrapper = styled("div")({
    height: "100%",
});

const Tabs = styled(MuiTabs)(({ theme }) => ({
    background: theme.palette.mode === "dark" ? "#28323c" : "#adadad1a",
    display: "flex",
    alignItems: "center",
    padding: "0 1.5rem",
    "& .MuiTabs-indicator": {
        gap: "1rem",
        display: "none",
    },
    "& .MuiTabs-list": {
        gap: "1.5rem",
    },
}));
const Tab = styled(MuiTab)(({ theme }) => ({
    width: "30%",
    textTransform: "capitalize",
    fontWeight: 600,
    fontSize: "1.2rem",
    color: theme.palette.mode ==="dark" ? "#58636f" : "#555",
    padding: "1rem",
    minHeight: "unset",
    borderRadius: ".8rem",
    transition: "all 0.3s linear",
    "&.Mui-selected": {
        color: theme.palette.primary.main,
        background: theme.palette.common.white,
        "&:hover": {
            backgroundColor: theme.palette.common.white,
        },
    },
    "&:hover": {
        backgroundColor: "#f5f5f5",
    },
}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

function DrawerNotification() {
    const [value, setValue] = useState(0);
    const { translations } = useLangContext();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <React.Fragment>
            <Wrapper onClick={(e) => e.stopPropagation()}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "2rem",
                    }}
                >
                    <Typography
                        variant="h5"
                        component="span"
                        sx={{ fontWeight: "700" }}
                    >
                        {translations.components.DrawerNotification.notif}
                    </Typography>

                    <IconButton>
                        <SettingsIcon fontSize="3rem" />
                    </IconButton>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab
                            label={
                                translations.components.DrawerNotification.btn
                                    .all
                            }
                            {...a11yProps(0)}
                        />
                        <Tab
                            label={
                                translations.components.DrawerNotification.btn
                                    .unr
                            }
                            {...a11yProps(1)}
                        />
                        <Tab
                            label={
                                translations.components.DrawerNotification.btn
                                    .arc
                            }
                            {...a11yProps(2)}
                        />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        {translations.components.DrawerNotification.btn.all}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {translations.components.DrawerNotification.btn.unr}
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {translations.components.DrawerNotification.btn.arc}
                    </TabPanel>
                </Box>
            </Wrapper>
        </React.Fragment>
    );
}

export { DrawerNotification };
