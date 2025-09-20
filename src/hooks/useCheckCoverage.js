import { useState } from "react";


function UseCheckCoverage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const url_api = `${import.meta.env.VITE_API_URL}/api/coverage/quick-test`;



    const checkCoverage = async (payload) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url_api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Falha ao enviar payload para o backend");
            }

            const result = await response.json();
            console.log("responsta do backend:", result)
            setData(result);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, checkCoverage };
}

export { UseCheckCoverage };
