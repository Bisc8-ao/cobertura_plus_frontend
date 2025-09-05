import React from "react";
import * as Styled from "../../styles";
import { CircularProgress as MuiCircularProgress, styled } from "@mui/material";

const CircularProgress = styled(MuiCircularProgress)(({ theme }) => ({
    color: theme.palette.common.white,
}));


function Button({ text, onClick, type, variant, disabled, icon, loading}) {
    return (
        <React.Fragment>
            <Styled.MainButton
                onClick={onClick}
                type={type}
                variant={variant}
                disabled={disabled}
                loading={loading}
            >
                {icon && icon}
                <span>{text}</span>
               { loading && <CircularProgress size={16} />}
            </Styled.MainButton>
        </React.Fragment>
    );
}

export { Button };
