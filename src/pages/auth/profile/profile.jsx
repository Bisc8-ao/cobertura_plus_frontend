import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
    Typography,
    Card as MuiCard,
    CardContent as MuiCardContent,
    Box,
    TextField,
    Button as MuiButton,
} from "@mui/material";
import { Button } from "../../../components";
import { useLangContext } from "../../../hooks";
import styled from "@emotion/styled";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const Wrapper = styled("section")({
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
});
const ContainerContent = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "4.3rem",
    "@media (min-width:1920px)": {
        padding: "0 16rem",
    },
}));

const ContainerForm = styled("div")({
    display: "grid",
    alignItems: "start",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "4rem",
    "@media (max-width:820px)": {
        gridTemplateColumns: "repeat(1, 1fr)",
    },

});

const Card = styled(MuiCard)(({ gridColumn }) => ({
    gridColumn: gridColumn,
    borderRadius: "1.6rem",
    position: "relative",
    boxShadow:
        "0 0 2px 0 rgba(145 158 171 / 20%),0 12px 24px -4px rgba(145 158 171 / 12%)",
    "@media (max-width:820px)": {
        gridColumn: "span 1",
    },

}));
const CardContent = styled(MuiCardContent)(({ padding }) => ({
    padding: padding,
    "@media (max-width:430px)": {
        padding: padding === "4rem" && "2rem 1.5rem"
    }
}));

const ContainerPhoto = styled("div")(() => ({
    height: "14.4rem",
    width: "14.4rem",
    border: "2px dashed rgba(145, 158, 171, 0.2)",
    borderRadius: "50%",
    cursor: "pointer",
    position: "relative",
    margin: "auto",
}));

const PhotoInput = styled("input")(() => ({
    border: "0",
    clip: " rect(0px,0px,0px)",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "0 -1px -1px 0",
    padding: "0",
    position: "absolute",
    width: "1px",
    whiteSapace: "nowrap",
    overflow: "hidden",
}));

const ContainerSvg = styled("div")(() => ({
    width: "100%",
    height: "100%",
    position: "relative",
    borderRadius: "inherit",
    padding: "1rem",
}));

const ContainerSContentvg = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: ".8rem",
    position: "absolute",
    top: ".7rem",
    left: ".7rem",
    width: "90%",
    height: "90%",
    color: "#919EAB",
    background: "rgba(145, 158, 171, 0.08)",
    borderRadius: "inherit",
    zIndex: "9",
    opacity: "1",
    transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        opacity: ".5",
    },
    "& > span": {
        fontSize: "1.2rem",
        fontWeight: "400",
        lineHeight: "1.5",
    },
    "& > svg": {
        width: "2rem",
        height: "2rem",
    },
}));

const Photo = styled("img")(() => ({
    gap: ".8rem",
    position: "absolute",
    top: ".7rem",
    left: ".7rem",
    width: "90%",
    height: "90%",
    objectFit: "cover",
    borderRadius: "inherit",
    zIndex: "9",
    opacity: "1",
    transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        opacity: ".5",
    },
}));

const BoxInfo = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: ".5rem",
    "& > span:first-child": {
        fontSize: "1.4rem",
        fontWeight: "800",
    },
    "& > span:last-child": {
        fontSize: "1.2rem",
        fontWeight: "500",
    },
}));

const CardInputs = styled("div")(() => ({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    columnGap: "1.6rem",
    rowGap: "2.4rem",
    width: "100%",
    "@media (max-width:430px)": {
        gridTemplateColumns: "repeat(1, 1fr)",
    },
}));

const Input = styled(TextField)(({ theme }) => ({
    "& label": {
        fontSize: theme.typography.sizes.base,
        background: theme.palette.common.white,
        color: theme.palette.gray[900],
        lineHeight: "2.4rem",
        top: "-.2rem",
        paddingRight: ".5rem",
    },

    "& label.Mui-focused": {
        color: "#1d1b20",
        top: "-.2rem",
        fontWeight: "600",
    },
    "& label.MuiInputLabel-shrink": {
        top: "-.1rem",
        color: theme.palette.gray[900],
    },
    "& label.MuiFormLabel-root:not(.Mui-error).Mui-focused": {
        top: "-.1rem",
    },
    "& label.Mui-error": {
        color: theme.palette.red[700],
        fontWeight: "500",
    },

    "& .MuiInputBase-input": {
        fontSize: theme.typography.sizes.base,
        padding: "1.4rem",
        color: theme.palette.gray[900],
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderRadius: ".8rem",
            border: `.1rem solid ${theme.palette.gray["900_25"]}`,
            borderWidth: ".1rem",
            padding: "2.4rem 1.4rem",
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.gray["900_25"],
            borderWidth: ".1rem",
        },
        "&.Mui-error fieldset": {
            borderColor: theme.palette.red[500],
        },
        "&.Mui-error.Mui-focused fieldset": {
            borderColor: theme.palette.red[500],
        },
    },
    "& .MuiFormHelperText-root": {
        fontSize: theme.typography.sizes.xs,
        marginLeft: "0",
    },
}));

function Profile() {
    const { translations } = useLangContext();
    const InputFile = useRef(null);
    const [getImage, setImage] = useState(null);
    const navigate = useNavigate();

    const handleChangeFile = (e) => {
        const image = e.target.files[0];
        if (image) {
            setImage(image);
        }
    };

    function handleUpdate() {
        navigate("/updatePassword");
    }
    return (
        <React.Fragment>
            <Wrapper>
                <ContainerContent>
                    <Typography
                        variant="h3"
                        component="h6"
                        sx={{ fontWeight: "600" }}
                    >
                        {translations.pages.profile.title}
                    </Typography>
                    <form>
                        <ContainerForm>
                            <Card gridColumn="span 2">
                                <CardContent padding="8rem 2rem">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                            gap: "2rem",
                                        }}
                                    >
                                        <ContainerPhoto
                                            onClick={() =>
                                                InputFile.current.click()
                                            }
                                        >
                                            <PhotoInput
                                                type="file"
                                                accept="image/*"
                                                ref={InputFile}
                                                onChange={(e) =>
                                                    handleChangeFile(e)
                                                }
                                            />
                                            <ContainerSvg>
                                                {getImage ? (
                                                    <Photo
                                                        src={URL.createObjectURL(
                                                            getImage
                                                        )}
                                                    />
                                                ) : (
                                                    <ContainerSContentvg>
                                                        <AddAPhotoIcon />
                                                        <span>
                                                            {
                                                                translations
                                                                    .pages
                                                                    .profile
                                                                    .uploadText
                                                            }
                                                        </span>
                                                    </ContainerSContentvg>
                                                )}
                                            </ContainerSvg>
                                        </ContainerPhoto>
                                        <BoxInfo>
                                            <span>Yuran Simão</span>
                                            <span>yuran@bisc8.co</span>
                                        </BoxInfo>
                                    </Box>
                                </CardContent>
                            </Card>
                            <Card gridColumn="span 4">
                                <CardContent padding="4rem">
                                    <CardInputs>
                                        <Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.firstName
                                            }
                                            type="text"
                                        />
                                        <Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.lastName
                                            }
                                            type="text"
                                        />
                                        <Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.email
                                            }
                                            type="email"
                                        />
                                        <Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.phone
                                            }
                                            type="tel"
                                        />
                                        <Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.country
                                            }
                                            type="text"
                                        />
                                        <Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.city
                                            }
                                            type="text"
                                        />
                                        <Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.address
                                            }
                                            type="text"
                                        />
                                        <Input
                                            label={
                                                translations.pages.profile
                                                    .inputs.role
                                            }
                                            type="text"
                                        />
                                    </CardInputs>
                                </CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "end",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: "0 4rem 3rem 4em",
                                        gap: "2rem",
                                        "@media (max-width:430px)": {
                                            flexDirection: "column",
                                            justifyContent: "start",
                                            alignItems: "start",
                                            width:"100%",
                                            padding: "0 1rem 3rem 1rem",
                                        },
                                    }}
                                >
                                    <Button
                                        text={
                                            translations.pages.profile.buttons
                                                .updateData
                                        }
                                        variant="contained"
                                        type="submit"
                                    />
                                    <MuiButton
                                        variant="outilene"
                                        sx={{
                                            border: ".1rem solid #000",
                                            fontSize: "1.4rem",
                                            padding: "1rem",
                                            textTransform: "none",
                                            "@media (max-width:430px)": {
                                                width:"100%"
                                            },
                                        }}
                                        onClick={handleUpdate}
                                    >
                                        {
                                            translations.pages.profile.buttons
                                                .updatePassword
                                        }
                                    </MuiButton>
                                </Box>
                            </Card>
                        </ContainerForm>
                    </form>
                </ContainerContent>
            </Wrapper>
        </React.Fragment>
    );
}

export { Profile };
