import React, { useState } from "react";
import { Typography } from "@mui/material";
import { images } from "../../../assets";
import { styled } from "@mui/material";
import * as Styled from "../../../styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../../../components";
import { Link } from "react-router-dom";
import { vectorImages } from "../../../assets/svgs";
import { useNavigate } from "react-router-dom";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLangContext } from "../../../hooks";

const Wrapper = styled("div")({
    width: "100%",
    height: "100%",
});
const schema = z.object({
    email: z
        .string()
        .nonempty("O email é obrigatório")
        .email("Endereço de email inválido"),
    /*.refine((val) => val.endsWith("@tvcabo.co.ao"), {
            message: "O email deve terminar com @tvcabo.co.ao",
        })*/
});
function ForgotPassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({})
    const API_URL = import.meta.env.VITE_API_URL;
    const url_api = `${API_URL}/api/auth/forgot-password`;
    const { translations } = useLangContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });
    async function onSubmit(value) {
        //navigate("/verifyaccount");
        const payload = {
            userEmail: value.email,
        };
        setLoading(true);
        try {
            const response = await fetch(url_api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const result = response.json();
            setData(result)
            console.log(result);

            if (response.ok) {
                console.log("response sucess:", response);
                setLoading(false);
            } else {
                console.log("response error:", response);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
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
                                <img src={vectorImages.icons.padlock} />
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    sx={{
                                        fontSize: "1.9rem",
                                        fontWeight: "800",
                                        lineHeight: "2.8rem",
                                    }}
                                >
                                    {translations.pages.forgotpassword.title}
                                </Typography>
                                <span>
                                    {
                                        translations.pages.forgotpassword
                                            .description
                                    }
                                </span>
                            </Styled.ContainerFormContent>

                            <Styled.ContainerInputs>
                                {data.messsage && (
                                    <Styled.AdaptiveAlert
                                        severity="info"
                                        icon={<Styled.AdaptiveInfoIcon />}
                                    >
                                        {data.message}
                                    </Styled.AdaptiveAlert>
                                )}
                                <Styled.Input
                                    helperText={
                                        errors.email ? errors.email.message : ""
                                    }
                                    error={!!errors.email}
                                    {...register("email")}
                                    id="outlined-basic"
                                    label={
                                        translations.pages.forgotpassword
                                            .inputText.email
                                    }
                                    type="email"
                                />

                                <Button
                                    variant="contained"
                                    loading={loading}
                                    text={
                                        translations.pages.forgotpassword
                                            .btnText.reset
                                    }
                                    type="submit"
                                />

                                <div data-element="Link_back">
                                    <Link to="/auth/signin">
                                        <span>
                                            <ArrowBackIosIcon />
                                        </span>{" "}
                                        {
                                            translations.pages.forgotpassword
                                                .link.back
                                        }
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

export { ForgotPassword };
