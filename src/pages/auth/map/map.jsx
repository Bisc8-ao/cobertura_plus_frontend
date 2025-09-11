import { Container, Typography } from "@mui/material";
import React from "react";
import { UseLangContext } from "../../../hooks";

function Map() {
     const {translations}= UseLangContext()
    return (
        <React.Fragment>
            <Container>
                <Typography variant="h1" component="h1">
                    {translations.navlink.map}
                </Typography>
            </Container>
        </React.Fragment>
    );
}

export { Map };
