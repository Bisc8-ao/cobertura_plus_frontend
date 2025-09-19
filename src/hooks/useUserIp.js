import {useEffect, useState} from 'react'

function UseUserIp() {
    const [getIpUser, setGetIpUser] = useState(false);
    
    useEffect(() => {
            const controller = new AbortController();
            const signal = controller.signal;

            const handleGetIpUser = async () => {
                try {
                    const response = await fetch(
                        "https://api.ipify.org?format=json",
                        { signal }
                    );
                    const data = await response.json();
                    setGetIpUser(data.ip);
                } catch (error) {
                    if (error.name !== "AbortError") {
                        //setError(`Erro ao buscar IP:${error}`);
                        console.error("Erro ao buscar IP:", error);
                    }
                }
            };

            handleGetIpUser();

            return () => {
                controller.abort();
            };
        }, []);
  return { getIpUser };
}

export {UseUserIp}
