//Este componente poder ser a pagina de 'login' | 'cadastro' | 'recuperar-senha' | 'nova-senha', 
//de acordo com o type recebido

import {
    ButtonGroup, InputGroup, Box, Button, Container, Input, Quit,
    Footer, Form, Main, Header,
} from "../../styles/components/LoginCadatro.module";
import Link from 'next/link'
import ErrorMessage from "../ErrorMessage";
import { useContext, useState } from "react";
import UserService from "../../utils/services/UserService";
import { User } from "../../models/User.model";
import { motion } from "framer-motion";
//Preciso rever este customHook, acho que fiz errado
import { isPasswordValid } from '../../utils/customHooks/useFormValidator';
import Divider from "../Divider";
import { useFetch } from "../../utils/customHooks/useFetch";
import { UserContext } from "../../Contexts/UserContext";
import Cookie from "js-cookie";
import Spinner from "../Spinner";
import LoginFacebookButton from '../LoginFacebookButton';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons' 
import { useRouter } from "next/router";

interface LoginCadastroProps {
    type: 'login' | 'cadastro' | 'recuperar-senha' | 'nova-senha';
    token_reset_senha?: string;
}

export default function LoginCadastroSenha({ type, token_reset_senha }: LoginCadastroProps) {

    const { handleError, handleRes } = useFetch();
    const { setUserInfos } = useContext(UserContext);
    const router = useRouter();
    const [nome, setNome] = useState(null);
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState('');
    const [passwordError, setSenhaError] = useState(false);
    const [isFormCadastroOk, setIsFormCadastroOk] = useState(false);
    const [loading, setLoading] = useState(false);

    const emailPlaceholder = (type == 'cadastro' || type == 'login') ?
        'exemplo@dominio.com' : 'Enviaremos um email para definir sua nova senha'

    //Alem de salvar o state do senha, checa a cada 3 segundos se ele e valido
    const handlePasswordChange = (e) => {
        setSenha(e.target.value);

        if (type == 'cadastro' || type == 'nova-senha') {
            setSenhaError(!isPasswordValid(senha))
            console.log(isFormCadastroOk)
            setIsFormCadastroOk(!passwordError)
        }
    }

    const handleCadastro = () => {
        const user = new User(nome, email, senha);

        UserService.create(user)
            .then(async res => {
                const response = await res.json()     
                handleRes(res, response.message, 'email cadastrado com sucesso!', '/login');
            })
            .catch(err => handleError(err))
            .finally(() => setLoading(false));
    }

    const handleLogin = () => {
        UserService.login(email, senha)
            .then(async res => {
                const json = await res.json();
                console.log(json);
                console.log(res.ok);
                if (res.ok) {
                    Cookie.remove('access_token');
                    Cookie.set('access_token', json.token, { expires: new Date('9999-01-01') });
                    setUserInfos(
                        json.usuario.id,
                        json.usuario.nome,
                        json.usuario.email,
                        json.usuario.foto,
                        json.usuario.nivel,
                        json.usuario.quant_exercicios_feitos,
                        json.usuario.xp,
                        json.usuario.xp_para_subir_de_nivel,
                        json.usuario.doador
                        )
                        router.push("/");
                    }
                else{
                    handleRes(res, json.message);
                }
            })
            .catch(err => handleError(err))
            .finally(() => setLoading(false));
    }

    const handleRecuperarSenha = () => {
        UserService.forgotPassword(email)
            .then(res => {
                handleRes
                    (res, 'Ocorreu um erro ao enviar o email, por favor tente mais tarde!',
                        'Email de recupera????o de senha enviado!', '/');
            })
            .catch(err => handleError(err))
            .finally(() => setLoading(false));
    }
    const handleNovaSenha = () => {

        UserService.resetPassword(token_reset_senha, senha)
            .then(res => {
                handleRes
                    (res, 'Ocorreu um erro ao redefinir a senha, por favor tente mais tarde!',
                        'Senha redefinida com sucesso!', '/login')

            })
            .catch(err => handleError(err))
            .finally(() => setLoading(false));


    }

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        switch (type) {
            case 'cadastro':
                handleCadastro();
                break;
            case 'login':
                handleLogin();
                break;
            case 'recuperar-senha':
                handleRecuperarSenha();
                break;
            case 'nova-senha':
                handleNovaSenha();
                break;
        }
    }

    const handleLoginFacebook = (res) => {
        setLoading(true);
        console.log(res);
        console.log(res.email, res.id, res.nome);
        UserService.loginFacebook(res.email, res.id, res.nome)
        .then(async res =>{
            if(res.ok){
                const json = await res.json();
                Cookie.remove('access_token');
                Cookie.remove('user');
                Cookie.set('access_token', json.access_token, { expires: new Date('9999-01-01') });
                /*Cookie.set('user', JSON.stringify({
                    id:json.user.id,
                    nome:json.user.nome,
                    email:json.user.email,
                    url_img: json.user.url_img,

                }))*/
                setUserInfos(
                    json.user.id,
                    json.user.nome,
                    json.user.email,
                    json.user.url_img,
                    json.user.nivel,
                    json.user.rotinas,
                    json.user.exp,
                    json.user.exp_cap,
                    json.user.contribuidor
                )
                console.log(json);
                router.push('/');
            }
        })
        .catch(err => handleError(err))
        .finally(() => setLoading(false));
    }

    return (
        <Container>
            <Box
                as={motion.div}
                transition={{ delay: 0, duration: 0.3 }}
                variants={{
                    show: { opacity: 1, x: '0' },
                    hidden: { opacity: 0, x: '-5%' },
                }}
                initial="hidden"
                animate="show"
            >
                <Header>
                    {
                        type == 'login' ?
                            <h1>
                                Login
                            </h1>
                            :
                            type == 'cadastro' ?
                                <h1>
                                    Cadastro
                                </h1>
                                :
                                type == 'recuperar-senha' ?
                                    <h1>
                                        Recuperar senha
                                    </h1>
                                    :
                                    <h1>
                                        Nova senha
                                    </h1>

                    }
                </Header>
                <Main>
                    {
                        loading ?
                            <Spinner />
                            :
                            <Form onSubmit={handleSubmit}>

                                <InputGroup>
                                    {
                                        type == 'cadastro' &&
                                        <>
                                            <label htmlFor="nome">Nome:</label>
                                            <Input name='nome'
                                                onChange={
                                                    ({ target }) => setNome(target.value)
                                                } />
                                        </>
                                    }
                                    {
                                        (type == 'cadastro' || type == 'recuperar-senha' || type == 'login') &&
                                        <>
                                            <label htmlFor="email">Email:</label>
                                            <Input name='email'
                                                placeholder={emailPlaceholder}
                                                onChange={
                                                    ({ target }) => setEmail(target.value)
                                                } />
                                        </>
                                    }
                                    {

                                        type !== 'recuperar-senha' &&
                                        <>
                                            <label htmlFor="senha">Senha:</label>
                                            <Input type='password' name='senha' minLength={8}
                                                onChange={handlePasswordChange}
                                            />
                                        </>
                                    }
                                    {
                                        passwordError &&
                                        <ErrorMessage>A senha deve ter no m??nimo 8 caracteres!</ErrorMessage>
                                    }
                                </InputGroup>

                                <ButtonGroup>
                                    {
                                        type == 'login' ?
                                            <Button type='submit'>
                                                Login
                                    </Button>
                                            :
                                            type == 'cadastro' ?
                                                <>
                                                    <Button type='submit' disabled={!isFormCadastroOk}>
                                                        Cadastrar
                                            </Button>
                                                    <Link href='/login'>
                                                        <Quit>
                                                            Voltar
                                                </Quit>
                                                    </Link>
                                                </>
                                                :
                                                type == 'recuperar-senha' ?
                                                    <>
                                                        <Button type='submit' >
                                                            Recuperar senha
                                                </Button>
                                                        <Link href='/login'>
                                                            <Quit>
                                                                Voltar
                                                    </Quit>
                                                        </Link>
                                                    </>
                                                    :
                                                    <>
                                                        <Button type='submit' disabled={!isFormCadastroOk}>
                                                            Cadastrar nova senha
                                                </Button>
                                                    </>
                                    }
                                </ButtonGroup>
                            </Form>
                    }
                    {
                        type == 'login' && (
                            <FacebookLogin
                                appId='2938031616429769'
                                callback={handleLoginFacebook}
                                fields="nome,email,picture"
                                render={renderProps => (
                                    <LoginFacebookButton onClick={renderProps.onClick}>
                                        Login com o Facebook
                                        <FontAwesomeIcon icon={faFacebookSquare}/>
                                    </LoginFacebookButton>
                                )}
                            />
                        )
                    }
                    
                </Main>
                {
                    type == 'login' &&
                    <Footer>
                        <Link href='/cadastro'>N??o tem uma conta? Cadastre-se aqui</Link>
                        <Divider color={"var(--text)"} />
                        <Link href='/recuperar-senha'>Esqueceu a senha? Fa??a uma nova aqui</Link>
                    </Footer>
                }
            </Box>
        </Container>
    )



}

