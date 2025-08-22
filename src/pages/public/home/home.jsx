import React from "react";
import { Typography, Container } from "@mui/material";

function Home() {
  return (
    <React.Fragment>
      <Container>
        <Typography variant="h1" component="h2">
          Home Page
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export { Home };
