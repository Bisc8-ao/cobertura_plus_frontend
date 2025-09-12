import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UseLocation } from "./useLocation";
const schena = z.object({
    firstName: z
        .string()
        .min(2, { message: "O nome deve ter no minimo 2 caracteres" }),
    lastName: z
        .string()
        .min(2, { message: "O sobrenome deve ter no minimo 2 caracteres" }),
    birthDate: z
        .string()
        .min(1, "A data de nascimento é obrigatória")
        .refine((val) => {
            const date = new Date(val);
            return !isNaN(date.getTime());
        }, "Data inválida"),
    bi: z.string().regex(/^00\d{7}[A-Z]{2}\d{3}$/, {
        message: "Número de B.I inválido. Ex: 001234567LA001",
    }),
    email: z.string().email({ message: "Email invalido" }),
    phone: z
        .string()
        .min(9, { message: "O telefone deve ter no minimo 9 caracteres" })
        .max(12, { message: "O telefone deve ter no maximo 12 caracteres" }),
    message: z.string().optional(),
});

function UseSteps() {
    const { location } = UseLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm({
        resolver: zodResolver(schena),
        mode: "onChange",
        reValidateMode: "onChange",
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const steps = ["Apresentação", "Dados", "Mensagem"];
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = async () => {
        let fieldsToValidate = [];

        if (activeStep === 0) {
            fieldsToValidate = ["firstName", "lastName", "birthDate"];
        } else if (activeStep === 1) {
            fieldsToValidate = ["bi", "email", "phone"];
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

    function onSubmit(value) {



        const payload = {
            ...value,
            ...location
        }
        console.log(payload);

        setLoading(true)
        //navigate("/subscription-confirmation");
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

export { UseSteps };
