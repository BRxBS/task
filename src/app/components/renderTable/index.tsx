"use client";

import axios from "axios";

export async function fetchProducts() {
    try {
        const response = await axios.get(
            "https://task-brxbs.vercel.app/api/productGet"
        );
        return response.data;
    } catch (error) {
        console.log("Erro ao buscar os produtos", error);
    }
}
// para rodar no local host
// http://localhost:3000/api/productGet
