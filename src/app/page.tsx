import Image from "next/image";
import s from "./styles/page.module.scss";
import icon from "../../public/iconTask.png";
import Link from "next/link";

export default function Home() {
    return (
        <main className={s.mainContainer}>
            <div className={s.content}>
                <Image alt="" src={icon} />
                <div className={s.linkContainer}>
                    <Link href={"/testPage"}>Acessar Teste</Link>
                </div>
            </div>
        </main>
    );
}
