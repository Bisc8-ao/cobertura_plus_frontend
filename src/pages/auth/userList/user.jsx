import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
    Typography,

    Paper,
} from "@mui/material";
import { Button } from "../../../components";
import styled from "@emotion/styled";

import { DataGrid as MuiDataGrid} from "@mui/x-data-grid";

const Wrapper = styled("section")({
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
});
const ContainerContent = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "4.3rem",
    "@media (min-width:1920px)": {
        padding: "0 16rem",
    },
}));

const DataGrid = styled(MuiDataGrid)(() => ({
    border: "none",
    "& .MuiDataGrid-columnHeader": {
        backgroundColor: "#1976d2",

        width: "100%",
        fontSize: "1rem",
        fontWeight: "bold",
    },
    "& .MuiDataGrid-cell": {
        //borderBottom: "1px solid #e0e0e0",
        fontSize: "1rem",
        border:"none"
    },
    "& .MuiDataGrid-row:hover": {
        backgroundColor: "#f5f5f5",
    },
    "& .MuiCheckbox-root": {
        color: "#1976d2 !important",
    },
    "& .MuiDataGrid-footerContainer": {
        backgroundColor: "#fafafa",
        borderTop: "1px solid #e0e0e0",
    },
}));
const columns = [
    { field: "name", headerName: "Name",  },
    { field: "phoneNumber", headerName: "Phone number", },
    {
        field: "role",
        headerName: "Role",
        type: "number",

    },
    {
        field: "status",
        headerName: "Staus",


    },
];

const rows = [
    {
        id: 1,
        name: "Yuran",
        phoneNumber: "924622482",
        status: "pedding",
        role: "dev",
    },
    {
        id: 2,
        name: "Yuran",
        phoneNumber: "924622482",
        status: "pedding",
        role: "dev",
    },
    {
        id: 3,
        name: "Yuran",
        phoneNumber: "924622482",
        status: "pedding",
        role: "dev",
    },
    {
        id: 4,
        name: "Yuran",
        phoneNumber: "924622482",
        status: "pedding",
        role: "dev",
    },
    {
        id: 5,
        name: "Yuran",
        phoneNumber: "924622482",
        status: "pedding",
        role: "dev",
    },
];

const paginationModel = { page: 0, pageSize: 4 };
function UserList() {
    return (
        <React.Fragment>
            <Wrapper>
                <ContainerContent>
                    <Typography
                        variant="h3"
                        component="h6"
                        sx={{ fontWeight: "600" }}
                    >
                        User List
                    </Typography>
                </ContainerContent>
                <Paper sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        sx={{ border: 0 }}
                    />
                </Paper>
            </Wrapper>
        </React.Fragment>
    );
}

export { UserList };
