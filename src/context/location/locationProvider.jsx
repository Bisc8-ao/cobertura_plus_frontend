import { useState } from "react";
import PropTypes from "prop-types";
import { LocationContext } from "./locationContext";
import { UseCheckCoverage, UseUserIp } from "../../hooks";

function LocationProvider({ children }) {
    const [location, setLocation] = useState({});
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const { checkCoverage } = UseCheckCoverage();
    const { getIpUser } = UseUserIp();

    function handleLocation(callback) {
       

        if (!navigator.geolocation) {
            setError("Geolocalização não suportada");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                callback?.();
                setIsLoading(true);
                if (
                    position.coords.latitude &&
                    position.coords.longitude &&
                    getIpUser
                ) {
                    const payload = {
                        userIp: getIpUser,
                        userLat: position.coords.latitude,
                        userLon: position.coords.longitude,
                        userAgent: navigator.userAgent,
                    };
                    console.log(payload);

                    try {
                        const result = await checkCoverage(payload);
                        setLocation({
                            lat: payload.userLat,
                            lng: payload.userLon,
                            ip: payload.userIp,
                            corvaged: result.available,
                        });
                        setError(null);
                    } catch (err) {
                        setError(err.message);
                    } finally {
                        setIsLoading(false);
                    }
                } else {
                    setError(
                        "Não foi possível obter todos os dados necessários (IP, Localização)."
                    );
                    setIsLoading(false);
                }
            },
            (err) => {
                switch (err.code) {
                    case 1:
                        setError("Usuário recusou o acesso à localização ");
                        console.log("Usuário recusou o acesso à localização ");
                        break;
                    case 2:
                        setError("Localização indisponível");
                        console.log("Localização indisponível");
                        break;
                    case 3:
                        setError("Tempo esgotado para obter a localização ");
                        console.log("Tempo esgotado para obter a localização ");
                        break;
                    default:
                        setError("Erro desconhecido ao obter a localização");
                        console.log(
                            "Erro desconhecido ao obter a localização "
                        );
                }
                setIsLoading(false);
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
        );
    }

    return (
        <LocationContext.Provider
            value={{
                location,
                setLocation,
                error,
                isLoading,
                handleLocation,
                setIsLoading,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
}

LocationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { LocationProvider };
