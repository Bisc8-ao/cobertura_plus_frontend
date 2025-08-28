import React, { useRef, forwardRef } from "react";
import * as Styled from "../../styles";

const InputOtp = forwardRef(({ value = "", onChange, error }, ref) => {
    const length = 6;
    const inputRefs = useRef([]);

    const otpArray = value
        .split("")
        .concat(Array(length).fill(""))
        .slice(0, length);

    const handleChange = (val, index) => {
        if (/^[0-9]?$/.test(val)) {
            const newOtp = [...otpArray];
            newOtp[index] = val;

            const newValue = newOtp.join("");
            onChange(newValue);

            if (val && index < length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otpArray[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <React.Fragment>
            <Styled.InputOtpContainer ref={ref}>
                {otpArray.map((item, index) => (
                    <Styled.InputOtp
                        key={index}
                        type="text"
                        placeholder="-"
                        value={item}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onChange={(e) => handleChange(e.target.value, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        maxLength={1}
                        error={error}
                        aria-label={`Dígito ${index + 1} do código OTP`}
                    />
                ))}
            </Styled.InputOtpContainer>
        </React.Fragment>
    );
});
InputOtp.displayName = "InputOtp";

export { InputOtp };
