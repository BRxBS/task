import Image from "next/image";
import s from "./styles/loading.module.scss";
import icon from "../../../public/iconTaskBlue.png";

export default function Loading() {
    return (
        <main className={s.mainContainerLoading}>
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
            </div>
        </main>
    );
}
