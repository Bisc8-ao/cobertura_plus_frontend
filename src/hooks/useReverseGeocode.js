import { useCallback, useState } from "react";
import { UseLocation } from "./useLocation";

function useReverseGeocode() {
    const [address, setAddress] = useState("");


    const API_KEY = import.meta.env.VITE_API_KEY_GOOGLE;

       const getAddressFromLatLng = useCallback(
           async ( lat, lng ) => {
               try {
                   const response = await fetch(
                       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
                   );
                   const data = await response.json();
                   console.log(data)

                   if (data.status === "OK") {
                       setAddress(data.results[0].formatted_address);
                   } else {
                       console.error(
                           "Erro Geocode:",
                           data.error_message || data.status
                       );
                       setAddress("Não foi possível obter o endereço");
                   }

                   return data;
               } catch (err) {
                   console.error("Erro ao chamar API:", err);
                   setAddress("Erro na requisição");
                   return null;
               }
           },
           [API_KEY]
       );



    return {
        address,
        getAddressFromLatLng,
    };
}

export { useReverseGeocode };
