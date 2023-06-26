import icon from "../../../../public/logoTask.png";
import Image from "next/image";
import s from "./styles.module.scss";
import Link from "next/link";

export default function LogoTask() {
    return (
        <main className={s.mainContainer}>
            <div className={s.content}>
                <div className={s.imageAnimationContainer}>
                    <div className={s.animationContainer}>
                        <div className={s.border}></div>
                        <div className={s.sunContainer}>
                            <div className={s.sun}>
                                <div className={s.earthContainer}>
                                    <div className={s.earth}>
                                        <div className={s.moonContainer}>
                                            <div className={s.moon}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Image alt="" src={icon} />
                </div>
                <div className={s.linkContainer}>
                    <Link href={"/testPage"}>Acessar Teste</Link>
                </div>
            </div>
        </main>
    );
}
