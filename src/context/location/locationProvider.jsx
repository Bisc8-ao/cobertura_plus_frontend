import { useState, useEffect } from "react";
import { LocationContext } from "./locationContext";

function LocationProvider({ children }) {
    const [location, setLocation] = useState({});
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [getIpUser, setGetIpUser] = useState(false);
    const url_api = `${import.meta.env.VITE_API_URL}/`;

    async function sendPayloadToBackend(payload) {

        console.log(payload)
          /*try {
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

              const data = await response.json();
              console.log("Resposta do backend:", data);
          } catch (err) {
              console.error("Erro ao enviar payload:", err.message);
              setError(err.message);
          }*/
      }
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
                   sendPayloadToBackend(payload);
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
