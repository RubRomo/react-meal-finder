import axios from "axios";
import { useEffect, useState } from "react";

export default function useHttpData<T>(url: string) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //Flag to se states just once when component is rendered
        let ignore = false;
        const controller = new AbortController();
        const { signal } = controller;
        setLoading(true);
        //Destructuring of response to extract just data
        axios
            .get<{ meals: T[] }>(url, { signal })
            .then(({ data }) => {
                if (!ignore) {
                    setData(data.meals);
                }
            })
            .finally(() => {
                if (!ignore) {
                    setLoading(false);
                }
            });
        //Abort to prevent multiple requests
        return () => {
            controller.abort();
            ignore = true;
        };
    }, [url]);

    return { loading, data, setData, setLoading };
}
