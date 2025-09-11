import React from "react";
import { Box, styled, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const Wrapper = styled("div")({
    height: "100%",
    padding: "2rem",
});
function DrawerSettings() {
    return (
        <React.Fragment>
            <Wrapper>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h5"
                        component="span"
                        sx={{ fontWeight:"700"}}
                    >
                        Settings
                    </Typography>

                    <IconButton>
                        <CloseIcon fontSize="3rem"/>
                    </IconButton>
                </Box>
            </Wrapper>
        </React.Fragment>
    );
}

export { DrawerSettings };
