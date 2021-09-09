import { GetServerSideProps } from "next";
import Head from "next/head";
import { Container } from "../components/Container";
import Navbar from "../components/Navbar";


export default function Estatistica() {


  return (
    <>
      <Head>
        <title>Hora da pausa | Estatísticas</title>
      </Head>
      <Navbar />
      <Container>
      </Container>
    </>
  )
}

//PRECISA TER ESSE FORMATO E NOME

//Essa function ocorrera no servidor Next que intermedia o front com o back.
//Como isso ocorre antes de renderizar a page, e otimo para fazer requisicoes
//para api's. Assim o conteudo estara disponivel na renderizacao da pagina e  
//crawlers indexadores poderam ver o conteudo requisitado.
export const getServerSideProps: GetServerSideProps = async (context) => {

  const { authorized } = context.req.cookies;

  //Verifica se o user tem o cookie que indica que ele esta logado, se nao, e mandando para tela de login
  /*if(!authorized){
    return{
      redirect:{
        destination:'/login',
        permanent: false,
      }
    }
  }*/


  return {
    props: {}
  }
}