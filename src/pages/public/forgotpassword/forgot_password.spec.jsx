import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { ForgotPassword } from ".";
import { Theme } from "../../../styles";
import { LangContext,UserProvider } from "../../../context";
import { Translations } from "../../../translations";




function renderForgotPassword(lang = "Português") {
    const translations = Translations[lang];

    return render(
        <ThemeProvider theme={Theme}>
            <MemoryRouter>
                <UserProvider>

                <LangContext.Provider
                    value={{
                        langSelected: lang,
                        setLangSelected: () => {},
                        translations,
                    }}
                >
                    <ForgotPassword />
                </LangContext.Provider>
                </UserProvider>
            </MemoryRouter>
        </ThemeProvider>
    );
}

describe("ForgotPassword Page", () => {
    ["Português", "Inglês"].forEach((lang) => {
        describe(`Language: ${lang}`, () => {
            it("should render heading", () => {
                renderForgotPassword(lang);
                const heading = screen.getByRole("heading", {
                    name: Translations[lang].pages.forgotpassword.title,
                });
                expect(heading).toBeInTheDocument();
            });

            it("should render description", () => {
                renderForgotPassword(lang);
               const descriptionText =
                   Translations[lang].pages.forgotpassword.description;
               const description = screen.getByText(
                   new RegExp(descriptionText.trim(), "i")
               );
               expect(description).toBeInTheDocument();
            });

            it("should render email input field", () => {
                renderForgotPassword(lang);
                const emailLabel =
                    Translations[lang].pages.forgotpassword.inputText.email;
                expect(screen.getByLabelText(emailLabel)).toBeInTheDocument();
            });

            it("should render submit button", () => {
                renderForgotPassword(lang);
                const btnText =
                    Translations[lang].pages.forgotpassword.btnText.reset;
                const button = screen.getByRole("button", { name: btnText });
                expect(button).toBeInTheDocument();
            });

            it("should render back link", () => {
                renderForgotPassword(lang);
                const linkText =
                    Translations[lang].pages.forgotpassword.link.back;
                const link = screen.getByText(linkText);
                expect(link).toBeInTheDocument();
            });
        });
    });
});
