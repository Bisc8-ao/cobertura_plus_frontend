import React, { useState } from "react";
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
    IconButton,
    Menu as MuiMenu,
    MenuItem as MuiMenuItem,
    Card as Muicard,
} from "@mui/material";
import { Card } from "../../../components";
import { vectorImages } from "../../../assets";
import { useLangContext } from "../../../hooks";
import MoreVertIcon from "@mui/icons-material/MoreVert";


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
const MuiCard = styled(
    Muicard,
    {}
)(({ theme }) => ({
    borderRadius: "1.6rem",
    position: "relative",
    background: theme.palette.card.background,
    boxShadow: theme.customShadows.card,
    "@media (max-width:820px)": {
        gridColumn: "span 1",
    },
}));

const Menu = styled(MuiMenu)({
    left: "-5rem",

});
const MenuItem = styled(MuiMenuItem)({
    display: "flex",
    gap: "1rem",
    fontSize: "1.2rem",
    fontWeight: "700",
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
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuItemClick = (lang) => {
        setAnchorEl(null);
    };
    const itemCards = [
        {
            title: "Diarios",
            percent: 2.5,
            total: 28,
        },
        {
            title: "Semanal",
            percent: 8.5,
            total: 208,
        },
        {
            title: "Mensal",
            percent: 43.5,
            total: 2008,
        },
        {
            title: "Geral",
            percent: 73.5,
            total: 20008,
        },
    ];
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
                        {itemCards.map((item, index) => (
                            <Card key={index} {...item} />
                        ))}
                    </Box>
                </Container>

                <MuiCard>
                    <TableContainer
                        component={Paper}
                        sx={{ boxShadow: "none" }}
                    >
                        <Table sx={{ width: "100%" }} aria-label="simple table">
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
                                        sx={{
                                            fontSize: "1.4rem",
                                            border: "none",
                                        }}
                                    >
                                        Invoice ID
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{
                                            fontSize: "1.4rem",
                                            border: "none",
                                        }}
                                    >
                                        Category
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{
                                            fontSize: "1.4rem",
                                            border: "none",
                                        }}
                                    >
                                        Status
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{
                                            fontSize: "1.4rem",
                                            border: "none",
                                        }}
                                    >
                                        {""}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            sx={[
                                                (theme) => ({
                                                    fontSize: "1.4rem",
                                                    borderBottom: `1px dashed ${
                                                        theme.palette.mode ===
                                                        "dark"
                                                            ? "#343c46"
                                                            : "#e9e9e9ff"
                                                    }`,
                                                }),
                                            ]}
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={[
                                                (theme) => ({
                                                    fontSize: "1.4rem",
                                                    borderBottom: `1px dashed ${
                                                        theme.palette.mode ===
                                                        "dark"
                                                            ? "#343c46"
                                                            : "#e9e9e9ff"
                                                    }`,
                                                }),
                                            ]}
                                        >
                                            {row.calories}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={[
                                                (theme) => ({
                                                    fontSize: "1.4rem",
                                                    borderBottom: `1px dashed ${
                                                        theme.palette.mode ===
                                                        "dark"
                                                            ? "#343c46"
                                                            : "#e9e9e9ff"
                                                    }`,
                                                }),
                                            ]}
                                        >
                                            {row.fat}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={[
                                                (theme) => ({
                                                    fontSize: "1.4rem",
                                                    borderBottom: `1px dashed ${
                                                        theme.palette.mode ===
                                                        "dark"
                                                            ? "#343c46"
                                                            : "#e9e9e9ff"
                                                    }`,
                                                }),
                                            ]}
                                        >
                                            <IconButton
                                                aria-controls={
                                                    open
                                                        ? "basic-menu"
                                                        : undefined
                                                }
                                                aria-haspopup="true"
                                                aria-expanded={
                                                    open ? "true" : undefined
                                                }
                                                onClick={handleClick}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={open}
                                                slotProps={{
                                                    list: {
                                                        "aria-labelledby":
                                                            "basic-button",
                                                    },
                                                }}
                                                onClose={handleMenuItemClick}
                                            >
                                                <MenuItem>Apagar</MenuItem>
                                                <MenuItem>Resetar</MenuItem>
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MuiCard>
            </Wrapper>
        </React.Fragment>
    );
}

export { Dashboard };
