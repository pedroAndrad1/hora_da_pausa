import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { Container } from "../components/Container";
import Navbar from "../components/Navbar";
import {
    Nav, NavItem, Table, Main, Photo, NavTableContainer, LeftArrow,
    RightArrow, ArrowsContainer, Th, Tr, Td
} from "../styles/pages/Ranking.module";


const dataTeste = [
    {
        posição: 'Teste',
        nome: 'Teste de andrade asaffasfasfg',
        rotinas: 13,
        xp: 500
    },
    {
        posição: 'Teste',
        nome: 'Teste',
        rotinas: 13,
        xp: 500
    },
    {
        posição: 'Teste',
        nome: 'Teste',
        rotinas: 13,
        xp: 500
    },
    {
        posição: 'Teste',
        nome: 'Teste',
        rotinas: 13,
        xp: 500
    },
    {
        posição: 'Teste',
        nome: 'Teste',
        rotinas: 13,
        xp: 500
    },
    {
        posição: 'Teste',
        nome: 'Teste',
        rotinas: 13,
        xp: 500
    },
    {
        posição: 'Teste',
        nome: 'Teste',
        rotinas: 13,
        xp: 500
    },
    {
        posição: 'Teste',
        nome: 'Teste',
        rotinas: 13,
        xp: 500
    },
    {
        posição: 'Teste',
        nome: 'Teste',
        rotinas: 13,
        xp: 500
    },
    {
        posição: 'Teste',
        nome: 'Teste',
        rotinas: 13,
        xp: 500
    },
    {
        posição: 'Teste',
        nome: 'Teste',
        rotinas: 13,
        xp: 500
    },
    {
        posição: 'Teste',
        nome: 'Teste',
        rotinas: 13,
        xp: 500
    },
]



export default function Estatistica() {

    const [activeSemanal, setActiveSemanal] = useState(true);
    const [activeMensal, setActiveMensal] = useState(false);
    const [activeGeral, setActiveGeral] = useState(false);

    const apagaTodosBotoes = () => {
        setActiveSemanal(false);
        setActiveMensal(false);
        setActiveGeral(false);
    }

    const handleClick = (event) => {

        apagaTodosBotoes();
        switch (event.target.id) {
            case 'Semanal':
                setActiveSemanal(true);
                break;
            case 'Mensal':
                setActiveMensal(true);
                break;
            case 'Geral':
                setActiveGeral(true);
                break;
        }
    }

    return (
        <>
            <Head>
                <title>Hora da pausa | Ranking</title>
            </Head>
            <Navbar />
            <Container>
                <Nav as={motion.nav}
                    transition={{ delay: 0, duration: 0.3 }}
                    variants={{
                        show: { opacity: 1 },
                        hidden: { opacity: 0 },
                    }}
                    initial="hidden"
                    animate="show"
                >
                    <NavItem active={activeSemanal} id='Semanal' onClick={handleClick}>
                        Semanal
                    </NavItem>
                    <NavItem active={activeMensal} id='Mensal' onClick={handleClick}>
                        Mensal
                 </NavItem>
                    <NavItem active={activeGeral} id='Geral' onClick={handleClick}>
                        Geral
                 </NavItem>
                </Nav>
                <Main className='animeLeft'>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Posição</Th>
                                <Th responsive>Nome</Th>
                                <Th>Foto</Th>
                                <Th>Xp</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataTeste.map((element, i) => {
                                    return (
                                        <Tr key={`${i}_ranking`}>
                                            <Td>{i + 1}</Td>
                                            <Td responsive>{element.nome}</Td>
                                            <Td>
                                                <Photo
                                                    src='https://hajiri.co/uploads/no_image.jpg'
                                                    alt='Foto de perfil'
                                                />
                                            </Td>
                                            <Td>{element.xp}</Td>
                                        </Tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <NavTableContainer>
                        <ArrowsContainer>
                            <LeftArrow />
                            <p>Página 1/50</p>
                            <RightArrow />
                        </ArrowsContainer>
                        <a>Ir para a sua posição</a>
                    </NavTableContainer>
                </Main>
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