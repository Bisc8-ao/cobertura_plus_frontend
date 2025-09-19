import React from "react";
import PropTypes from "prop-types";

import Lottie from "lottie-react";
import * as Styled from "../../styles";

function Loader({ Animation,  width="40%", bg }) {
    return (
        <React.Fragment>
            <Styled.ContainerLotties bg={bg}>
                <Lottie
                    animationData={Animation}
                    loop={true}
                    style={{ width: width,  }}
                />
            </Styled.ContainerLotties>
        </React.Fragment>
    );
}

Loader.propTypes = {
    Animation: PropTypes.object.isRequired,
    width: PropTypes.string,
    bg: PropTypes.bool,
};

export { Loader };
