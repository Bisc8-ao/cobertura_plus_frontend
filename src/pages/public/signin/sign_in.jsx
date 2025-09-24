import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from "@mui/material";
import { images } from "../../../assets";

import * as Styled from "../../../styles";
import { Link } from "react-router-dom";
import { Button } from "../../../components";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useLangContext, useSignin, useUserContext} from "../../../hooks";



function SignIn() {
    const {
        register,
        handleSubmit,
        errors,
        onSubmit,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleMouseUpPassword,
        loading,
        errorMessage,
    } = useSignin();

    const { translations } = useLangContext();
    const {state} = useUserContext()

    console.log(state.user_name)

    return (
        <React.Fragment>
            <Styled.Pag_Wrapper>
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
                                    {translations.pages.signin.title}
                                </Typography>
                                <span>
                                    {translations.pages.signin.description}{" "}
                                    <Link to="/auth/signup">
                                        {translations.pages.signin.link.crt}
                                    </Link>
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
                                            {
                                                translations.pages.signin.alert
                                                    .title
                                            }{" "}
                                            <strong>@tvcabo.co.ao</strong>
                                        </>
                                    )}
                                </Styled.AdaptiveAlert>
                                <Styled.Input
                                    error={!!errors.email}
                                    {...register("email")}
                                    id="outlined-basic-1"
                                    label={
                                        translations.pages.signin.inputText
                                            .email
                                    }
                                    type="email"
                                    helperText={
                                        errors.email ? errors.email.message : ""
                                    }
                                />

                                <Styled.ForgotPassword>
                                    <Link to="/auth/forgotpassword">
                                        {translations.pages.signin.link.rpw}
                                    </Link>
                                    <Styled.FormControlPassword
                                        variant="outlined"
                                        error={!!errors.password}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password-1">
                                            {
                                                translations.pages.signin
                                                    .inputText.pass
                                            }
                                        </InputLabel>
                                        <OutlinedInput
                                            {...register("password")}
                                            id="outlined-adornment-password-1"
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
                                        {errors.password && (
                                            <FormHelperText error>
                                                {errors.password.message}
                                            </FormHelperText>
                                        )}
                                    </Styled.FormControlPassword>
                                </Styled.ForgotPassword>
                                <Button
                                    variant="contained"
                                    text={translations.pages.signin.btnText.log}
                                    type="submit"
                                    loading={loading}
                                />
                            </Styled.ContainerInputs>
                        </Styled.ContainerForm>
                    </Styled.GridContent>
                </Styled.Container_Grid>
            </Styled.Pag_Wrapper>
        </React.Fragment>
    );
}

export { SignIn };
