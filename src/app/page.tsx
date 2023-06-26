import Image from "next/image";
import s from "./styles/page.module.scss";
import Link from "next/link";
import Head from "next/head";
import LogoTask from "./components/logo";

export default function Home() {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
                    rel="stylesheet"
                ></link>
            </Head>

            <main className={s.mainContainer}>
                <div className={s.content}>
                    <LogoTask />
                </div>
            </main>
        </>
    );
}
