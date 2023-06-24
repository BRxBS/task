"use client";
import React, { useContext } from "react";
import Modal from "react-modal";
import { Products } from "../../testPage/page";
import { useEffect, useState } from "react";
import { Minus, Plus, PencilSimpleLine, TrashSimple, X } from "phosphor-react";
import s from "./styles.module.scss";
import InputsUpdate from "../inputsUpdate";
import useFetch from "../../../../hooks/useFetch";

interface Props {
    product: Products;
}
export default function TableRows({ product }: Props) {
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [quantity, setQuantity] = useState(product.quantity);
    const { updateQuantity, deleteProduct } = useFetch();

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };
    const customXStyles = {
        transform: "translateX(1500%)",
        cursor: "pointer",
    };
    const customDeleteYes = {
        transform: "translateX(150%)",
        marginTop: "1rem",
        width: "5rem",
        height: "2rem",
        cursor: "pointer",
        background: "#004f8d",
        border: "2px solid #004f8d",
        borderRadius: " 5px",
        color: " #ffffff",
    };

    function handleIncrement() {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantity(product.id, newQuantity);
    }
    function handleDecrement() {
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateQuantity(product.id, newQuantity);
        }
    }
    function handleDeleteProduct() {
        deleteProduct(product.id);
        setOpenDeleteModal(false);
    }

    function HandleOpenModalEdit() {
        setOpenModalEdit(true);
    }
    function handleCloseModalEdit() {
        setOpenModalEdit(false);
    }
    function HandleOpenModalDelete() {
        setOpenDeleteModal(true);
    }
    function handleCloseModalDelete() {
        setOpenDeleteModal(false);
    }

    return (
        <div className={s.ulRows}>
            {/* start modal Edit */}
            <Modal
                style={customStyles}
                isOpen={openModalEdit}
                onRequestClose={handleCloseModalEdit}
                contentLabel="Example Modal"
            >
                <X
                    onClick={handleCloseModalEdit}
                    style={customXStyles}
                    size={20}
                />
                <InputsUpdate
                    productId={product.id}
                    product_name={product.product_name}
                    quantity={product.quantity}
                    value={product.value}
                    handleCloseModal={handleCloseModalEdit}
                />
            </Modal>
            {/* end modal Edit */}

            {/* start modal Delete */}
            <Modal
                style={customStyles}
                isOpen={openDeleteModal}
                onRequestClose={handleCloseModalDelete}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <X
                    onClick={handleCloseModalDelete}
                    style={customXStyles}
                    size={20}
                />

                <p>Tem certeza que deseja excluir esta linha?</p>
                <button style={customDeleteYes} onClick={handleDeleteProduct}>
                    Sim
                </button>
            </Modal>
            {/* end modal Delete */}
            <ul>
                <li className={s.liName}>{product.product_name}</li>
                <li className={s.liQuatity}>
                    <button className={s.tdPlus} onClick={handleIncrement}>
                        <Plus size={10} weight="bold" />
                    </button>
                    {quantity}
                    <button
                        className={s.tdSubtract}
                        onClick={handleDecrement}
                        disabled={quantity === 0}
                    >
                        <Minus size={10} />
                    </button>
                </li>
                <li className={s.liValue}>
                    R${" "}
                    {product.value.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </li>
                <li className={s.liEditDelete}>
                    <button
                        onClick={HandleOpenModalEdit}
                        className={s.buttonEdit}
                    >
                        <PencilSimpleLine size={20} />
                    </button>
                    <button
                        onClick={HandleOpenModalDelete}
                        className={s.buttonDelete}
                    >
                        <TrashSimple size={20} />
                    </button>
                </li>
            </ul>
        </div>
    );
}
