import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLangContext } from "./useLangContext";
import { UseLocation } from "./useLocation";
import { useReverseGeocode } from "./useReverseGeocode";

function useSteps() {
    const { translations } = useLangContext();
    const { location } = UseLocation();
    const schena = z.object({
        firstName: z.string().min(2, {
            message: translations.pages.subscribe.errors.firstNameMin,
        }),
        lastName: z.string().min(2, {
            message: translations.pages.subscribe.errors.lastNameMin,
        }),
        birthDate: z
            .string()
            .min(1, translations.pages.subscribe.errors.birthDateRequired)
            .refine((val) => {
                const date = new Date(val);
                return !isNaN(date.getTime());
            }, translations.pages.subscribe.errors.birthDateInvalid),
        bi: z.string().regex(/^00\d{7}[A-Z]{2}\d{3}$/, {
            message: translations.pages.subscribe.errors.biInvalid,
        }),

        gender: z.string().min(1, {
            message: translations.pages.subscribe.errors.genderRequired,
        }),
        email: z.string().email({
            message: translations.pages.subscribe.errors.emailInvalid,
        }),
        phone: z
            .string()
            .min(9, { message: translations.pages.subscribe.errors.phoneMin })
            .max(12, {
                message: translations.pages.subscribe.errors.phoneMax,
            }),
        message: z.string().optional(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm({
        resolver: zodResolver(schena),
        //mode: "onChange",
        //reValidateMode: "onChange",
    });
    const navigate = useNavigate();
    const {address} = useReverseGeocode()

    const [loading, setLoading] = useState(false);
    const steps = [...translations.pages.subscribe.steps];
    const [activeStep, setActiveStep] = useState(0);
    const API_URL = import.meta.env.VITE_API_URL;
    const url_api = `${API_URL}/api/leads/`;

    const handleNext = async () => {
        let fieldsToValidate = [];

        if (activeStep === 0) {
            fieldsToValidate = ["firstName", "lastName", "birthDate"];
        } else if (activeStep === 1) {
            fieldsToValidate = ["service", "bi", "email", "phone"];
        } else if (activeStep === 2) {
            fieldsToValidate = ["message"];
        }

        const isValid = await trigger(fieldsToValidate);

        if (isValid) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    async function onSubmit(value) {
        setLoading(true);
        console.log(address);

        const payload = {
            firstName: value.firstName,
            lastName: value.lastName,
            dateOfBirth: value.birthDate,
            gender: value.gender,
            identityNumber: value.bi,
            email: value.email,
            phone: value.phone,
            message: value.message,
            lat: location.lat,
            lon: location.lng,
            available: location.corvaged,
            address,
        };

        try {
            const response = await fetch(url_api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                setLoading(false);
                throw new Error("Falha ao enviar payload para o backend");
            }

            const result = await response.json();
            console.log(result, response);
            navigate("/coverage/subscription-confirmation");
             setLoading(false);
            console.log(result);
        } catch (error) {
            console.log(error);
        } finally {
             setLoading(false);
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        steps,
        activeStep,
        handleNext,
        handleBack,
        onSubmit,
        loading,
    };
}

export { useSteps };
