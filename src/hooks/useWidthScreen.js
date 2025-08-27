import  { useState, useEffect } from "react";




function UseWidthScreen() {
    const [widthScreen, setWidthScreen] = useState(
                typeof window !== "undefined" ? window.innerWidth <= 1024 : false
            );

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
  return { widthScreen };
}

export  {UseWidthScreen}
