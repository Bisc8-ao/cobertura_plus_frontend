import React from "react";
import { Container, Typography } from "@mui/material";
import {Link } from "react-router-dom";

function Dashboard() {

    return (
        <React.Fragment>
            <Container sx={{padding:"20rem"}}>
                <Typography variant="h1" component="h1">
                    Dashboard em desenvolvimento
                </Typography>
            <Link to="/signin">Voltar</Link>
            </Container>
        </React.Fragment>
    );
}

export { Dashboard };
