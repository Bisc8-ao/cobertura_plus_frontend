import { Container, Typography } from "@mui/material";
import React from "react";
import { UseLangContext } from "../../../hooks";

function User() {
     const { translations } = UseLangContext();
    return (
        <React.Fragment>
            <Container>
                <Typography variant="h1" component="h1">
                    {translations.navlink.user}
                </Typography>
            </Container>
        </React.Fragment>
    );
}

export { User };
