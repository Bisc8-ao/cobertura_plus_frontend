import { useMemo, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { useLangContext } from "./useLangContext";
import { useUserContext } from "./useUserContext";

export function useSignin() {
    const { translations } = useLangContext();
    const { dispatch } = useUserContext();
    const navigate = useNavigate();

    const schema = useMemo(
        () =>
            z.object({
                email: z
                    .string()
                    .nonempty(translations.pages.signin.errors.emailRequired)
                    .email(translations.pages.signin.errors.emailInvalid),
                password: z
                    .string()
                    .nonempty(translations.pages.signin.errors.passwordRequired)
                    .min(8, translations.pages.signin.errors.passwordMin),
            }),
        [translations]
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema), mode: "onSubmit" });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    const url_api = `${API_URL} /api/sessions`;

    const handleClickShowPassword = useCallback(() => {
        setShowPassword((v) => !v);
    }, []);

    const prevent = useCallback((e) => e.preventDefault(), []);

    const safeJson = async (res) => {
        try {
            return await res.json();
        } catch {
            return null;
        }
    };

    const storeToken = (token) => {
        if (!token) return;
        try {
            const decoded = jwtDecode(token);
            const expMs = decoded?.exp ? decoded.exp * 1000 : null;
            localStorage.setItem("auth_token", token);
            if (expMs) localStorage.setItem("auth_token_exp", String(expMs));
        } catch {
            localStorage.setItem("auth_token", token);
        }
    };

    const onSubmit = useCallback(
        async (value) => {
            setLoading(true);
            setErrorMessage("");

            try {
                const payload = {
                    userEmail: value.email,
                    userPassword: value.password,
                };

                const response = await fetch(url_api, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                const data = await safeJson(response);

                if (!response.ok) {
                    const apiMsg =
                        data?.message ||
                        translations.pages.signin.errors.invalidCredentials ||
                        "Não foi possível iniciar sessão.";
                    setErrorMessage(apiMsg);
                    return;
                }

                const accessToken = data?.accessToken || data?.token;
                storeToken(accessToken);

                const user = data?.user ?? {};
                const fullName = `${user.firstName ?? ""} ${
                    user.lastName ?? ""
                }`.trim();
                const emailUsername = user.email
                    ? user.email.split("@")[0]
                    : "";
                const name =
                    fullName ||
                    user.name ||
                    user.username ||
                    emailUsername ||
                    value.email;

                dispatch({
                    type: "user_active",
                    payload: {
                        email: user.email || data?.email || value.email,
                        name,
                        photo: user.photo || null,
                    },
                });

                navigate("/dashboard", { replace: true });
            } catch (err) {
                setErrorMessage(
                    err?.message || "Erro inesperado. Tenta novamente."
                );
            } finally {
                setLoading(false);
            }
        },
        [dispatch, navigate, translations, url_api]
    );

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,

        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword: prevent,
        handleMouseUpPassword: prevent,

        loading,
        errorMessage,
    };
}
