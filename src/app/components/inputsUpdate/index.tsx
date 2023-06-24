"use client";
import { useContext, useState } from "react";
import s from "./styles.module.scss";
import { TheContext } from "@/app/context/FetchContext";
import useFetch from "../../../../hooks/useFetch";

interface Props {
    productId: number;
    product_name: string;
    quantity: number;
    value: number;
    handleCloseModal: () => void;
}
export default function InputsUpdate({
    productId,
    product_name,
    quantity,
    value,
    handleCloseModal,
}: Props) {
    const { updateInfoProduct } = useFetch();

    const [input, setInputs] = useState({
        product_name: product_name,
        quantity: quantity,
        value: value,
    });
    function handleInputs(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        const parsedValue =
            name === "product_name" ? value : parseFloat(value) || 0;
         // use value if name is product_name, otherwise use parseFloat or 0
        const intValue = name === "quantity" ? parseInt(value) : parsedValue;
        setInputs({
            ...input,
            [name]: intValue,
        });
    }
    function handleClick() {
        try {
            const newValue = input.value;
            const newQuantity = input.quantity;
            const newProductName = input.product_name;
            const id = productId;
            updateInfoProduct(id, newValue, newQuantity, newProductName);
        } catch (error) {
            console.log("erro handleClick");
        }
        handleCloseModal();
    }
    return (
        <>
            <div className={s.inputContent}>
                <div className={s.nameWrapper}>
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
                </div>
                <div className={s.quantValWrapper}>
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
            </div>
        </>
    );
}
