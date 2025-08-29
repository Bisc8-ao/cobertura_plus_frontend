import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schena = z.object({
    firstName: z
        .string()
        .min(2, { message: "O nome deve ter no minimo 2 caracteres" }),
    lastName: z
        .string()
        .min(2, { message: "O sobrenome deve ter no minimo 2 caracteres" }),
    birthDate: z
        .string()
        .min(4, {
            message: "O ano de nascimento deve ter no minimo 4 caracteres",
        })
        .max(4, {
            message: "O ano de nascimento deve ter no maximo 4 caracteres",
        }),
    nb: z.string().min(5, { message: "O N.B deve ter no minimo 5 caracteres" }),
    email: z.string().email({ message: "Email invalido" }),
    phone: z
        .string()
        .min(9, { message: "O telefone deve ter no minimo 9 caracteres" })
        .max(12, { message: "O telefone deve ter no maximo 12 caracteres" }),
    message: z.string().optional(),
});

function UseSteps() {
    const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm({
            resolver: zodResolver(schena),
        });

        const steps = ["Apresentação", "Dados", "Mensagem"];
        const [activeStep, setActiveStep] = useState(0);

        const handleNext = () => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };

        const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };

        useEffect(() => {
            switch (true) {
                case !!(errors.firstName || errors.lastName || errors.birthDate):
                    setActiveStep(0);
                    break;
                case !!(errors.nb || errors.email || errors.phone):
                    setActiveStep(1);
                    break;
                case !!errors.message:
                    setActiveStep(2);
                    break;
                default:
                    break;
            }
        }, [
            errors.firstName,
            errors.lastName,
            errors.birthDate,
            errors.nb,
            errors.email,
            errors.phone,
            errors.message,
        ]);

        function onSubmit(data) {
            console.log(data);
        }
  return{register, handleSubmit, errors, steps, activeStep, handleNext, handleBack, onSubmit}
}

export {UseSteps}
