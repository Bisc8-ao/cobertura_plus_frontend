import * as React from "react";
import PropTypes from "prop-types";
import { Box, styled, Drawer as MuiDrawer, Button } from "@mui/material";

import { useState } from "react";

const Drawer = styled(MuiDrawer)(({ anchor }) => ({
    display: anchor === "left" && "none",
    "& .MuiBackdrop-root": {
        background: anchor !== "left" && "transparent",
    },
    "@media (max-width: 1024px)": {
        display: anchor === "left" && "flex",
    },
}));
function AnchorTemporaryDrawer({
    anchor,
    icon,
    children,
    width,
    btnWidth,
    btnRadius,
}) {
    const [state, setState] = useState({
        left: false,
        right: false,
    });

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = () => (
        <Box
            sx={{
                width: width,
                "@media (max-width:430px)": {
                    width: "280px"
                }
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {children}
        </Box>
    );

    return (
        <div>
            <React.Fragment key={anchor}>
                <Button
                    onClick={toggleDrawer(true)}
                    sx={{
                        width: btnWidth,
                        minWidth: btnWidth,
                        height: "3rem",
                        borderRadius: btnRadius,
                        color: "#637381",
                        fontSize: "2rem",

                        textTransform: "none",
                        display: anchor === "left" && "none",
                        "@media (max-width: 1024px)": {
                            display: anchor === "left" && "flex",
                        },
                    }}
                >
                    {icon}
                </Button>
                <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(false)}
                    sx={{ zIndex: "1300" }}
                >
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

AnchorTemporaryDrawer.propTypes = {
    anchor: PropTypes.string,
    icon: PropTypes.node,
    children: PropTypes.node.isRequired,
    width: PropTypes.string,
    btnWidth: PropTypes.string,
    btnRadius: PropTypes.string,
};

export { AnchorTemporaryDrawer };
