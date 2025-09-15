import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { VerifyAccount } from ".";
import { Theme } from "../../../styles";
import { LangContext } from "../../../context";
import { Translations } from "../../../translations";

function renderVerifyAccount(lang = "Português") {
    const translations = Translations[lang];

    return render(
        <ThemeProvider theme={Theme}>
            <MemoryRouter>
                <LangContext.Provider
                    value={{
                        langSelected: lang,
                        setLangSelected: () => {},
                        translations,
                    }}
                >
                    <VerifyAccount />
                </LangContext.Provider>
            </MemoryRouter>
        </ThemeProvider>
    );
}

describe("VerifyAccount Page", () => {
    ["Português", "Inglês"].forEach((lang) => {
        const t = Translations[lang];

        describe(`Language: ${lang}`, () => {
            it("should render heading", () => {
                renderVerifyAccount(lang);

                const heading = screen.getByRole("heading", {
                    name: t.pages.verifyaccount.title,
                });
                expect(heading).toBeInTheDocument();
            });

            it("should render description", () => {
                renderVerifyAccount(lang);
                expect(
                    screen.getByText(t.pages.verifyaccount.description)
                ).toBeInTheDocument();
            });

            it("should render email input", () => {
                renderVerifyAccount(lang);
                expect(
                    screen.getByLabelText(
                        t.pages.verifyaccount.inputText.email,
                        {
                            selector: "input",
                        }
                    )
                ).toBeInTheDocument();
            });

           it("should render OTP input fields", () => {
               renderVerifyAccount(lang);

               const otpInputs = screen.getAllByRole("textbox");
               expect(otpInputs.length).toBeGreaterThan(0);
           });

            it("should render submit button", () => {
                renderVerifyAccount(lang);
                const button = screen.getByRole("button", {
                    name: t.pages.verifyaccount.btnText.validate,
                });
                expect(button).toBeInTheDocument();
            });

            it("should render resend link", () => {
                renderVerifyAccount(lang);
                expect(
                    screen.getByRole("link", {
                        name: t.pages.verifyaccount.link.resend,
                    })
                ).toBeInTheDocument();
            });

            it("should render back link", () => {
                renderVerifyAccount(lang);
                expect(
                    screen.getByRole("link", {
                        name: t.pages.verifyaccount.link.back,
                    })
                ).toBeInTheDocument();
            });
        });
    });
});
