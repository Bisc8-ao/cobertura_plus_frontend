import React from "react";

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

export { Loader };
