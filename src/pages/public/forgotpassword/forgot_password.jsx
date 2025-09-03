import React from "react";
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
});
function ForgotPassword() {
    const navigate= useNavigate()

      const {
                register,
                handleSubmit,
                formState: { errors },
            } = useForm({
                resolver: zodResolver(schema),
            });
    function onSubmit(data) {
       navigate("/verifyaccount");
        console.log(data);
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
                                    Esqueci a minha senha?
                                </Typography>
                                <span>
                                    Por favor, introduza o endereço de e-mail
                                    associado à sua conta e enviaremos um link
                                    para redefinir a sua palavra-passe.
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

                                <Button
                                    variant="contained"
                                    text="Repor a senha"
                                    type="submit"
                                />

                                <div data-element="Link_back">
                                    <Link to="/signin">
                                        <span>
                                            <ArrowBackIosIcon />
                                        </span>{" "}
                                        Voltar para início de sessão
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
