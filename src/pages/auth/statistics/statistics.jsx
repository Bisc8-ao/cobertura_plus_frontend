import React from 'react'
import { Container, Typography } from "@mui/material";
import { UseLangContext } from '../../../hooks';

function Statistics() {
     const { translations } = UseLangContext();
  return (
      <React.Fragment>
          <Container>
              <Typography variant="h1" component="h1">
                  {translations.navlink.statistics}
              </Typography>
          </Container>
      </React.Fragment>
  );
}

export {Statistics}
