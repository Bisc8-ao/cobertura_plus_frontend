import React from "react";
import * as Styled from "../../styles";
function Button({ text, onClick, type, variant, disabled, icon, isPageHome }) {
    return (
        <React.Fragment>
            <Styled.MainButton
                onClick={onClick}
                type={type}
                variant={variant}
                disabled={disabled}
                isPageHome={isPageHome}
            >
                {icon && icon}
                <span>{text}</span>
            </Styled.MainButton>
        </React.Fragment>
    );
}

export { Button };
