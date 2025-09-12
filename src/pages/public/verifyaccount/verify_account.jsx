import React from "react";
import { images } from "../../../assets";
import { styled, Typography } from "@mui/material";
import * as Styled from "../../../styles";
import { Button, InputOtp } from "../../../components";
import { Link,useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { vectorImages } from "../../../assets/svgs";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseLangContext } from "../../../hooks";

const Wrapper = styled("div")({
    width: "100%",
    height: "100%",
    backgroundImage: `url(${images.backgrounds.background_1})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const schema = z.object({
    email: z
        .string()
        .email("E-mail inválido")
        .refine((val) => val.endsWith("@tvcabo.co.ao"), {
            message: "O email deve terminar com @tvcabo.co.ao",
        }),
    otp: z.string().length(6, "O código deve ter 6 dígitos"),
});

function VerifyAccount() {
    const navigate = useNavigate()
   const { translations } = UseLangContext();
    const {
        register,
        control,
        handleSubmit,

        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    function onSubmit(data) {
        alert("Dados atualizados, inicia sessão")
        navigate("/signin");
        console.log(data);
    }
    return (
        <React.Fragment>
            <Wrapper>
                <Styled.ContainerForm
                    borderRadius="1.5rem"
                    padding="4rem"
                    width="30%"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Styled.ContainerFormContent alignment="center">
                        <img src={vectorImages.icons.email} />
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                fontSize: "1.9rem",
                                fontWeight: "800",
                                lineHeight: "2.8rem",
                            }}
                        >
                            {translations.pages.verifyaccount.title}
                        </Typography>
                        <span>
                            {translations.pages.verifyaccount.description}
                        </span>
                    </Styled.ContainerFormContent>

                    <Styled.ContainerInputs>
                        <Styled.Input
                            error={!!errors.email}
                            id="outlined-basic"
                            label={
                                translations.pages.verifyaccount.inputText.email
                            }
                            type="email"
                            {...register("email")}
                        />

                        <Controller
                            name="otp"
                            control={control}
                            render={({ field, fieldState }) => (
                                <InputOtp
                                    {...field}
                                    error={!!fieldState.error}
                                    gap="1.2rem"
                                    aria-label={
                                        translations.pages.verifyaccount
                                            .inputText.otp
                                    }
                                />
                            )}
                        />
                        <Button
                            variant="contained"
                            text={
                                translations.pages.verifyaccount.btnText
                                    .validate
                            }
                            type="submit"
                        />
                        <Styled.ContainerFormContent alignment="center">
                            <span>
                                {translations.pages.verifyaccount.notReceived}{" "}
                                <Link>
                                    {
                                        translations.pages.verifyaccount.link
                                            .resend
                                    }
                                </Link>
                            </span>
                        </Styled.ContainerFormContent>
                        <div data-element="Link_back">
                            <Link to="/forgotpassword">
                                <ArrowBackIosIcon />{" "}
                                {translations.pages.verifyaccount.link.back}
                            </Link>
                        </div>
                    </Styled.ContainerInputs>
                </Styled.ContainerForm>
            </Wrapper>
        </React.Fragment>
    );
}

export { VerifyAccount };
