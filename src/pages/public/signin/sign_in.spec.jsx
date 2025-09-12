import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { SignIn } from ".";
import { Theme } from "../../../styles";
import { LangContext, UserProvider } from "../../../context";
import { Translations } from "../../../translations";

function renderSignIn(lang = "Português") {
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
                    <SignIn />
                </LangContext.Provider>
                </UserProvider>
            </MemoryRouter>
        </ThemeProvider>
    );
}

describe("SignIn Page", () => {
    ["Português", "Inglês"].forEach((lang) => {
        const t = Translations[lang];

        describe(`Language: ${lang}`, () => {
            it("should render heading", () => {
                renderSignIn(lang);
                const heading = screen.getByRole("heading", {
                    name: t.pages.signin.title,
                });
                expect(heading).toBeInTheDocument();
            });

            it("should render create account link", () => {
                renderSignIn(lang);
                const link = screen.getByRole("link", {
                    name: t.pages.signin.link.crt.trim(), // Remove leading space
                });
                expect(link).toBeInTheDocument();
            });

            it("should render email and password input fields", () => {
                renderSignIn(lang);
                expect(
                    screen.getByLabelText(t.pages.signin.inputText.email)
                ).toBeInTheDocument();
                expect(
                    screen.getByLabelText(t.pages.signin.inputText.pass)
                ).toBeInTheDocument();
            });

            it("should render submit button", () => {
                renderSignIn(lang);
                const button = screen.getByRole("button", {
                    name: t.pages.signin.btnText.log, // Fixed: was using wrong key
                });
                expect(button).toBeInTheDocument();
            });

            it("should toggle password visibility", () => {
                renderSignIn(lang);
                const passwordInput = screen.getByLabelText(
                    t.pages.signin.inputText.pass
                );

                // The aria-labels are hardcoded in English in the component
                const toggleButton = screen.getByRole("button", {
                    name: /display the password|hide the password/i,
                });

                expect(passwordInput).toHaveAttribute("type", "password");

                fireEvent.click(toggleButton);
                expect(passwordInput).toHaveAttribute("type", "text");

                fireEvent.click(toggleButton);
                expect(passwordInput).toHaveAttribute("type", "password");
            });
        });
    });
});
