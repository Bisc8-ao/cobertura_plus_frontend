import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ThemeModeContext } from "./themeModeContext";

function ThemeModeProvider({ children }) {
    const [mode, setMode] = useState(() => {
        const modeActive = localStorage.getItem("theme") || "light";
        return modeActive;
    });
    const [modeLightSelected, setModeLightSelected] = useState(() => {
        const modeLightAactive = mode == "light" ? true : false;
        return modeLightAactive;
    });
    const [modeDarkSelected, setModeDarkSelected] = useState(() => {
        const modeDarkAactive = mode == "dark" ? true : false;
        return modeDarkAactive;
    });

    function handleModeLight(event) {
        if (modeLightSelected === false) {
            setMode("light");
            setModeDarkSelected(false);
            setModeLightSelected(true);
        } else {
            setMode("dark");
            setModeDarkSelected(true);
            setModeLightSelected(event.target.checked);
        }
    }

    function handleModeDark(event) {
        if (modeDarkSelected === false) {
             setMode("dark");

            setModeDarkSelected(true);
            setModeLightSelected(false);
        } else {
            setMode("light");
            setModeLightSelected(true);
            setModeDarkSelected(event.target.checked);
        }
    }

    useEffect(() => {
        localStorage.setItem("theme", mode);
    }, [mode]);
    return (
        <ThemeModeContext.Provider
            value={{
                mode,
                modeLightSelected,
                modeDarkSelected,
                handleModeLight,
                handleModeDark,
            }}
        >
            {children}
        </ThemeModeContext.Provider>
    );
}

ThemeModeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ThemeModeProvider };
