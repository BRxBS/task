import Image from "next/image";
import s from "./styles.module.scss";
import icon from "../../../../public/task.webp";
import Link from "next/link";

export default function Header() {
    return (
        <div className={s.Container}>
            <Link href={"/"}>
                <Image alt="" src={icon} />
            </Link>
        </div>
    );
}
