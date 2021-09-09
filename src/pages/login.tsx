import Head from "next/head";
import LoginCadastroSenha from "../components/LoginCadastroSenha";

export default function Login() {
    return (
        <>
            <Head>
                <title>Hora da pausa | Login</title>
            </Head>
            <LoginCadastroSenha type='login' />
        </>
    )
}