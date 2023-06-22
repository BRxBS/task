import { PrismaClient } from "@prisma/client";
import s from "./styles.module.scss";
import { Products } from "../../testPage/page";

interface Props {
    product: Products;
}
export default function TestTable({ product }: Props) {
    return (
        <main className={s.Container}>
            <table>
                <thead>
                    <tr>
                        <th className={s.thName}>Nome</th>
                        <th className={s.thQuatity}>Quantidade</th>
                        <th className={s.thValue}>Valor</th>
                        <th className={s.thController}>Controle de estoque</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{product.product_name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.value}</td>
                        <td className={s.tdButton}>
                            <button className={s.tdPlus}>+</button>
                            <button className={s.tdSubtract}>-</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}
