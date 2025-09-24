import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";
import { Button } from "../../../components";
import { useLangContext, useUserContext } from "../../../hooks";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import * as Styled from "../../../styles";

function Profile() {
    const { translations } = useLangContext();
    const InputFile = useRef(null);
    const [getImage, setImage] = useState(null);
    const navigate = useNavigate();
    const{state} = useUserContext()

    const handleChangeFile = (e) => {
        const image = e.target.files[0];
        if (image) {
            setImage(image);
        }
    };

    function handleUpdate() {
        navigate("/updatePassword");
    }
    const firstName = state.user_name.split(" ")[0];
    const lastName = state.user_name.split(" ")[1]

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
                    <form>
                        <Styled.Prof_ContainerForm>
                            <Styled.Prof_Card gridColumn="span 2">
                                <Styled.Prof_CardContent padding="8rem 2rem">
                                    <Styled.Prof_BoxContainer>
                                        <Styled.Prof_ContainerPhoto
                                            onClick={() =>
                                                InputFile.current.click()
                                            }
                                        >
                                            <Styled.Prof_PhotoInput
                                                type="file"
                                                accept="image/*"
                                                ref={InputFile}
                                                onChange={(e) =>
                                                    handleChangeFile(e)
                                                }
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
                                            <span>{state.user_name}</span>
                                            <span>{state.user_email}</span>
                                        </Styled.Prof_BoxInfo>
                                    </Styled.Prof_BoxContainer>
                                </Styled.Prof_CardContent>
                            </Styled.Prof_Card>
                            <Styled.Prof_Card gridColumn="span 4">
                                <Styled.Prof_CardContent padding="4rem">
                                    <Styled.Prof_CardInputs>
                                        <Styled.Prof_Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.firstName
                                            }
                                            type="text"
                                            defaultValue={firstName}
                                        />
                                        <Styled.Prof_Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.lastName
                                            }
                                            type="text"
                                            defaultValue={lastName}
                                        />
                                        <Styled.Prof_Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.email
                                            }
                                            type="email"
                                            defaultValue={state.user_email}
                                        />
                                        <Styled.Prof_Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.phone
                                            }
                                            type="tel"
                                        />
                                        <Styled.Prof_Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.country
                                            }
                                            type="text"
                                        />
                                        <Styled.Prof_Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.city
                                            }
                                            type="text"
                                        />
                                        <Styled.Prof_Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.address
                                            }
                                            type="text"
                                        />
                                        <Styled.Prof_Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.role
                                            }
                                            type="text"
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
