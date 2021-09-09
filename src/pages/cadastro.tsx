import Head from "next/head";
import LoginCadastroSenha from "../components/LoginCadastroSenha";


export default function Cadastro() {
    return (
        <>
            <Head>
                <title>Hora da pausa | Cadastro</title>
            </Head>
            <LoginCadastroSenha type='cadastro' />
        </>
    )
}