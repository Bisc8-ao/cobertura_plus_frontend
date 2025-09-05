import React from "react";
import * as Styled from "../../styles";



function Button({ text, onClick, type, variant, disabled, icon, loading}) {
    return (
        <React.Fragment>
            <Styled.MainButton
                onClick={onClick}
                type={type}
                variant={variant}
                disabled={disabled}
                
            >
                {icon && icon}
                <span>{text}</span>

            </Styled.MainButton>
        </React.Fragment>
    );
}

export { Button };
