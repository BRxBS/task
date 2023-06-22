"use client";
import { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import s from "./styles.module.scss";

export default function Inputs() {
    const { postProducts } = useFetch();

    const [input, setInputs] = useState({
        product_name: "",
        quantity: 0,
        value: 0.0,
    });
    function handleInputs(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        const parsedValue = name === "product_name" ? value : parseFloat(value);
        const intValue = name === "quantity" ? parseInt(value) : parsedValue;
        setInputs({
            ...input,
            [name]: intValue,
        });
    }

    // function handleIntups(e: React.ChangeEvent<HTMLInputElement>) {

    //     setInputs({
    //         ...input,
    //         [e.target.name]: e.target.value,
    //     });
    // }

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
    }
    return (
        <>
            <div className={s.inputContent}>
                <label className={s.labelName}>
                    <p>Nome</p>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={input.product_name}
                        onChange={handleInputs}
                    />
                </label>
                <label className={s.labelQuantity}>
                    <p>Quantidade</p>
                    <input
                        type="text"
                        placeholder="Quantidade"
                        value={input.quantity}
                        onChange={handleInputs}
                    />
                </label>
                <label className={s.labelValue}>
                    <p>Valor</p>
                    <input
                        type="text"
                        placeholder="Valor"
                        value={input.value}
                        onChange={handleInputs}
                    />
                </label>
            </div>
            <div className={s.buttonContainer}>
                <button onClick={handleClick}>Adicionar</button>
            </div>
        </>
    );
}
