import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { ForgotPassword } from ".";
import { Theme } from "../../../styles";

function renderForgotPassword() {
    return render(
        <ThemeProvider theme={Theme}>
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        </ThemeProvider>
    );
}

describe("ForgotPassword Page", () => {
    it("should render heading", () => {
        renderForgotPassword();

        const heading = screen.getByRole("heading", {
            name: /Esqueci a minha senha/i,
        });
        expect(heading).toBeInTheDocument();
    });

    it("should render sign in link", () => {
        renderForgotPassword();
        const link = screen.getByRole("link", {
            name: /Voltar para início de sessão/i,
        });
        expect(link).toBeInTheDocument();
    });

    it("should render all input fields", () => {
        renderForgotPassword();

        expect(screen.getByLabelText(/Endereço de email/i)).toBeInTheDocument();

    });

    it("should render submit button", () => {
        renderForgotPassword();
        const button = screen.getByRole("button", { name: /Repor a senha/i });
        expect(button).toBeInTheDocument();
    });


});
