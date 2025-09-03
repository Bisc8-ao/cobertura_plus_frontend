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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, InputOtp } from "../../../components";
import { Link } from "react-router-dom";
import { vectorImages } from "../../../assets/svgs";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
    otp: z.string().length(6, "O código deve ter 6 dígitos"),
    password: z
        .string()
        .nonempty("A senha é obrigatória")
        .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

function UpdatePassword() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });
    function onSubmit(data) {
        navigate("/verifyaccount");
        console.log(data);
    }

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
                        img={images.characters.character_3}
                        borderRadius="0 1.5rem 1.5rem 0"
                    />
                    <Styled.GridContent>
                        <Styled.ContainerForm onSubmit={handleSubmit(onSubmit)}>
                            <Styled.ContainerFormContent alignment="center">
                                <img src={vectorImages.icons.send} />
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    sx={{
                                        fontSize: "1.9rem",
                                        fontWeight: "800",
                                        lineHeight: "2.8rem",
                                    }}
                                >
                                    Pedido enviado com sucesso!
                                </Typography>
                                <span>
                                    Enviámos um e-mail de confirmação com 6
                                    dígitos para o teu endereço de e-mail. Por
                                    favor, introduz o código na caixa abaixo
                                    para verificar o teu e-mail.
                                </span>
                            </Styled.ContainerFormContent>

                            <Styled.ContainerInputs>
                                <Styled.Input
                                    helperText={
                                        errors.email ? errors.email.message : ""
                                    }
                                    error={!!errors.email}
                                    {...register("email")}
                                    id="outlined-basic"
                                    label="Endereço de email"
                                    type="email"
                                />
                                <Controller
                                    name="otp"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <InputOtp
                                            {...field}
                                            error={!!fieldState.error}
                                            gap="2.5rem"
                                        />
                                    )}
                                />

                                <Styled.FormControlPassword
                                    variant="outlined"
                                    error={!!errors.password}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Palavra passe
                                    </InputLabel>
                                    <OutlinedInput
                                        helperText={
                                            errors.password
                                                ? errors.password.message
                                                : ""
                                        }
                                        {...register("password")}
                                        id="outlined-adornment-password"
                                        type={
                                            showPassword ? "text" : "password"
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

                                <Styled.FormControlPassword
                                    variant="outlined"
                                    error={!!errors.password}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                       Confirmar a palavra passe
                                    </InputLabel>
                                    <OutlinedInput
                                        helperText={
                                            errors.password
                                                ? errors.password.message
                                                : ""
                                        }
                                        {...register("password")}
                                        id="outlined-adornment-password"
                                        type={
                                            showPassword ? "text" : "password"
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

                                <Button
                                    variant="contained"
                                    text="Alterar a senha"
                                    type="submit"
                                />
                                <Styled.ContainerFormContent alignment="center">
                                    <span>
                                        Não recebeu o código?{" "}
                                        <Link>Reenviar</Link>
                                    </span>
                                </Styled.ContainerFormContent>

                                <div data-element="Link_back">
                                    <Link to="/signin">
                                        <span>
                                            <ArrowBackIosIcon />
                                        </span>{" "}
                                        Voltar
                                    </Link>
                                </div>
                            </Styled.ContainerInputs>
                        </Styled.ContainerForm>
                    </Styled.GridContent>
                </Styled.Container_Grid>
            </Wrapper>
        </React.Fragment>
    );
}

export { UpdatePassword };
