import Head from "next/head";
import LoginCadastroSenha from "../components/LoginCadastroSenha";

export default function Cadastro() {
    return (
        <>
            <Head>
                <title>Hora da pausa | Recuperar-senha</title>
            </Head>
            <LoginCadastroSenha type='recuperar-senha' />
        </>
    )
}