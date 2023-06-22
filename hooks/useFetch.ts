import axios from "axios";
import { TheContext } from "@/app/context/FetchContext";
import { useContext } from "react";

export default function useFetch() {
    const { setAuthState } = useContext(TheContext);

    async function postProducts({
        product_name,
        quantity,
        value,
    }: {
        product_name: string;
        quantity: number;
        value: number;
    }) {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/productPost",
                {
                    product_name,
                    quantity,
                    value,
                }
            );
            setAuthState({
                data: response.data
            })
        } catch (error) {}
    }

    return{ postProducts};
}
