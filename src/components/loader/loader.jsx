import React from "react";

import Lottie from "lottie-react";
import * as Styled from "../../styles";

function Loader({ Animation }) {
    return (
        <React.Fragment>
            <Styled.ContainerLotties>
                <Lottie
                    animationData={Animation}
                    loop={true}
                    style={{ width: "40%" }}
                />
            </Styled.ContainerLotties>
        </React.Fragment>
    );
}

export { Loader };
