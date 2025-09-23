import { useEffect, useState } from 'react'

function UseGetCoverageAreas() {
      const [geodata, setGeodata] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL;
     useEffect(() => {
            const url_api = `${API_URL}/api/coverage/areas`;
            const controller = new AbortController();

            const fetchData = async () => {
                try {
                    const response = await fetch(url_api, {
                        signal: controller.signal,
                    });
                    const data = await response.json();
                    if (data.type === "FeatureCollection") {
                        setGeodata(data);
                    }
                } catch (error) {
                    if (error.name !== "AbortError") {
                        console.error("Erro ao buscar dados:", error);
                    }
                }
            };

            fetchData();
            return () => controller.abort();
     }, [API_URL]);

    return { geodata };
}

export {UseGetCoverageAreas}
