import  {useState, useEffect} from 'react'
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

export {LangProvider}
