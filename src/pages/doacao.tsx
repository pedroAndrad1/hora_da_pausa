import { GetServerSideProps } from "next";
import Head from "next/head";
import { useContext, useState } from "react";
import { Container } from "../components/Container";
import Divider from "../components/Divider";
import Navbar from "../components/Navbar";
import { UserContext } from "../Contexts/UserContext";
import { Form, Input, InputGroup } from "../styles/components/LoginCadatro.module";
import { ProfilePicture, ProfileInfos, ConquistasTitle, ConquistasContainer, Contribuidor }
    from "../styles/pages/Perfil.module";
import { Title, Button } from '../styles/pages/EditarPerfil.module'
import UserService from "../utils/services/UserService";
import Spinner from "../components/Spinner";
import { useRouter } from "next/router";
import Toast from "../utils/Toast";



export default function Doacao() {

    const [loading, setLoading] = useState(false);
    const [CPF, setCPF] = useState(null);
    const [valor, setValor] = useState(null);
    const validarCPF = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/;
    const validarValor = /^[1-9]\d*$/gm;
    const { userId, name } = useContext(UserContext);
    const router = useRouter();

    const handleSubmit = e => {
        e.preventDefault();
        const cpfCond = validarCPF.test(CPF);
        const valCond = validarValor.test(valor)

        if (!cpfCond) Toast.error('CPF inválido');
        if (!valCond) Toast.error('Apenas é aceito valores positivos !');


        if (cpfCond && valCond) {
            setLoading(true);
            UserService.doacao(userId, name, valor, CPF)
                .then(
                    async res => {
                        console.log(res);
                        router.push(res.paymentUrl);
                        // await UserService.getSolicitacaoPagamento(res.referenceId)
                        //     .then(res => {
                        //         console.log(res);
                        //         router.push(res.paymentUrl);
                        //     });
                    }
                )
                .finally(() => setLoading(false));
        }

    }

    return (
        <>
            <Head>
                <title>Hora da pausa | Doação</title>
            </Head>
            <Navbar />
            <Container style={{ alignItems: "center", position: 'relative', background: 'var(--white)', height: '100vh' }}
                className='animeLeft'>
                <header>
                    <Title style={{ textAlign: "center", padding: '0 1rem' }}>
                        {loading ?
                            'Redirecionando para o picpay, por favor aguarde'
                            : 'Muito obrigado pela doação! Sua ajuda é muito importante para nós.'}
                    </Title>
                </header>
                <main>
                    {
                        loading ?
                            <Spinner />
                            :
                            <Form onSubmit={handleSubmit}>
                                <label>CPF:</label>
                                <Input type='text' onChange={e => setCPF(e.target.value)} required />

                                <label>Valor:</label>
                                <Input
                                    type='text'
                                    onChange={e => setValor(Number(e.target.value))}
                                    required
                                />

                                <Button type='submit'>Doar</Button>
                            </Form>
                    }
                </main>
            </Container>
        </>
    )
}