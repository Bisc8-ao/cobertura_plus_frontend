import { useContext } from "react";
import { ThemeModeContext } from "../context";

function UseThemeMode() {
    return useContext(ThemeModeContext);
}

export { UseThemeMode };
