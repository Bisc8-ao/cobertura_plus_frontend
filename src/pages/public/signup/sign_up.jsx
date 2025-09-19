import React from "react";

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

import { useLangContext, useSignUp } from "../../../hooks";
const Wrapper = styled("div")({
    width: "100%",
    height: "100%",
});

function SignUp() {
    const {
        onSubmit,
        register,
        handleSubmit,
        errors,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleMouseUpPassword,
        showPassword,
        loading,
    } = useSignUp();

    const { translations } = useLangContext();

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
                                    {translations.pages.signup.title}
                                </Typography>
                                <span>
                                    {translations.pages.signup.description}{" "}
                                    <Link to="/signin">
                                        {translations.pages.signup.link.log}
                                    </Link>
                                </span>
                            </Styled.ContainerFormContent>

                            <Styled.ContainerInputs>
                                <Styled.NameContainer>
                                    <Styled.Input
                                        error={!!errors.firstName}
                                        id="outlined-basic-1"
                                        label={
                                            translations.pages.signup.inputText
                                                .fName
                                        }
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
                                        label={
                                            translations.pages.signup.inputText
                                                .lName
                                        }
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
                                    label={
                                        translations.pages.signup.inputText
                                            .email
                                    }
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
                                        {
                                            translations.pages.signup.inputText
                                                .pass
                                        }
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
                                        label={
                                            translations.pages.signup.inputText
                                                .pass
                                        }
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
                                        {
                                            translations.pages.signup.inputText
                                                .cpass
                                        }
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
                                        label={
                                            translations.pages.signup.inputText
                                                .cpass
                                        }
                                    />
                                    {errors.confirmPassword && (
                                        <FormHelperText error>
                                            {errors.confirmPassword.message}
                                        </FormHelperText>
                                    )}
                                </Styled.FormControlPassword>

                                <Button
                                    variant="contained"
                                    text={translations.pages.signup.btnText.crt}
                                    type="submit"
                                    loading={loading}
                                />
                                <Styled.TermsService>
                                    <span>
                                        {translations.pages.signup.term.title}{" "}
                                        <Link>
                                            {" "}
                                            {
                                                translations.pages.signup.term
                                                    .ters
                                            }
                                        </Link>{" "}
                                        {translations.pages.signup.term.artig}{" "}
                                        <Link>
                                            {
                                                translations.pages.signup.term
                                                    .politic
                                            }
                                        </Link>
                                        .
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
