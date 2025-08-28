import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { VerifyAccount } from ".";
import { Theme } from "../../../styles";

function renderVerifyAccount() {
    return render(
        <ThemeProvider theme={Theme}>
            <MemoryRouter>
                <VerifyAccount />
            </MemoryRouter>
        </ThemeProvider>
    );
}

describe("VerifyAccount Page", () => {
    it("should render heading", () => {
        renderVerifyAccount();

        const heading = screen.getByRole("heading", {
            name: /Verifique o seu email/i,
        });
        expect(heading).toBeInTheDocument();
    });

    it("should render sign in link", () => {
        renderVerifyAccount();
        const link = screen.getByRole("link", {
            name: /Reenviar/i,
        });
        expect(link).toBeInTheDocument();
    });
    it("should render OTP input fields with labels", () => {
        renderVerifyAccount();

        const firstOtp = screen.getByLabelText("Dígito 1 do código OTP");
        expect(firstOtp).toBeInTheDocument();
    });

    it("should render all input fields", () => {
        renderVerifyAccount();

        expect(screen.getByLabelText(/Endereço de email/i)).toBeInTheDocument();
    });

    it("should render submit button", () => {
        renderVerifyAccount();
        const button = screen.getByRole("button", { name: /Validar/i });
        expect(button).toBeInTheDocument();
    });
});
