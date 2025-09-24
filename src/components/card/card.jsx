import React from "react";
import { Typography, Box, styled } from "@mui/material";
import PropTypes from "prop-types";
import { Card as MuiCard, CardContent as MuiCardContent } from "@mui/material";
import { vectorImages } from "../../assets";

const Cards = styled(MuiCard)({
    background:
        "linear-gradient(135deg, rgba(28, 165, 230, 0.08) 0%, rgba(28, 166, 230, 0.65) 100%)",
    height: "18rem",
    width: "100%",
    borderRadius: "1.6rem",
    padding: "0 .5rem",
    boxShadow: "none",

});

const CardContent = styled(MuiCardContent)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
});

const CardHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    "& > span:last-child": {
        color: theme.palette.primary.main,
        fontWeight: "700",
        fontSize: "1.4rem",
    },
}));

const CardFooter = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    "&:last-child": {
        color: theme.palette.primary.main,
        fontWeight: "700",
        fontSize: "1.4rem",
    },
}));

function Card({title, percent,total}) {
    return (
        <React.Fragment>
            <Cards>
                <CardContent>
                    <CardHeader>
                        <span>
                            <img src={vectorImages.icons.icglassusers} alt="" />
                        </span>
                        <span>-{percent}</span>
                    </CardHeader>
                    <CardFooter>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: ".8rem",
                            }}
                        >
                            <Typography
                                variant="h3"
                                component="span"
                                sx={{
                                    fontSize: "1.4rem",
                                    fontWeight: "700",
                                }}
                            >
                                {title}
                            </Typography>
                            <Typography
                                variant="h5"
                                component="span"
                                sx={{
                                    fontSize: "2.4rem",
                                    fontWeight: "800",
                                }}
                            >
                                {total}
                            </Typography>
                        </Box>
                        <span>2</span>
                    </CardFooter>
                </CardContent>
            </Cards>
        </React.Fragment>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    percent: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
}

export { Card };
