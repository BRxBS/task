import { PrismaClient } from "@prisma/client";
import Header from "../components/header";
import InputsPost from "../components/inputsPost";
import TableRows from "../components/tableRows";
import s from "./styles.module.scss";
import "./style.css";
import RenderTable from "../components/renderTable";

export interface Products {
    id: number;
    product_name: string;
    quantity: number;
    value: number;
}

const prisma = new PrismaClient();

async function fetchProducts(): Promise<Products[]> {
    const products = await prisma.products.findMany({
        select: {
            id: true,
            product_name: true,
            quantity: true,
            value: true,
        },
        orderBy: {
            id: "desc",
        },
    });

    return products;
}
export default async function Test() {
    const products = await fetchProducts();

    return (
        <>
            <Header />
            <main className={s.mainContainer}>
                <div className={s.content}>
                    <div className={s.wrapper}>
                        <div className={s.inputContainer}>
                            <InputsPost />
                        </div>
                        <div className={s.tableContainer}>
                            <div className={s.tableWrapper}>
                                <ul className={s.ul}>
                                    <li className={s.liName}>Nome</li>
                                    <li className={s.liQuatity}>Quantidade</li>
                                    <li className={s.liValue}>Valor</li>
                                    {/* <li className={s.liController}>
                                    Controle de estoque{" "}
                                </li> */}
                                    <li className={s.liEditDelete}>
                                        <span> Editar </span>{" "}
                                        <span>Excluir </span>
                                    </li>
                                </ul>

                                <RenderTable />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
