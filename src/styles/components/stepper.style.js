import { styled, Stepper as MuiStepper} from "@mui/material";


const Stepper = styled(MuiStepper)(({ theme }) => ({
    width: "90%",
    marginTop:"1rem",
    "& .MuiStepLabel-label": {
        fontSize: "1.2rem",
        fontWeight: 500,
    },
    "& .MuiStepIcon-root": {
        fontSize: "3rem",
    },
    "& .MuiStepIcon-root circle": {
        fill: "#ccc",

        strokeWidth: 2,
    },
    "& .MuiStepIcon-root text": {
        fontWeight: "bold",
        fontSize: "1rem",
    },
    "& .MuiStepIcon-root.Mui-active circle": {
        fill: theme.palette.primary.main,
    },
    "& .MuiStepIcon-root.Mui-active text": {
        fill: theme.palette.common.white,
    },

    "@media (max-width: 390px)": {
        "& .MuiStepLabel-label": {
            display:"none"
        }

    }
}));



export { Stepper};
