import React from "react";
import {
    Box,
    styled,
    Typography,
    IconButton,
    Button as MuiButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks";

const Wrapper = styled("div")({
    height: "90svh",
    padding: "2rem",
    position: "relative",
});

const Button = styled(MuiButton)(({ theme }) => ({
    width: "100%",
    padding: "1.2rem",
    fontSize: "1.2rem",
    fontWeight: "700",
    border: "1px solid #e23b3b48",
    background: "transparent",
    boxShadow: "none",
    textTransform: "none",
    color:
        theme.palette.mode === "dark"
            ? theme.palette.common.white
            : theme.palette.common.black,
    "&:hover": {
        background: "#e23b3b48",
        color: "#fff",
        boxShadow: "none",
    },
}));
function DrawerProfile() {
    const navigate = useNavigate();

    const { dispatch } = useUserContext();
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
                        height: "100%",
                        flexDirection: "column",
                        padding: "4rem 0",

                        gap: "3.6rem",
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
                    <Button variant="contained" onClick={handleClickLogout}>
                        Logout
                    </Button>
                </Box>
            </Wrapper>
        </React.Fragment>
    );
}

export { DrawerProfile };
