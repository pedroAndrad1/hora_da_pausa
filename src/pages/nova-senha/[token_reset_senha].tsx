import { GetServerSideProps } from "next";
import Head from "next/head";
import LoginCadastroSenha from "../../components/LoginCadastroSenha";

export default function NovaSenha(props) {

    
    return (
        <>
            <Head>
                <title>Hora da pausa | Nova senha</title>
            </Head>
            <LoginCadastroSenha type='nova-senha' token_reset_senha={props.token_reset_senha}/>
        </>
    )
}

//Essa function ocorrera no servidor Next que intermedia o front com o back.
//Como isso ocorre antes de renderizar a page, e otimo para fazer requisicoes
//para api's. Assim o conteudo estara disponivel na renderizacao da pagina e  
//crawlers indexadores poderam ver o conteudo requisitado.

//Vou pegar os parametros da rota aqui
export const getServerSideProps: GetServerSideProps = async (context) => {

    return {
        props:{
            token_reset_senha: context.params.token_reset_senha
        }
    }
}
