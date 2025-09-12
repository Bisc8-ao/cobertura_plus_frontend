import React from "react";
import { Box, styled, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { UseUserContext } from "../../hooks";

const Wrapper = styled("div")({
    height: "100%",
    padding: "2rem",
});
function DrawerProfile() {
    const navigate = useNavigate();

    const { dispatch } = UseUserContext();
    function handleClickLogout() {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_token_exp");

        dispatch({ type: "user_desactive" });

        navigate("/signin", { replace: true });
    }
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
                    <IconButton>
                        <CloseIcon fontSize="3rem" />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        flexDirection: "column",
                        padding: "4rem 0",
                        gap: "2.6rem",
                    }}
                >
                    <Avatar
                        alt="Remy Sharp"
                        src="https://avatars.githubusercontent.com/u/85850757?v=4"
                        sx={{ width: "10rem", height: "10rem" }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: ".5rem",
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="span"
                            sx={{ fontWeight: "800" }}
                        >
                            Yuran Simão
                        </Typography>
                        <Typography variant="h5" component="span">
                            yuran@bisc8.co
                        </Typography>
                    </Box>
                </Box>
                <button onClick={handleClickLogout}>Logout</button>
            </Wrapper>
        </React.Fragment>
    );
}

export { DrawerProfile };
