import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { Container } from "../components/Container";
import Divider from "../components/Divider";
import Navbar from "../components/Navbar";
import { UserContext } from "../Contexts/UserContext";
import { ProfilePicture, ProfileInfos, Title, ConquistasTitle, ConquistasContainer, Contribuidor, EditarPerfil }
 from "../styles/pages/Perfil.module";



export default function Pefil() {

    const {contribuidor, foto, name, level, xp, rotinasFeitas} = useContext(UserContext);

    let url ='https://hajiri.co/uploads/no_image.jpg';
    if(foto != null){
        if( foto.includes('null') == false){
           url =  foto ;
        }
        else{
            url = 'https://hajiri.co/uploads/no_image.jpg'
        }
    }



    return (
        <>
            <Head>
                <title>Hora da pausa | Perfil</title>
            </Head>
            <Navbar />
            <Container style={{ alignItems: "center", position: 'relative' }} className='animeLeft'>
               {    
                   // contribuidor && <Contribuidor />
               }
                <ProfilePicture 
                    src={url}
                    alt='Foto de perfil' 
                />
                <Title>{name}</Title>
                <ProfileInfos>
                    <p>Nível {level}</p>
                    <Divider color='var(--blue-dark)' />
                    <p>{xp} pontos de experiência</p>
                    <Divider color='var(--blue-dark)' />
                    <p>{rotinasFeitas} rotinas realizadas</p>
                    <Divider color='var(--blue-dark)' />
                </ProfileInfos>
                {/**Adicionar um botão para edição de perfil, que só deve aparecer so o user do perfil é o 
                 * mesmo user que estiver logado
                 */}
                <Link href='/perfil/editar'>
                    <EditarPerfil>Editar perfil</EditarPerfil>
                </Link>
                <ConquistasTitle>Conquistas</ConquistasTitle>
                <ConquistasContainer>
                    {/** Procurar badges para conquistas no flaticon
                    */}
                </ConquistasContainer>
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