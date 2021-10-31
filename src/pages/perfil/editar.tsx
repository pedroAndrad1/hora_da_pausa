import { GetServerSideProps } from "next";
import Head from "next/head";
import { useContext, useState } from "react";
import { Container } from "../../components/Container";
import Divider from "../../components/Divider";
import Navbar from "../../components/Navbar";
import { UserContext } from "../../Contexts/UserContext";
import { Form, Input, InputGroup } from "../../styles/components/LoginCadatro.module";
import { ProfilePicture, ProfileInfos, ConquistasTitle, ConquistasContainer, Contribuidor }
    from "../../styles/pages/Perfil.module";
import { Title, Button } from '../../styles/pages/EditarPerfil.module'
import UserService from "../../utils/services/UserService";
import Spinner from "../../components/Spinner";
import { useRouter } from "next/router";


export default function EditarPerfil() {

    const { contribuidor, foto, name, level, xp, rotinasFeitas, userId, refreshUser } 
    = useContext(UserContext);
    const router = useRouter();
    const [img, setImg] = useState(null);
    const [nome, setNome] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('foto', img);


        UserService.update(formData)
            .then(async res => {
                const json = await res.json();
                console.log(res);
                console.log(json)
            })
            .then(() =>{
                refreshUser();
                // Esse timeout esta aqui pq nao estou conseguindo sincronizar a mudanca da page
                // com a mudanca dos atributos do user
                setTimeout( ()=> {
                    router.push('/');
                    setLoading(false)
                }, 2000 )
            })
    }

    return (
        <>
            <Head>
                <title>Hora da pausa | Editar Perfil</title>
            </Head>
            <Navbar />
            <Container style={{ alignItems: "center", position: 'relative', background: 'var(--white)', height: '100vh' }}
                className='animeLeft'>
                <header>
                    <Title>{loading ? 'Editando perfil, por favor aguarde' : 'Editar perfil'}</Title>
                </header>
                <main>
                    {
                        loading ?
                            <Spinner />
                            :
                            <Form onSubmit={handleSubmit}>
                                <label>Foto de perfil:</label>
                                <Input type='file' onChange={e => setImg(e.target.files[0])} />

                                <label>Nome:</label>
                                <Input onChange={e => setNome(e.target.value)} />

                                <Button type='submit'>Editar</Button>
                            </Form>
                    }
                </main>
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