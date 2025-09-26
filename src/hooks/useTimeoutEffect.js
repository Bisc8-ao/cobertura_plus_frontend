import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function UseTimeoutEffect() {
    const [showAvalibe, setShowAvalibe] = useState(false);
    const [showVerific, setShowVerific] = useState(false);
    const [showNvigate, setShowNavigate] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {

        if (showAvalibe) {
            const timeOut = setTimeout(() => {
                setShowAvalibe(false);
                setShowVerific(true);
            }, 3000);
            return () => clearTimeout(timeOut);
        }
    }, [showAvalibe]);

    useEffect(() => {
        if (showVerific ) {
            console.log("entrou....")
            const timeOut = setTimeout(() => {
                setShowVerific(false);

                showNvigate && navigate("/coverage/tested-coverage");
            }, 2000);
            return () => clearTimeout(timeOut);
        }
    }, [showVerific, navigate, showNvigate]);
    return {
        showAvalibe,
        setShowAvalibe,
        showVerific,
        setShowVerific,
        setShowNavigate,
    };
}

export { UseTimeoutEffect };
