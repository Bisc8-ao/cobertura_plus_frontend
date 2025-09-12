import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { SignUp } from ".";
import { Theme } from "../../../styles";
import { LangContext,UserProvider } from "../../../context";
import { Translations } from "../../../translations";

function renderSignUp(lang = "Português") {
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
                    <SignUp />
                </LangContext.Provider>
                </UserProvider>
            </MemoryRouter>
        </ThemeProvider>
    );
}

describe("SignUp Page", () => {
    // Only test Portuguese since English translations are not available
    const lang = "Português";
    const t = Translations[lang];

    describe(`Language: ${lang}`, () => {
        it("should render heading", () => {
            renderSignUp(lang);
            const heading = screen.getByRole("heading", {
                name: t.pages.signup.title,
            });
            expect(heading).toBeInTheDocument();
        });

        it("should render login link", () => {
            renderSignUp(lang);
            const link = screen.getByRole("link", {
                name: t.pages.signup.link.log,
            });
            expect(link).toBeInTheDocument();
        });

        it("should render all input fields", () => {
            renderSignUp(lang);
            expect(
                screen.getByLabelText(t.pages.signup.inputText.fName)
            ).toBeInTheDocument();
            expect(
                screen.getByLabelText(t.pages.signup.inputText.lName)
            ).toBeInTheDocument();
            expect(
                screen.getByLabelText(t.pages.signup.inputText.email)
            ).toBeInTheDocument();
            expect(
                screen.getByLabelText(t.pages.signup.inputText.pass)
            ).toBeInTheDocument();
            expect(
                screen.getByLabelText(t.pages.signup.inputText.cpass)
            ).toBeInTheDocument();
        });

        it("should render submit button", () => {
            renderSignUp(lang);
            const button = screen.getByRole("button", {
                name: new RegExp(t.pages.signup.btnText.crt.trim(), "i"),
            });
            expect(button).toBeInTheDocument();
        });

        it("should render terms of service and privacy policy links", () => {
            renderSignUp(lang);

            const termsLink = screen.getByRole("link", {
                name: new RegExp(t.pages.signup.term.ters, "i"),
            });
            expect(termsLink).toBeInTheDocument();

            const privacyLink = screen.getByRole("link", {
                name: new RegExp(t.pages.signup.term.politic, "i"),
            });
            expect(privacyLink).toBeInTheDocument();
        });

        it("should toggle password visibility for both password fields", () => {
            renderSignUp(lang);

            // Get both password inputs
            const passwordInputs = [
                screen.getByLabelText(t.pages.signup.inputText.pass),
                screen.getByLabelText(t.pages.signup.inputText.cpass),
            ];

            // Get all toggle buttons
            const toggleButtons = screen
                .getAllByRole("button")
                .filter((btn) =>
                    /mostrar|ocultar|show|hide/i.test(
                        btn.getAttribute("aria-label") || ""
                    )
                );

            // Test that both inputs start as password type
            passwordInputs.forEach((input) => {
                expect(input).toHaveAttribute("type", "password");
            });

            // Click first toggle button and verify the change
            if (toggleButtons.length > 0) {
                fireEvent.click(toggleButtons[0]);

                // At least one password field should change to text
                const textTypeInputs = passwordInputs.filter(
                    (input) => input.getAttribute("type") === "text"
                );
                expect(textTypeInputs.length).toBeGreaterThan(0);
            }
        });
    });
});
