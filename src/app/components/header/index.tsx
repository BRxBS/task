import Image from "next/image";
import s from "./styles.module.scss";
import icon from "../../../../public/iconTask.png";

export default function Header() {
    return (
        <div className={s.Container}>
            <Image alt="" src={icon} />
        </div>
    );
}
