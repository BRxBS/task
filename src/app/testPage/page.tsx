"use client";
import Header from "../components/header";
import InputsPost from "../components/inputsPost";
import TableRows from "../components/tableRows";
import { useContext, useEffect, useState } from "react";
import { TheContext } from "../context/FetchContext";
import { fetchProducts } from "../components/renderTable";
import { CaretDown, CaretUp } from "phosphor-react";

import s from "./styles.module.scss";
import "./styles/style.css";

export interface Products {
    id: number;
    product_name: string;
    quantity: number;
    value: number;
}

export default function Test() {
    const { productState } = useContext(TheContext);
    const [products, setProducts] = useState<Products[]>([]);
    const [active, setActive] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const fetchedProducts = await fetchProducts();
            setProducts(fetchedProducts);
        }
        fetchData();
    }, [productState]);

    const handleSortAscendingNumbers = () => {
        const sortedProducts = [...products].sort((a, b) => a.value - b.value);
        setProducts(sortedProducts);
        setActive(true);
    };
    const handleSortDescendingNumbers = () => {
        const sortedProducts = [...products].sort((a, b) => b.value - a.value);
        setProducts(sortedProducts);
        setActive(true);
    };
    const handleSortAscendingLetters = () => {
        const sortedProducts = [...products].sort((a, b) =>
            a.product_name.localeCompare(b.product_name)
        );
        setProducts(sortedProducts);
        setActive(true);
    };
    const handleSortDescendingLetters = () => {
        const sortedProducts = [...products].sort((a, b) =>
            b.product_name.localeCompare(a.product_name)
        );
        setProducts(sortedProducts);
        setActive(true);
    };
    const handleNoFilters = () => {
        const sortedProducts = [...products].sort((a, b) => b.id - a.id);
        setProducts(sortedProducts);
        setActive(false);
    };

    return (
        <>
            <Header />
            <main className={s.mainContainer}>
                <div className={s.content}>
                    <div className={s.wrapper}>
                        <div className={s.inputContainer}>
                            <InputsPost />
                        </div>
                        <>
                            <div className={s.noFilters}>
                                {active ? (
                                    <button onClick={handleNoFilters}>
                                        Limpar Filtros
                                    </button>
                                ) : (
                                    <span> </span>
                                )}
                            </div>
                            <div className={s.tableContainer}>
                                <div className={s.tableWrapper}>
                                    <ul className={s.ul}>
                                        <li className={s.liName}>
                                            Nome
                                            <div
                                                className={s.filterNameWrapper}
                                            >
                                                <CaretUp
                                                    onClick={
                                                        handleSortAscendingLetters
                                                    }
                                                    className={s.CaretUp}
                                                />
                                                <br />
                                                <CaretDown
                                                    onClick={
                                                        handleSortDescendingLetters
                                                    }
                                                    className={s.CaretDown}
                                                />
                                            </div>
                                        </li>
                                        <li className={s.liQuatity}>
                                            Quantidade
                                        </li>
                                        <li className={s.liValue}>
                                            Valor
                                            <div className={s.filterWrapper}>
                                                <CaretUp
                                                    onClick={
                                                        handleSortAscendingNumbers
                                                    }
                                                    className={s.CaretUp}
                                                />
                                                <br />
                                                <CaretDown
                                                    onClick={
                                                        handleSortDescendingNumbers
                                                    }
                                                    className={s.CaretDown}
                                                />
                                            </div>
                                        </li>
                                        <li className={s.liEditDelete}>
                                            <span> Editar </span>{" "}
                                            <span>Excluir </span>
                                        </li>
                                    </ul>

                                    {products?.map((product) => (
                                        <TableRows
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            </main>
        </>
    );
}
