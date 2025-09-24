import { useCallback, useState } from "react";


function UseCheckCoverage() {
    const [responseBack, setResponseBack] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;
    const url_api = `${API_URL}/api/coverage/quick-test`;

    const checkCoverage = useCallback(
        async (payload) => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url_api, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": navigator.userAgent,
                    },
                    body: JSON.stringify(payload),
                });
                setResponseBack(response);

                if (!response.ok) {
                    throw new Error("Falha ao enviar payload para o backend");
                }

                const result = await response.json();
                console.log("resposta do backend:", result);
                return result;
            } catch (err) {
                setError(err.message);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [url_api]
    );

    return { responseBack, error, loading, checkCoverage };
}

export { UseCheckCoverage };
