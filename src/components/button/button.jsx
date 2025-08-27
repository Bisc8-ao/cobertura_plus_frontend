import React from "react";
import * as Styled from "../../styles";
function Button({ text, onClick, type, variant }) {
    return (
        <React.Fragment>
            <Styled.MainButton onClick={onClick} type={type} variant={variant}>
                {text}
            </Styled.MainButton>
        </React.Fragment>
    );
}

export { Button };
