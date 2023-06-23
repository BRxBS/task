"use client";
import s from "./styles.module.scss";
import { Products } from "../../testPage/page";
import { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { Minus, Plus, PencilSimpleLine, TrashSimple } from "phosphor-react";
import { TheContext } from "@/app/context/FetchContext";
import { useContext } from "react";

interface Props {
    product: Products;
}
export default function TableRows({ product }: Props) {
    const [quantity, setQuantity] = useState(product.quantity);
    const { updateQuantity } = useFetch();
    const { setAuthState } = useContext(TheContext);

    useEffect(() => {
        product;
    });

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantity(product.id, newQuantity);
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateQuantity(product.id, newQuantity);
        }
    };

    return (
        <div className={s.ulRows}>
            <ul>
                <li className={s.liName}>{product.product_name}</li>
                <li className={s.liQuatity}>{quantity}</li>
                <li className={s.liValue}>R${product.value}</li>
                <li className={s.tdButton}>
                    <button className={s.tdPlus} onClick={handleIncrement}>
                        <Plus size={10} weight="bold" />
                    </button>
                    <button
                        className={s.tdSubtract}
                        onClick={handleDecrement}
                        disabled={quantity === 0}
                    >
                        <Minus size={10} />
                    </button>
                </li>
                <li className={s.liEditDelete}>
                    <button className={s.buttonEdit}>
                        <PencilSimpleLine size={20} />
                    </button>
                    <button className={s.buttonDelete}>
                        <TrashSimple size={20} />
                    </button>
                </li>
            </ul>
        </div>
    );
}
