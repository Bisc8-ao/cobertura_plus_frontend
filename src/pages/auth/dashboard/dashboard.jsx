import React from "react";
import {
    Typography,
    Box,
    styled,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import { Card } from "../../../components";
import { vectorImages } from "../../../assets";
import { useLangContext } from "../../../hooks";

const Wrapper = styled("section")({
    display: "flex",
    flexDirection: "column",
    gap: "4.3rem",
});

const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "2.4rem",
});
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("Invoice ID", 159, 6.0, 24, 4.0),
    createData("Category", 237, 9.0, 37, 4.3),
    createData("Status", 262, 16.0, 24, 6.0),
];

function Dashboard() {
    const { translations } = useLangContext();
    return (
        <React.Fragment>
            <Wrapper>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{ fontSize: "2.4rem" }}
                    >
                        {translations.pages.dashboard.oi}
                    </Typography>
                    <img src={vectorImages.emoji.waving_hand} width={25} />
                </Box>

                <Container>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: 2,
                            "@media (max-width:768px)": {
                                gridTemplateColumns: "repeat(2, 1fr)",
                            },
                            "@media (max-width:430px)": {
                                gridTemplateColumns: "repeat(1, 1fr)",
                            },
                        }}
                    >
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </Box>
                </Container>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead
                            sx={[
                                (theme) => ({
                                    background:
                                        theme.palette.mode === "dark"
                                            ? "#28323c"
                                            : "#f5f6f8",
                                    border: "none",
                                }),
                            ]}
                        >
                            <TableRow>
                                <TableCell
                                    sx={{ fontSize: "1.4rem", border: "none" }}
                                >
                                    Invoice ID
                                </TableCell>

                                <TableCell
                                    align="right"
                                    sx={{ fontSize: "1.4rem", border: "none" }}
                                >
                                    Category
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ fontSize: "1.4rem", border: "none" }}
                                >
                                    Status
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{ fontSize: "1.4rem" }}
                                    >
                                        {row.name}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{ fontSize: "1.4rem" }}
                                    >
                                        {row.calories}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={[
                                            (theme) => ({ fontSize: "1.4rem", borderBottom:"1px dashed" }),
                                        ]}
                                    >
                                        {row.fat}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Wrapper>
        </React.Fragment>
    );
}

export { Dashboard };
