"use client";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

interface Products {
    id?: number;
    product_name: string;
    quantity: number;
    value: number;
}

interface ContextProps {
    loading: boolean;
    setlLoading: React.Dispatch<React.SetStateAction<boolean>>;
    productState: Products[];
    postProducts: (product: Products) => Promise<void>;
    updateQuantity: (id: number, newQuantity: number) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
    updateInfoProduct: (
        id: number,
        newValue: number,
        newQuantity: number,
        newProductName: string
    ) => Promise<void>;
    setProductState: React.Dispatch<React.SetStateAction<Products[]>>;
}

export const TheContext = createContext<ContextProps>({
    loading: false,
    setlLoading: () => {},
    productState: [],
    postProducts: () => Promise.resolve(),
    updateQuantity: () => Promise.resolve(),
    deleteProduct: () => Promise.resolve(),
    updateInfoProduct: () => Promise.resolve(),
    setProductState: () => {},
});

export default function ProductContext({
    children,
}: {
    children: React.ReactNode;
}) {
    const [productState, setProductState] = useState<Products[]>([]);
    const [loading, setlLoading] = useState(false);
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
                "https://task-brxbs.vercel.app/api/productPost",
                // para rodar no local host
                // http://localhost:3000/api/productPost

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
        try {
            const response = await axios.put(
                `https://task-brxbs.vercel.app/api/updateQuantityProduct/${id}`,
                // para rodar no local host
                // http://localhost:3000/api/updateQuantityProduct/${id}
                {
                    quantity: newQuantity,
                }
            );
            setProductState(response.data);
        } catch (error) {}
    }
    async function deleteProduct(id: number) {
        try {
            const response = await axios.delete(
                `https://task-brxbs.vercel.app/api/deleteProduct/${id}`
                // para rodar no local host
                // http://localhost:3000/api/deleteProduct/${id}
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
                `https://task-brxbs.vercel.app/api/updateInfo/${id}`,
                // para rodar no local host
                // http://localhost:3000/api/updateInfo/${id}
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
                loading,
                setlLoading,
                productState,
                deleteProduct,
                postProducts,
                updateInfoProduct,
                updateQuantity,
                setProductState,
            }}
        >
            {children}
        </TheContext.Provider>
    );
}
