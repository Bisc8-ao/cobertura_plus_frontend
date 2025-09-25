import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useUserContext } from "./useUserContext";
import { useLangContext } from "./useLangContext";
import { useNavigate } from "react-router-dom";

function useSignUp() {
    const API_URL = import.meta.env.VITE_API_URL;
    const url_api = `${API_URL}/api/users`;
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const { dispatch } = useUserContext();
    const { translations } = useLangContext();

    const schema = z
        .object({
            firstName: z
                .string()
                .nonempty(translations.pages.signup.errors.firstNameRequired)
                .min(2, translations.pages.signup.errors.firstNameMin),

            lastName: z
                .string()
                .nonempty(translations.pages.signup.errors.lastNameRequired)
                .min(2, translations.pages.signup.errors.lastNameMin),

            email: z
                .string()
                .nonempty(translations.pages.signup.errors.emailRequired)
                .email(translations.pages.signup.errors.emailInvalid),
            /* .refine((val) => val.endsWith("@tvcabo.co.ao"), {
                    message: "O email deve terminar com @tvcabo.co.ao",
                })*/ password: z
                .string()
                .nonempty(translations.pages.signup.errors.passwordRequired)
                .min(8, translations.pages.signup.errors.passwordMin),

            confirmPassword: z
                .string()
                .nonempty(
                    translations.pages.signup.errors.confirmPasswordRequired
                ),
        })
        .refine((data) => data.password === data.confirmPassword, {
            path: ["confirmPassword"],
            message: translations.pages.signup.errors.passwordsMismatch,
        });

    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

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
                userFirstName: value.firstName,
                userLastName: value.lastName,
            };

            const response = await fetch(url_api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            setData(result);
            console.log(result);
            if (response.ok) {
                const user = result?.user || {};
                const fullName = `${user.firstName ?? ""} ${
                    user.lastName ?? ""
                }`.trim();
                const emailUsername = user.email
                    ? user.email.split("@")[0]
                    : "";
                dispatch({
                    type: "user_active",
                    payload: {
                        email: user.email,
                        name:
                            fullName ||
                            user.name ||
                            emailUsername ||
                            result.email,
                        photo: user.photo || null,
                        id: user.id,
                        role: user.role,
                        phone: user.user_phone || null,
                        dateOfBirth: user.dateOfBirth || null,
                    },
                });

                //navigate("/auth/verifyaccount", { replace: true });

                setLoading(false);
            } else {
                setLoading(false);
                console.log("signup:", response);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return {
        onSubmit,
        register,
        handleSubmit,
        errors,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleMouseUpPassword,
        showPassword,
        loading,
        data,
    };
}

export { useSignUp };
