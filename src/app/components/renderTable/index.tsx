"use client";

import axios from "axios";

export async function fetchProducts() {
    try {
        const response = await axios.get(
            "http://localhost:3000/api/productGet"
        );
        return response.data;
    } catch (error) {
        console.log("Erro ao buscar os produtos", error);
    }
}
