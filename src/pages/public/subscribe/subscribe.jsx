import React from "react";
import { useLangContext, UseLocation, useSteps } from "../../../hooks";
import { Typography, StepLabel, Step, Box, MenuItem } from "@mui/material";
import { images } from "../../../assets";

import * as Styled from "../../../styles";
import { Button } from "../../../components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Navigate } from "react-router-dom"


function Subscribe() {
    const { location } = UseLocation();
    const { translations } = useLangContext();
    const {
        register,
        handleSubmit,
        errors,
        steps,
        activeStep,
        handleNext,
        handleBack,
        onSubmit,
        loading,
    } = useSteps();

  if (Object.keys(location).length === 0) {
          return <Navigate to="/" replace />;
  }
    const gender = [
        {
            label: translations.pages.subscribe.options.gender.masculine,
            value: "masculine",
        },
        {
            label: translations.pages.subscribe.options.gender.feminine,
            value: "feminine",
        },
    ];

    const itemInputService = [
        {
            label: translations.pages.subscribe.options.service.internet,
            value: "internet",
        },
        {
            label: translations.pages.subscribe.options.service.tv,
            value: "tv",
        },
        {
            label: translations.pages.subscribe.options.service.voz,
            value: "voz",
        },
    ];

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
                            <Styled.ContainerFormContent alignment="center">
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    sx={{
                                        fontSize: "1.9rem",
                                        fontWeight: "800",
                                        lineHeight: "2.8rem",
                                    }}
                                >
                                    {translations.pages.subscribe.title}
                                </Typography>
                                <span>
                                    {translations.pages.subscribe.description}
                                </span>

                                <Styled.Stepper activeStep={activeStep}>
                                    {steps.map((label, index) => {
                                        const stepProps = {};
                                        const labelProps = {};

                                        return (
                                            <Step key={index} {...stepProps}>
                                                <StepLabel {...labelProps}>
                                                    {label}
                                                </StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Styled.Stepper>
                            </Styled.ContainerFormContent>
                            {activeStep !== steps.length && (
                                <React.Fragment>
                                    {activeStep === 0 && (
                                        <Styled.ContainerInputs>
                                            <Styled.Input
                                                error={!!errors.firstName}
                                                id="outlined-basic"
                                                label={
                                                    translations.pages.subscribe
                                                        .inputText.fName
                                                }
                                                type="text"
                                                helperText={
                                                    errors.firstName
                                                        ? errors.firstName
                                                              .message
                                                        : ""
                                                }
                                                {...register("firstName")}
                                            />
                                            <Styled.Input
                                                error={!!errors.lastName}
                                                helperText={
                                                    errors.lastName
                                                        ? errors.lastName
                                                              .message
                                                        : ""
                                                }
                                                id="outlined-basic"
                                                label={
                                                    translations.pages.subscribe
                                                        .inputText.lName
                                                }
                                                type="text"
                                                {...register("lastName")}
                                            />
                                            <Styled.Input
                                                helperText={
                                                    errors.birthDate
                                                        ? errors.birthDate
                                                              .message
                                                        : ""
                                                }
                                                error={!!errors.birthDate}
                                                id="outlined-basic"
                                                label={
                                                    translations.pages.subscribe
                                                        .inputText.dt
                                                }
                                                lang="pt-PT"
                                                type="date"
                                                {...register("birthDate")}
                                            />
                                            <Styled.Input
                                                error={!!errors.gender}
                                                helperText={
                                                    errors.gender
                                                        ? errors.gender.message
                                                        : ""
                                                }
                                                id="outlined-basic"
                                                label={
                                                    translations.pages.subscribe
                                                        .inputText.gender
                                                }
                                                select
                                                {...register("gender")}
                                            >
                                                {gender.map((option, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Styled.Input>
                                        </Styled.ContainerInputs>
                                    )}
                                    {activeStep === 1 && (
                                        <Styled.ContainerInputs>
                                            
                                            <Styled.Input
                                                error={!!errors.bi}
                                                id="outlined-basic"
                                                label={
                                                    translations.pages.subscribe
                                                        .inputText.bi
                                                }
                                                type="text"
                                                {...register("bi")}
                                            />
                                            <Styled.Input
                                                error={!!errors.email}
                                                helperText={
                                                    errors.email
                                                        ? errors.email.message
                                                        : ""
                                                }
                                                id="outlined-basic"
                                                label={
                                                    translations.pages.subscribe
                                                        .inputText.email
                                                }
                                                type="text"
                                                {...register("email")}
                                            />
                                            <Styled.Input
                                                error={!!errors.phone}
                                                helperText={
                                                    errors.phone
                                                        ? errors.phone.message
                                                        : ""
                                                }
                                                id="outlined-basic"
                                                label={
                                                    translations.pages.subscribe
                                                        .inputText.tel
                                                }
                                                type="tel"
                                                {...register("phone")}
                                            />
                                        </Styled.ContainerInputs>
                                    )}
                                    {activeStep === 2 && (
                                        <Styled.ContainerInputs>
                                            <Styled.TextArea
                                                aria-label="minimum height"
                                                minRows={6}
                                                placeholder={
                                                    translations.pages.subscribe
                                                        .inputText.message
                                                }
                                                {...register("message")}
                                            />
                                        </Styled.ContainerInputs>
                                    )}
                                    {activeStep !== steps.length - 1 && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "end",
                                                gap: 2,
                                            }}
                                        >
                                            <Button
                                                color="inherit"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                variant="outlined"
                                                icon={<ArrowBackIosIcon />}
                                            />

                                            <Button
                                                onClick={handleNext}
                                                variant="contained"
                                                icon={<ArrowForwardIosIcon />}
                                            />
                                        </Box>
                                    )}

                                    {activeStep >= steps.length - 1 && (
                                        <Button
                                            variant="contained"
                                            text={
                                                translations.pages.subscribe
                                                    .btnText.end
                                            }
                                            type="submit"
                                            loading={loading}
                                        />
                                    )}
                                </React.Fragment>
                            )}
                        </Styled.ContainerForm>
                    </Styled.GridContent>
                </Styled.Container_Grid>
            </Styled.Pag_Wrapper>
        </React.Fragment>
    );
}

export { Subscribe };
