"use client";

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

interface Products {
    product_name: string;
    quantity: number;
    value: number;
}

interface State {
    data: Products | null;
}

interface FetchState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const TheContext = createContext<FetchState>({
    data: null,
    setAuthState: () => {},
});

export default function AuthContext({
    children,
}: {
    children: React.ReactNode;
}) {
    const [authState, setAuthState] = useState<State>({
        data: null,
    });
    async function fetchProducts() {
        setAuthState({
            data: null,
        });
        try {
            const response = await axios.get(
                "http://localhost:3000/api/productGet"
            )
            setAuthState({
                data: response.data
            })
         
        } catch (error) {
            console.log("error do catch authContext")
            throw new Error
        }
    }
    useEffect(() => {
        fetchProducts()
    },[])

    return (
        <TheContext.Provider value={{ ...authState, setAuthState }}>
            {children}
        </TheContext.Provider>
    );
}
