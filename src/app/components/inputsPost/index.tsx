"use client";
import { TheContext } from "@/app/context/FetchContext";
import { useContext, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import s from "./styles.module.scss";

export default function InputsPost() {
    const { postProducts } = useFetch();

    const [input, setInputs] = useState({
        product_name: "",
        quantity: 0,
        value: 0.0,
    });
    function handleInputs(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        const parsedValue =
            name === "product_name" ? value : parseFloat(value) || 0; // use value if name is product_name, otherwise use parseFloat or 0
        const intValue = name === "quantity" ? parseInt(value) : parsedValue;
        setInputs({
            ...input,
            [name]: intValue,
        });
    }
    function handleClick() {
        try {
            postProducts({
                product_name: input.product_name,
                quantity: input.quantity,
                value: input.value,
            });
        } catch (error) {
            console.log("erro handleClick");
        }
        setInputs({
            product_name: "",
            quantity: 0,
            value: 0.0,
        });
    }
    return (
        <>
            <div className={s.inputContent}>
                <label className={s.labelName}>
                    <p>Nome</p>
                    <input
                        type="text"
                        placeholder="Nome"
                        name="product_name"
                        value={input?.product_name}
                        onChange={handleInputs}
                    />
                </label>
                <label className={s.labelQuantity}>
                    <p>Quantidade</p>
                    <input
                        type="number"
                        placeholder="1"
                        name="quantity"
                        value={input?.quantity}
                        onChange={handleInputs}
                    />
                </label>
                <label className={s.labelValue}>
                    <p>Valor</p>
                    <input
                        type="text"
                        placeholder="Valor"
                        name="value"
                        value={input?.value}
                        onChange={handleInputs}
                    />
                </label>
                <div className={s.buttonContainer}>
                    <button onClick={handleClick}>Adicionar</button>
                </div>
            </div>
        </>
    );
}
