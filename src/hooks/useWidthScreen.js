import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function UseWidthScreen() {
    const location = useLocation();

    const [widthScreen, setWidthScreen] = useState(
        typeof window !== "undefined" ? window.innerWidth <= 1024 : false
    );


    const showHeader2 = location.pathname === "/signup" && !widthScreen;
    
    const isPageHome= location.pathname === "/"
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 1024) {
                setWidthScreen(true);
            } else {
                setWidthScreen(false);
            }
        }

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return { widthScreen, showHeader2, isPageHome };
}

export { UseWidthScreen };
