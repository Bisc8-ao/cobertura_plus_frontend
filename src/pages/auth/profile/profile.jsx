import React, { useState, useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Button } from "../../../components";
import { useLangContext, useUserContext } from "../../../hooks";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Styled from "../../../styles";

const schema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: z.string().optional(),
    address: z.string().optional(),
    role: z.string().optional(),
});

function Profile() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState();
    const { translations } = useLangContext();
    const InputFile = useRef(null);
    const [getImage, setImage] = useState(null);
    const navigate = useNavigate();
    const { state, dispatch } = useUserContext();
    const userToken = localStorage.getItem("auth_token");

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: state.user_name?.split(" ")[0] || "",
            lastName: state.user_name?.split(" ")[1] || "",
            email: state.user_email,
            role: state.user_role,
            phone: state.user_photo,
            dateOfBirth: state.user_dateOfBirth,
        },
    });

    const handleChangeFile = (e) => {
        const image = e.target.files?.[0];
        if (image) {
            setImage(image);
        }
    };

    function handleUpdate() {
        navigate("/dashboard/auth/updatePassword");
    }

    async function handleDeleAccount() {
        try {
            const response = await fetch(`${API_URL}/api/users/me`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });
            if (!response.ok) throw new Error("Erro ao atualizar perfil");
            const result = await response.json();

            console.log(result);
            navigate("/auth/signin", { replace: true });
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (data) => {
        try {
            /*const formData = new FormData();
            setLoading(true)

             //formData.append("userId", state.user_id);
            if (getImage) {
                formData.append("photo", getImage);
            }


            Object.entries(data).forEach(([key, value]) => {
                if (value) {
                    formData.append(key, value);
                }
            });*/

            const payload = {
                userFirstName: data.firstName,
                userLastName: data.lastName,
                userPhone: data.phone,
                userDateOfBirth: data.dateOfBirth,
            };

            const response = await fetch(`${API_URL}/api/users/me`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Erro ao atualizar perfil");
            setLoading(false);

            const result = await response.json();
            const user = result?.user || {};
            const fullName = `${user.firstName ?? ""} ${
                user.lastName ?? ""
            }`.trim();
            dispatch({
                type: "user_active",
                payload: {
                    email: user.email,
                    name: fullName,
                    photo: user.photo || null,
                    id: user.id,
                    role: user.role,
                    phone: user.user_phone || null,
                },
            });

            console.log("Perfil atualizado:", result);
        } catch (error) {
            console.error(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            <Styled.Prof_Wrapper>
                <Styled.Prof_ContainerContent>
                    <Typography
                        variant="h3"
                        component="h6"
                        sx={{ fontWeight: "600" }}
                    >
                        {translations.pages.profile.title}
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Styled.Prof_ContainerForm>
                            {/* FOTO */}
                            <Styled.Prof_Card gridColumn="span 2">
                                <Styled.Prof_DeleteAccount
                                    type="button"
                                    onClick={handleDeleAccount}
                                >
                                    <DeleteIcon />
                                </Styled.Prof_DeleteAccount>
                                <Styled.Prof_CardContent padding="8rem 2rem">
                                    <Styled.Prof_BoxContainer>
                                        <Styled.Prof_ContainerPhoto
                                            onClick={() =>
                                                InputFile.current?.click()
                                            }
                                        >
                                            <Styled.Prof_PhotoInput
                                                type="file"
                                                accept="image/*"
                                                ref={InputFile}
                                                onChange={handleChangeFile}
                                            />
                                            <Styled.Prof_ContainerSvg>
                                                {getImage ? (
                                                    <Styled.Prof_Photo
                                                        src={URL.createObjectURL(
                                                            getImage
                                                        )}
                                                    />
                                                ) : (
                                                    <Styled.Prof_ContainerSvgContent>
                                                        <AddAPhotoIcon />
                                                        <span>
                                                            {
                                                                translations
                                                                    .pages
                                                                    .profile
                                                                    .uploadText
                                                            }
                                                        </span>
                                                    </Styled.Prof_ContainerSvgContent>
                                                )}
                                            </Styled.Prof_ContainerSvg>
                                        </Styled.Prof_ContainerPhoto>
                                        <Styled.Prof_BoxInfo>
                                            {/* <span>{state.user_name}</span>
                                            <span>{state.user_email}</span>*/}
                                        </Styled.Prof_BoxInfo>
                                    </Styled.Prof_BoxContainer>
                                </Styled.Prof_CardContent>
                            </Styled.Prof_Card>
                            {/* CAMPOS */}
                            <Styled.Prof_Card gridColumn="span 4">
                                <Styled.Prof_CardContent padding="4rem">
                                    <Styled.Prof_CardInputs>
                                        <Styled.Prof_Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.firstName
                                            }
                                            type="text"
                                            {...register("firstName")}
                                        />
                                        <Styled.Prof_Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.lastName
                                            }
                                            type="text"
                                            {...register("lastName")}
                                        />
                                        <Styled.Prof_Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.email
                                            }
                                            type="email"
                                            disabled
                                            {...register("email")}
                                        />
                                        <Styled.Prof_Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.phone
                                            }
                                            type="tel"
                                            {...register("phone")}
                                        />
                                        <Styled.Prof_Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.country
                                            }
                                            type="text"
                                            {...register("country")}
                                        />
                                        <Styled.Prof_Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.dateOfBirth
                                            }
                                            type="date"
                                            {...register("dateOfBirth")}
                                        />
                                        <Styled.Prof_Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.address
                                            }
                                            type="text"
                                            {...register("address")}
                                        />
                                        <Styled.Prof_Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.role
                                            }
                                            type="text"
                                            disabled
                                            {...register("role")}
                                        />
                                    </Styled.Prof_CardInputs>
                                </Styled.Prof_CardContent>
                                <Styled.Prof_BoxBtn>
                                    <Button
                                        text={
                                            translations.pages.profile.buttons
                                                .updateData
                                        }
                                        variant="contained"
                                        type="submit"
                                        loading={loading}
                                        disabled={isSubmitting}
                                    />
                                    <Styled.Prof_ButtonResetPass
                                        variant="outilene"
                                        onClick={handleUpdate}
                                    >
                                        {
                                            translations.pages.profile.buttons
                                                .updatePassword
                                        }
                                    </Styled.Prof_ButtonResetPass>
                                </Styled.Prof_BoxBtn>
                            </Styled.Prof_Card>
                        </Styled.Prof_ContainerForm>
                    </form>
                </Styled.Prof_ContainerContent>
            </Styled.Prof_Wrapper>
        </React.Fragment>
    );
}

export { Profile };
