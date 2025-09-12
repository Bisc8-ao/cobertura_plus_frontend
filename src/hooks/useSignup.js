import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UseUserContext } from "./useUserContext";
import { useNavigate } from "react-router-dom";
import { UseLangContext } from "./useLangContext";

function UseSignUp() {
    const url_api = `${import.meta.env.VITE_API_URL}/auth/register`;

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { dispatch } = UseUserContext();
    const { translations } = UseLangContext();

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
                 .min(6, translations.pages.signup.errors.passwordMin),

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

    const navigate = useNavigate();

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

            const data = await response.json();
            console.log(data);
            if (response.ok) {
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
            } else {
                setLoading(false);
                console.log("Login error:", response);
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
    };
}

export { UseSignUp };
