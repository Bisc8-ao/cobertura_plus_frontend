import  {useState, useEffect} from 'react'
import PropTypes from "prop-types";
import { LangContext } from './langContext'
import { Translations } from '../../translations';

function LangProvider({ children }) {
    const [langSelected, setLangSelected] = useState(() => {
        const lang = localStorage.getItem("lang") || "Português";

        return lang;
    });

    useEffect(() => {
        localStorage.setItem("lang", langSelected);
    }, [langSelected]);

   const translations = Translations[langSelected];
    return (
        <LangContext.Provider
            value={{ langSelected, setLangSelected, translations }}
        >
            {children}
        </LangContext.Provider>
    );
}

LangProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export {LangProvider}
