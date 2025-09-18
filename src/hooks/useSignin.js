import { UseLangContext } from "./useLangContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { UseUserContext } from "./useUserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




function UseSignin() {
    const { translations } = UseLangContext();

    const schema = z.object({
        email: z
            .string()
            .nonempty(translations.pages.signin.errors.emailRequired)
            .email(translations.pages.signin.errors.emailInvalid),
        password: z
            .string()
            .nonempty(translations.pages.signin.errors.passwordRequired)
            .min(8, translations.pages.signin.errors.passwordMin),
    });


    const url_api = `${import.meta.env.VITE_API_URL}/auth/sign-in`;

    const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm({
            resolver: zodResolver(schema),
        });

        const [showPassword, setShowPassword] = useState(false);
        const [loading, setLoading] = useState(false);
        const [errorMessage, setErrorMessage] = useState();
        const { dispatch } = UseUserContext();
        const navigate = useNavigate();

        const handleClickShowPassword = () => setShowPassword((show) => !show);

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };

        const handleMouseUpPassword = (event) => {
            event.preventDefault();
        };

        async function onSubmit(value) {

            setLoading(true);

            try {
                const payload = {
                    userEmail: value.email,
                    userPassword: value.password,
                };

                const response = await fetch(url_api, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                const data = await response.json();

                if (response.ok) {
                    // expecting { accessToken: string, user: { id, userFirstName, userLastName, userEmail } }
                    const accessToken = data?.accessToken || data?.token;
                    if (accessToken) {
                        try {
                            const decoded = jwtDecode(accessToken);
                            const exp = decoded?.exp ? decoded.exp * 1000 : null;
                            localStorage.setItem("auth_token", accessToken);
                            if (exp) {
                                localStorage.setItem("auth_token_exp", String(exp));
                            }
                        } catch (_) {
                            // if decode fails, still store token
                            localStorage.setItem("auth_token", accessToken);
                        }
                    }

                    const user = data?.user || {};
                    const fullName = `${user.userFirstName ?? ""} ${
                        user.userLastName ?? ""
                    }`.trim();
                    dispatch({
                        type: "user_active",
                        payload: {
                            email: user.userEmail || data.email,
                            name:
                                fullName ||
                                user.name ||
                                user.username ||
                                data.email,
                            photo: user.photo || null,
                        },
                    });
                    setLoading(false);
                    navigate("/dashboard", { replace: true });
                } else {
                    setErrorMessage(data.message);
                    console.log("Login error:", response);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error.message);
                setErrorMessage(error.message);
                setLoading(false);
            }
        }

    return {
        handleClickShowPassword,
        handleMouseDownPassword,
        handleMouseUpPassword,
        onSubmit,
        showPassword,
        loading,
        errorMessage,
        register,
        handleSubmit,
        errors
    };

}

export { UseSignin };
