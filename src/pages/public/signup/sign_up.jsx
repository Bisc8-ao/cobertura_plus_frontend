import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FormHelperText,
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



const schema = z
    .object({
        firstName: z
            .string()
            .nonempty("O primeiro nome é obrigatório ")
            .min(2, "O primeiro nome deve ter no mínimo 2 caracteres"),

        lastName: z
            .string()
            .nonempty("O último nome é obrigatório")
            .min(2, "O último nome deve ter no mínimo 2 caracteres"),

        email: z
            .string()
            .nonempty("O email é obrigatório")
            .email("Endereço de email inválido")
            .refine((val) => val.endsWith("@tvcabo.co.ao"), {
                message: "O email deve terminar com @tvcabo.co.ao",
            }),

        password: z
            .string()
            .nonempty("A palavra passe é obrigatória")
            .min(6, "A palavra passe deve ter no mínimo 6 caracteres"),

        confirmPassword: z
            .string()
            .nonempty("A confirmação da senha é obrigatória"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "As senhas não coincidem",
    });

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { dispatch } = UseUserContext();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    async function onSubmit(value) {
        setLoading(true);
        try {
            const payload = {
                userEmail: value.email,
                userPassword: value.password,
                userFirstName: value.firstName,
                userLastName: value.lastName,
            };

            const response = await fetch(
                "http://192.168.1.78:3000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                if (data.user) {

                    dispatch({
                        type: "user_active",
                        payload: {
                            firstName: data.user.userFirstName,
                            lastName:data.user.userLastName,
                            email: data.user.userEmail,
                            id: data.user.id,
                        },
                    });
                    //navigate("/dashboard");
                }

                setLoading(false);
            } else {
                setLoading(false);
                console.log("Login error:", response);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    return (
        <React.Fragment>

            <Wrapper>
                <Styled.Container_Grid gridTemplateColumns="7.5fr 4.7fr">
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
                                    Crie a sua conta
                                </Typography>
                                <span>
                                    Já tem uma conta?{" "}
                                    <Link to="/signin">Iniciar sessão</Link>
                                </span>
                            </Styled.ContainerFormContent>

                            <Styled.ContainerInputs>
                                <Styled.NameContainer>
                                    <Styled.Input
                                        error={!!errors.firstName}
                                        id="outlined-basic-1"
                                        label="Primeiro nome"
                                        type="text"
                                        {...register("firstName")}
                                        helperText={
                                            errors.firstName
                                                ? errors.firstName.message
                                                : ""
                                        }
                                    />{" "}
                                    <Styled.Input
                                        error={!!errors.lastName}
                                        id="outlined-basic-2"
                                        label="Último nome"
                                        type="text"
                                        {...register("lastName")}
                                        helperText={
                                            errors.lastName
                                                ? errors.lastName.message
                                                : ""
                                        }
                                    />
                                </Styled.NameContainer>

                                <Styled.Input
                                    error={!!errors.email}
                                    id="outlined-basic-3"
                                    label="Endereço de email"
                                    type="email"
                                    {...register("email")}
                                    helperText={
                                        errors.email ? errors.email.message : ""
                                    }
                                />
                                <Styled.FormControlPassword
                                    variant="outlined"
                                    error={!!errors.password}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Palavra passe
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        {...register("password")}
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
                                        label="Palavra passe"
                                    />
                                    {errors.password && (
                                        <FormHelperText error>
                                            {errors.password.message}
                                        </FormHelperText>
                                    )}
                                </Styled.FormControlPassword>
                                <Styled.FormControlPassword
                                    variant="outlined"
                                    error={!!errors.confirmPassword}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password-2">
                                        Confirme a palavra passe
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password-2"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        {...register("confirmPassword")}
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
                                        label="Confirme a palavra passe"
                                    />
                                    {errors.confirmPassword && (
                                        <FormHelperText error>
                                            {errors.confirmPassword.message}
                                        </FormHelperText>
                                    )}
                                </Styled.FormControlPassword>

                                <Button
                                    variant="contained"
                                    text="Criar conta"
                                    type="submit"
                                    loading={loading}
                                />
                                <Styled.TermsService>
                                    <span>
                                        Concordo com os{" "}
                                        <Link>Termos de Serviço</Link> e a{" "}
                                        <Link>Política de Privacidade</Link>.
                                    </span>
                                </Styled.TermsService>
                            </Styled.ContainerInputs>
                        </Styled.ContainerForm>
                    </Styled.GridContent>
                    <Styled.GridImg
                        img={images.characters.character_2}
                        borderRadius=" 1.5rem 0  0 1.5rem"
                    />
                </Styled.Container_Grid>
            </Wrapper>
        </React.Fragment>
    );
}

export { SignUp };
