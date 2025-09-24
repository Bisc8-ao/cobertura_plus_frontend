import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLangContext } from "./useLangContext";

function useSteps() {
    const {translations} = useLangContext()
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
        service: z.string().min(1, {
            message: translations.pages.subscribe.errors.serviceRequired,
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

    const [loading, setLoading] = useState(false)
    const steps = [...translations.pages.subscribe.steps];
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = async () => {
        let fieldsToValidate = [];

        if (activeStep === 0) {
            fieldsToValidate = ["firstName", "lastName", "birthDate", "gender"];
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

    function onSubmit() {

        setLoading(true)
        navigate("/coverage/subscription-confirmation");
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
        loading
    };
}

export { useSteps };
