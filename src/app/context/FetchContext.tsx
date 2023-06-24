"use client";

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

interface Products {
    product_name: string;
    quantity: number;
    value: number;
}

interface ContextProps {
    productState: Products[];
    fetchProducts: () => void;
    postProducts: (product: Products) => Promise<void>;
    updateQuantity: (id: number, newQuantity: number) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
    updateInfoProduct: (
        id: number,
        newValue: number,
        newQuantity: number,
        newProductName: string
    ) => Promise<void>;
}

export const TheContext = createContext<ContextProps>({
    productState: [],
    fetchProducts: () => Promise.resolve(),
    postProducts: () => Promise.resolve(),
    updateQuantity: () => Promise.resolve(),
    deleteProduct: () => Promise.resolve(),
    updateInfoProduct: () => Promise.resolve(),
});

export default function ProductContext({
    children,
}: {
    children: React.ReactNode;
}) {
    const [productState, setProductState] = useState<Products[]>([]);

    console.log("productState context", productState);
    console.log("oi de fora");

    async function fetchProducts() {
        console.log("oi de dentro");
        try {
            const response = await axios.get(
                "http://localhost:3000/api/productGet"
            );
            console.log("response", response);
            console.log("response", response.data);
            setProductState(response.data);
        } catch (error) {
            console.log("error do catch authContext");
            throw new Error();
        }
    }

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
            setProductState(response.data);
        } catch (error) {}
    }

    async function updateQuantity(id: number, newQuantity: number) {
        console.log("id hook", id);
        console.log("newQuantity hook", newQuantity);

        try {
            const response = await axios.put(
                `http://localhost:3000/api/updateQuantityProduct/${id}`,
                {
                    quantity: newQuantity,
                }
            );
            setProductState(response.data);
        } catch (error) {}
    }
    async function deleteProduct(id: number) {
        try {
            console.log("oi delete", id);
            const response = await axios.delete(
                `http://localhost:3000/api/deleteProduct/${id}`
            );
            setProductState(response.data);
        } catch (error) {}
    }
    async function updateInfoProduct(
        id: number,
        newValue: number,
        newQuantity: number,
        newProductName: string
    ) {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/updateInfo/${id}`,
                {
                    quantity: newQuantity,
                    value: newValue,
                    product_name: newProductName,
                }
            );
            setProductState(response.data);
        } catch (error) {}
    }

    return (
        <TheContext.Provider
            value={{
                ...productState,
                productState,
                fetchProducts,
                deleteProduct,
                postProducts,
                updateInfoProduct,
                updateQuantity,
            }}
        >
            {children}
        </TheContext.Provider>
    );
}
