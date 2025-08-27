import React, { useState } from "react";
import {
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from "@mui/material";
import { images } from "../../../assets";
import { styled } from "@mui/material";
import * as Styled from "../../../styles";
import { Link } from "react-router-dom";
import { Button } from "../../../components";
import Alert from "@mui/material/Alert";
import InfoIcon from "@mui/icons-material/Info";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const Wrapper = styled("div")({
    width: "100%",
    height: "100%",
});

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            <Wrapper>
                <Styled.Container_Grid gridTemplateColumns="4.7fr 7.5fr">
                    <Styled.GridImg
                        img={images.characters.character_1}
                        borderRadius="0 1.5rem 1.5rem 0"
                    />
                    <Styled.GridContent>
                        <Styled.ContainerForm>
                            <Styled.ContainerFormContent>
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    sx={{
                                        fontSize: "1.9rem",
                                        fontWeight: "800",
                                        lineHeight: "2.8rem",
                                    }}
                                >
                                    Inicie sessão na sua conta
                                </Typography>
                                <span>
                                    Não tens uma conta?{" "}
                                    <Link to="/signup">Criar conta</Link>
                                </span>
                            </Styled.ContainerFormContent>

                            <Styled.ContainerInputs>
                                <Alert
                                    severity="info"
                                    sx={{
                                        background: "#CAFDF5",
                                        fontSize: "1.4rem",
                                    }}
                                    icon={
                                        <InfoIcon
                                            sx={{
                                                color: "#00B8D9",
                                                fontSize: "2.4rem",
                                            }}
                                        />
                                    }
                                >
                                    O seu email deve possuir{" "}
                                    <strong>@tvcabo.co.ao</strong>
                                </Alert>
                                <Styled.Input
                                    id="outlined-basic"
                                    label="Endereço de email"
                                    type="email"
                                />

                                <Styled.ForgotPassword>
                                    <Link>Recuperar senha!</Link>
                                    <Styled.FormControlPassword variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">
                                            Senha
                                        </InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label={
                                                            showPassword
                                                                ? "hide the password"
                                                                : "display the password"
                                                        }
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                        onMouseUp={
                                                            handleMouseUpPassword
                                                        }
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Senha"
                                        />
                                    </Styled.FormControlPassword>
                                </Styled.ForgotPassword>
                                <Button
                                    variant="contained"
                                    text="Iniciar sessão"
                                    type="submit"
                                />

                               
                            </Styled.ContainerInputs>
                        </Styled.ContainerForm>
                    </Styled.GridContent>
                </Styled.Container_Grid>
            </Wrapper>
        </React.Fragment>
    );
}

export { SignIn };
