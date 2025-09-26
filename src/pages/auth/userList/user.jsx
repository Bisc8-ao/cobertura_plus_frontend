import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Typography,
    Paper,
    Avatar,
    Chip,
    Box,
    TextField,
    InputAdornment,
    IconButton,
    MenuItem,
    Select,
    FormControl,
} from "@mui/material";
import {
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
} from "@mui/icons-material";
import { Button } from "../../../components";
import styled from "@emotion/styled";

import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";

const Wrapper = styled("section")({
    display: "flex",
    flexDirection: "column",

    color: "#ffffff",
    overflowX: "hidden",
});

const ContainerContent = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    padding: "2rem",
    "@media (min-width:1920px)": {
        padding: "2rem 16rem",
    },
}));

const HeaderContainer = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
});

const FiltersContainer = styled("div")({
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    alignItems: "center",
});

const StatusTabs = styled("div")({
    display: "flex",
    gap: "0",
    marginBottom: "2rem",
});

const StatusTab = styled("div")(({ active, count }) => ({
    padding: "0.8rem 1.6rem",
    backgroundColor: active ? "#2d3748" : "transparent",
    color: active ? "#ffffff" : "#a0aec0",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: active ? "6px 6px 0 0" : "0",
    fontSize: "1.4rem",
    fontWeight: active ? "600" : "400",
    "&:hover": {
        backgroundColor: "#2d3748",
        color: "#ffffff",
    },
    "&::after": count
        ? {
              content: `"${count}"`,
              backgroundColor: active ? "#4299e1" : "#4a5568",
              color: "#ffffff",
              padding: "0.2rem 0.6rem",
              borderRadius: "12px",
              fontSize: "1.2rem",
              fontWeight: "600",
              marginLeft: "0.5rem",
          }
        : {},
}));

const DataGrid = styled(MuiDataGrid)(() => ({
    border: "none",
    width: "100%",
    color: "#ffffff",
    "& .MuiDataGrid-columnHeaders": {
        background: "#28323c",
        "& .MuiDataGrid-columnHeader": {
            fontSize: "1.3rem",
            fontWeight: "600",
            color: "#fefeffff",
            background: "transparent",
            border: "none ",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "600",
        },
    },
    "& .MuiDataGrid-cell": {
        fontSize: "1.4rem",
        borderBottom: "1px dashed #2d3748",

        color: "#ffffff",
        "&:focus": {
            outline: "none", // Remove o outline de foco
        },
        "&:focus-within": {
            outline: "none", // Remove o outline quando elementos filhos estão em foco
        },
    },
    "& .MuiDataGrid-row": {
        "--DataGrid-rowBorderColor": "none",
        minHeight: "6.2rem",
        "&:hover": {
            backgroundColor: "#2d3748",
        },
        "&.Mui-selected": {
            backgroundColor: "#2d3748",
            "&:hover": {
                backgroundColor: "#4a5568",
            },
        },
    },
    "& .MuiCheckbox-root": {
        color: "#4299e1",
    },
    "& .MuiDataGrid-footerContainer": {
        backgroundColor: "#1a1d21",
        borderTop: "1px solid #2d3748",
        color: "#ffffff",
    },
    "& .MuiTablePagination-root": {
        color: "#ffffff",
    },
    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
        color: "#a0aec0",
    },
    "& .MuiSelect-icon": {
        color: "#ffffff",
    },
    "& .MuiDataGrid-columnSeparator": {
        display: "none ",
    },
    "& .MuiDataGrid-virtualScroller": {
        overflowX: "auto ",
    },

    "& .MuiDataGrid-main": {
        overflowX: "auto !important",
    },
}));

const StyledSearchField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#2d3748",
        color: "#ffffff",
        "& fieldset": {
            borderColor: "#4a5568",
        },
        "&:hover fieldset": {
            borderColor: "#4299e1",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#4299e1",
        },
    },
    "& .MuiInputBase-input": {
        color: "#ffffff",
        fontSize: "1.4rem",
    },
    "& .MuiInputLabel-root": {
        color: "#a0aec0",
        fontSize: "1.4rem",
    },
});

const StyledFormControl = styled(FormControl)({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#2d3748",
        color: "#ffffff",
        "& fieldset": {
            borderColor: "#4a5568",
        },
        "&:hover fieldset": {
            borderColor: "#4299e1",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#4299e1",
        },
    },
    "& .MuiSelect-icon": {
        color: "#ffffff",
    },
    "& .MuiInputLabel-root": {
        color: "#a0aec0",
    },
});


const generateAvatarColor = (name) => {
    const colors = [
        "#ff6b6b",
        "#4ecdc4",
        "#45b7d1",
        "#96ceb4",
        "#feca57",
        "#ff9ff3",
        "#54a0ff",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

const columns = [
    {
        field: "name",
        headerName: "Name",
        flex: 2,
        renderCell: (params) => (
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Avatar
                    sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: generateAvatarColor(params.row.name),
                        fontSize: "1.4rem",
                        fontWeight: "bold",
                    }}
                >
                    {params.row.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                    <Typography
                        sx={{
                            fontSize: "1.4rem",
                            fontWeight: "500",
                            color: "#ffffff",
                        }}
                    >
                        {params.row.name}
                    </Typography>
                    <Typography sx={{ fontSize: "1.2rem", color: "#a0aec0" }}>
                        {params.row.email}
                    </Typography>
                </Box>
            </Box>
        ),
    },
    {
        field: "phoneNumber",
        headerName: "Phone number",
        flex: 1,
        renderCell: (params) => (
            <Typography sx={{ fontSize: "1.4rem", color: "#ffffff" }}>
                {params.value}
            </Typography>
        ),
    },
    {
        field: "company",
        headerName: "Company",
        flex: 1,
        renderCell: (params) => (
            <Typography sx={{ fontSize: "1.4rem", color: "#ffffff" }}>
                {params.value}
            </Typography>
        ),
    },
    {
        field: "role",
        headerName: "Role",
        flex: 1,
        renderCell: (params) => (
            <Typography sx={{ fontSize: "1.4rem", color: "#ffffff" }}>
                {params.value}
            </Typography>
        ),
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: (params) => {
            const getStatusColor = (status) => {
                switch (status.toLowerCase()) {
                    case "active":
                        return { bg: "#059669", color: "#ffffff" };
                    case "pending":
                        return { bg: "#d97706", color: "#ffffff" };
                    case "banned":
                        return { bg: "#dc2626", color: "#ffffff" };
                    case "rejected":
                        return { bg: "#6b7280", color: "#ffffff" };
                    default:
                        return { bg: "#6b7280", color: "#ffffff" };
                }
            };

            const statusStyle = getStatusColor(params.value);

            return (
                <Chip
                    label={
                        params.value.charAt(0).toUpperCase() +
                        params.value.slice(1)
                    }
                    sx={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                        fontSize: "1.2rem",
                        fontWeight: "500",
                        height: "2.8rem",
                        borderRadius: "6px",
                        "& .MuiChip-label": {
                            paddingX: "1.2rem",
                        },
                    }}
                />
            );
        },
    },
    {
        field: "actions",
        headerName: "",
        flex: 0.5,
        sortable: false,
        renderCell: (params) => (
            <IconButton
                sx={{ color: "#a0aec0", "&:hover": { color: "#ffffff" } }}
            >
                <EditIcon />
            </IconButton>
        ),
    },
];

const rows = [
    {
        id: 1,
        name: "Angélique Morse",
        email: "benny89@yahoo.com",
        phoneNumber: "+46 8 123 456",
        company: "Wuckert Inc",
        status: "banned",
        role: "Content Creator",
    },
    {
        id: 2,
        name: "Ariana Lang",
        email: "avery43@hotmail.com",
        phoneNumber: "+54 11 1234-5678",
        company: "Feast Group",
        status: "pending",
        role: "IT Administrator",
    },
    {
        id: 3,
        name: "Aspen Schmitt",
        email: "mireya13@hotmail.com",
        phoneNumber: "+34 91 123 4567",
        company: "Kihn, Marquardt and Crist",
        status: "banned",
        role: "Financial Planner",
    },
    {
        id: 4,
        name: "Brycen Jimenez",
        email: "tyrel.greenholt@gmail.com",
        phoneNumber: "+52 55 1234 5678",
        company: "Rempel, Hand and Herzog",
        status: "active",
        role: "HR Recruiter",
    },
    {
        id: 5,
        name: "Chase Day",
        email: "joana.simonis84@gmail.com",
        phoneNumber: "+86 10 1234 5678",
        company: "Mraz, Donnelly and Collins",
        status: "banned",
        role: "Graphic Designer",
    },
];

const paginationModel = { page: 0, pageSize: 5 };

function UserList() {
    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    const statusCounts = {
        all: rows.length,
        active: rows.filter((row) => row.status === "active").length,
        pending: rows.filter((row) => row.status === "pending").length,
        banned: rows.filter((row) => row.status === "banned").length,
        rejected: rows.filter((row) => row.status === "rejected").length,
    };

    const filteredRows = rows.filter((row) => {
        const matchesSearch =
            row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.company.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesTab = activeTab === "all" || row.status === activeTab;
        const matchesRole =
            !roleFilter ||
            row.role.toLowerCase().includes(roleFilter.toLowerCase());

        return matchesSearch && matchesTab && matchesRole;
    });

    return (
        <Wrapper>
            <ContainerContent>
                <HeaderContainer>
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            fontWeight: "600",
                            color: "#ffffff",
                            fontSize: "2.4rem",
                        }}
                    >
                        User Management
                    </Typography>
                    <IconButton
                        sx={{
                            color: "#a0aec0",
                            "&:hover": { color: "#ffffff" },
                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </HeaderContainer>

                <StatusTabs>
                    {Object.entries(statusCounts).map(([status, count]) => (
                        <StatusTab
                            key={status}
                            active={activeTab === status}
                            count={count}
                            onClick={() => setActiveTab(status)}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </StatusTab>
                    ))}
                </StatusTabs>

                <FiltersContainer>
                    <StyledFormControl size="small" sx={{ minWidth: 120 }}>
                        <Select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            displayEmpty
                            sx={{ fontSize: "1.4rem" }}
                        >
                            <MenuItem value="">
                                <em>Role</em>
                            </MenuItem>
                            <MenuItem value="content">Content Creator</MenuItem>
                            <MenuItem value="it">IT Administrator</MenuItem>
                            <MenuItem value="financial">
                                Financial Planner
                            </MenuItem>
                            <MenuItem value="hr">HR Recruiter</MenuItem>
                            <MenuItem value="graphic">
                                Graphic Designer
                            </MenuItem>
                        </Select>
                    </StyledFormControl>

                    <StyledSearchField
                        size="small"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "#a0aec0" }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ minWidth: 300 }}
                    />
                </FiltersContainer>

                <Paper
                    sx={{

                        width: "100%",

                        overflow: "auto",
                    }}
                >
                    <DataGrid
                        rows={filteredRows}
                        columns={columns}

                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10, 25]}
                        checkboxSelection
                        disableColumnMenu
                        disableRowSelectionOnClick
                        sx={{ border: 0 }}
                    />
                </Paper>
            </ContainerContent>
        </Wrapper>
    );
}

export { UserList };
