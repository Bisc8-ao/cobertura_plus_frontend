import React from "react";
import PropTypes from "prop-types";
import * as Styled from "../../styles";



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
                {icon}
                {text && <span className="btn-text">{text}</span>}
            </Styled.MainButton>
        </React.Fragment>
    );
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
    variant: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.node,
    loading: PropTypes.bool,
};

export { Button };
