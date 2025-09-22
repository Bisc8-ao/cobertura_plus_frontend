import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UseTimeoutEffect() {
    const [showAvalibe, setShowAvalibe] = useState(false);
    const [showVerific, setShowVerific] = useState(false);
    

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
        if (showVerific) {
            const timeOut = setTimeout(() => {
                setShowVerific(false);

                navigate("/test-coverage");
            }, 2000);
            return () => clearTimeout(timeOut);
        }
    }, [showVerific, navigate]);
    return { showAvalibe, setShowAvalibe, showVerific, setShowVerific };
}

export { UseTimeoutEffect };
