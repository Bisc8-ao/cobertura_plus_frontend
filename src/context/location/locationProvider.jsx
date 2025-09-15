import { useState, useEffect } from "react";
import { LocationContext } from "./locationContext";

function LocationProvider({ children }) {
    const [location, setLocation] = useState({});
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [getIpUser, setGetIpUser] = useState(false);

    function handleLocation(callback) {
        if (!navigator.geolocation) {
            setError("Geolocalização não suportada");
            return;
        }

        setIsLoading(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (
                    position.coords.latitude &&
                    position.coords.longitude &&
                    getIpUser
                ) {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        ip: getIpUser,
                    });
                    const payload = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        ip: getIpUser,
                    };
                    console.log("payload:",payload);
                    setError(null);
                    callback?.();
                }
            },
            (err) => {
                setError("Erro a obter a localização: " + err.message);
                setIsLoading(false);
            }
        );
    }

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

    return (
        <LocationContext.Provider
            value={{ location, error, isLoading, handleLocation, setIsLoading }}
        >
            {children}
        </LocationContext.Provider>
    );
}

export { LocationProvider };
