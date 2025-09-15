import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Styled from "../../../styles"
import {
    Typography,
    Card as MuiCard,
    CardContent as MuiCardContent,
    Box,
    Button as MuiButton

} from "@mui/material";
import {Button} from "../../../components"
import { UseLangContext } from "../../../hooks";
import styled from "@emotion/styled";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const Wrapper = styled("section")({
    display: "flex",
    flexDirection: "column",
    gap: "4.3rem",
});

const Container = styled("div")({
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "4rem",
    "@media (max-width:768px)": {
        gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width:430px)": {
        gridTemplateColumns: "repeat(1, 1fr)",
    },
});

const Card = styled(MuiCard)(({ gridColumn }) => ({
    gridColumn: gridColumn,
    borderRadius: "1.6rem",
    position: "relative",
    boxShadow:
        "0 0 2px 0 rgba(145 158 171 / 20%),0 12px 24px -4px rgba(145 158 171 / 12%)",
}));
const CardContent = styled(MuiCardContent)(({padding}) => ({
    padding:padding,
}));

const ContainerPhoto = styled("div")(() => ({
    height: "14.4rem",
    width: "14.4rem",
    border: "2px dashed rgba(145, 158, 171, 0.2)",
    borderRadius: "50%",
    cursor: "pointer",
    position: "relative",
    margin:"auto"
}));

const PhotoInput = styled("input")(() => ({
    border: "0",
    clip: " rect(0px,0px,0px)",
    clipPath:"inset(50%)",
    height: "1px",
    margin: "0 -1px -1px 0",
    padding: "0",
    position: "absolute",
    width: "1px",
    whiteSapace: "nowrap",
    overflow:"hidden"

}))

const ContainerSvg = styled("div")(() => (
    {
        width: "100%",
        height: "100%",
        position: "relative",
        borderRadius: "inherit",
        padding:"1rem"
    }
))

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
    zIndex:"9",
    opacity: "1",
    transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        opacity: ".5",
    },
     "& > span": {
         fontSize: "1.2rem",
         fontWeight: "400",
         lineHeight:"1.5"

    },
    "& > svg": {
        width: "2rem",
        height:"2rem"
    }
}));

const Photo = styled("img")(() => ({
    gap: ".8rem",
    position: "absolute",
    top: ".7rem",
    left: ".7rem",
    width: "90%",
    height: "90%",
    objectFit:"cover",
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
        fontWeight:"800"
    },
     "& > span:last-child": {
        fontSize: "1.2rem",
        fontWeight:"500"
    }
}))

const CardInputs = styled("div")(() => ({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap:"4rem",
    width:"100%"
}));

function User() {
    const { translations } = UseLangContext();
    const InputFile = useRef(null)
    const [getImage, setImage] = useState(null);
    const navigate = useNavigate()

    const handleChangeFile = (e) => {
        const image = e.target.files[0]
        if (image) {
            setImage(image)
         }

    }

    function handleUpdate() {
        navigate("/updatePassword");
    }
    return (
        <React.Fragment>
            <Wrapper>
                <Typography variant="h1" component="h1">
                    Profile
                </Typography>

                <form>
                    <Container>
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
                                                    <span>Upload imagem</span>
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
                                    <Styled.Input
                                        label="First name"
                                        type="text"
                                    />
                                    <Styled.Input
                                        label="Last Name"
                                        type="text"
                                    />
                                    <Styled.Input label="Email" type="email" />
                                    <Styled.Input />
                                </CardInputs>
                            </CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "end",
                                    alignItems: "center",
                                    padding: "0 4rem",
                                    gap: "2rem",
                                }}
                            >
                                <Button text="Update" variant="contained" type="submit"/>

                                <MuiButton
                                    variant="outilene"
                                    sx={{
                                        border: ".1rem solid #000",
                                        fontSize: "1.4rem",
                                        padding: "1rem",
                                        textTransform: "none",
                                    }}
                                    onClick={handleUpdate}
                                >
                                    Atualizar senha
                                </MuiButton>
                            </Box>
                        </Card>
                    </Container>
                </form>
            </Wrapper>
        </React.Fragment>
    );
}

export { User };
