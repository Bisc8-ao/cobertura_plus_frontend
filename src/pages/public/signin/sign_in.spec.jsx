import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { SignIn } from ".";
import { Theme } from "../../../styles";

function renderSignIn() {
    return render(
        <ThemeProvider theme={Theme}>
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        </ThemeProvider>
    );
}

describe("SignIn Page", () => {
    it("should render heading", () => {
        renderSignIn();

        const heading = screen.getByRole("heading", {
            name: /Inicie sessão na sua conta/i,
        });
        expect(heading).toBeInTheDocument();
    });

    it("should render sign in link", () => {
        renderSignIn();
        const link = screen.getByRole("link", { name: /Criar conta/i });
        expect(link).toBeInTheDocument();
    });

    it("should render all input fields", () => {
        renderSignIn();

        expect(screen.getByLabelText(/Endereço de email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
       
    });

    it("should render submit button", () => {
        renderSignIn();
        const button = screen.getByRole("button", { name: /Iniciar sessão/i });
        expect(button).toBeInTheDocument();
    });



    it("should toggle password visibility", () => {
        renderSignIn();
        const passwordInput = screen.getByLabelText(/Senha/i);
        const toggleButton = screen.getByRole("button", {
            name: /display the password/i,
        });


        expect(passwordInput).toHaveAttribute("type", "password");


        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute("type", "text");


        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute("type", "password");
    });
});
