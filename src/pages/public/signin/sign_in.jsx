import React, { useState } from "react";
import { email, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { UseUserContext } from "../../../hooks";
const Wrapper = styled("div")({
    width: "100%",
    height: "100%",
});

const schema = z.object({
    email: z
        .string()
        .nonempty("O email é obrigatório")
        .email("Endereço de email inválido")
        .refine((val) => val.endsWith("@tvcabo.co.ao"), {
            message: "O email deve terminar com @tvcabo.co.ao",
        }),
    password: z
        .string()
        .nonempty("A senha é obrigatória")
        .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const { dispatch } = UseUserContext();
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    async function onSubmit(data) {
        setLoading(true);

        try {
            const payload = {
                email: data.email,
                password: data.password,
            };

            const res = await fetch("http://192.168.1.78:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const datas = await res.json();

            if (res.ok) {
                setLoading(false);
                console.log();
            } else {
                setErrorMessage(datas.message);
                console.log("Login error:", res.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

        /*dispatch({
            type: "user_active", payload: {
                email: data.email,
                name: data.email,
                photo: data.email
            } });*/
        //navigate("/dashboard");
    }

    return (
        <React.Fragment>
            <Wrapper>
                <Styled.Container_Grid gridTemplateColumns="4.7fr 7.5fr">
                    <Styled.GridImg
                        img={images.characters.character_1}
                        borderRadius="0 1.5rem 1.5rem 0"
                    />
                    <Styled.GridContent>
                        <Styled.ContainerForm onSubmit={handleSubmit(onSubmit)}>
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
                                <Styled.AdaptiveAlert
                                    severity="info"
                                    icon={<Styled.AdaptiveInfoIcon />}
                                >
                                    {errorMessage ? (
                                        errorMessage
                                    ) : (
                                        <>
                                            O seu email deve possuir
                                            <strong>@tvcabo.co.ao</strong>
                                        </>
                                    )}
                                </Styled.AdaptiveAlert>
                                <Styled.Input
                                    error={!!errors.email}
                                    {...register("email")}
                                    id="outlined-basic"
                                    label="Endereço de email"
                                    type="email"
                                    helperText={
                                        errors.email ? errors.email.message : ""
                                    }
                                />

                                <Styled.ForgotPassword>
                                    <Link to="/forgotpassword">
                                        Recuperar senha!
                                    </Link>
                                    <Styled.FormControlPassword
                                        variant="outlined"
                                        error={!!errors.password}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password">
                                            Senha
                                        </InputLabel>
                                        <OutlinedInput
                                            {...register("password")}
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
                                    loading={loading}
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
