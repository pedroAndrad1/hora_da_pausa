import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../models/User.model";
import UserService from "../utils/services/UserService";
import Toast from "../utils/Toast";
//Infos do usuario logado. Disponivel para TODOS OS COMPONENTS DO SISTEMA

interface UserContextProps {
    children: ReactNode;
}

interface UserContextData {
    setUserInfos:
    (id: number,
        nome: string,
        email: string,
        foto: any,
        level: number,
        rotinasFeitas: number,
        xp: number,
        xpParaUpar: number,
        contribuidor: boolean) => void;
    setUserNome: (nome: string) => void;
    setUserFoto: (foto: any) => void;
    setUserLevel: (level: number) => void;
    setUserRotinasFeitas: (rotinasFeitas: number) => void;
    setUserXp: (xp: number) => void;
    setUserXpParaUpar: (xpParaUpar: number) => void;
    userId: number;
    name: string;
    email: string;
    foto: string;
    rotinasFeitas: number;
    level: number;
    xp: number;
    xpParaUpar: number;
    contribuidor: boolean;
    refreshUser: () => void;
    getPhoto: Function;
    logado: boolean
}


export const UserContext = createContext({} as UserContextData);

export const UserContextProvider = ({ children }: UserContextProps) => {

    const router = useRouter();

    //Se tiver um token, tenta realizar o autologin ao iniciar a pagina
    useEffect( () =>{
        if(Cookies.get('access_token')){
            autoLogin();
        }
    }, []);

    const API_URL = process.env.NEXT_PUBLIC_API;
    const [userId, setUserId] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [foto, setFoto] = useState(null);
    const [rotinasFeitas, setRotinasFeitas] = useState(0);
    const [level, setLevel] = useState(null);
    const [xp, setXp] = useState(null);
    const [xpParaUpar, setXpParaUpar] = useState(null);
    const [contribuidor, setContribuidor] = useState(null);
    const [logado, setLogado] = useState(false);
    //const [isLevelUpModalActive, setIsLevelUpModalActive] = useState(false);

    const autoLogin = async () =>{
        UserService.refreshUser()
        .then(async res => {
            const response = await res.json();
            if(res.ok) {
                setUserInfos(
                    response.id,
                    response.nome,
                    response.email,
                    response.foto,
                    response.nivel,
                    response.quant_exercicios_feitos,
                    response.xp,
                    response.xp_para_subir_de_nivel,
                    response.doador
                )
                setLogado(true);
            }
            else{
                router.push("/login");
            }
        })
        .catch(err => Toast.error(err));
    }

    const setUserInfos =
        (id: number,
        name: string,
        email: string,
        foto: any,
        level: number, 
        rotinasFeitas:number, 
        xp: number,
        xpParaUpar: number,
        contribuidor: boolean) => {

            setUserId(id);
            setName(name);
            setEmail(email);
            setLevel(level);
            setXp(xp);
            setXpParaUpar(xpParaUpar);
            setContribuidor(contribuidor);
            setRotinasFeitas(rotinasFeitas)
            setUserFoto(foto);
        }

    const setUserNome = (name: string) => {
        setName(name);
    }
    const setUserFoto = (foto: any) => {     
        if(foto){
            //E necessario converter o Buffer que vem da API 
            const {data} = foto;
            const img =  Buffer.from(data).toString("base64");
            setFoto("data:image/png;base64," + img);
        }
    }
    const setUserLevel = (level: number) => {
        setLevel(level);
    }
    const setUserRotinasFeitas = (rotinasFeitas: number) => {
        setRotinasFeitas(rotinasFeitas);
    }
    const setUserXp = (xp: number) => {
        setXp(xp);
    }

    const setUserXpParaUpar = (xpParaUpar: number) => {
        setXpParaUpar(xpParaUpar)
    }

    const getPhoto = async () =>{
      /* return await UserService.GetPhoto(foto)
                                .then(async res =>{
                                    const json = await res.json();
                                    console.log(json)
                                });
                                */
    }

    const refreshUser = async () => {
       await UserService.refreshUser()
            .then(async res => {
                console.log(res)
                const json = await res.json();
                setUserInfos(
                    json.id,
                    json.nome,
                    json.email,
                    json.foto,
                    json.nivel,
                    json.quant_exercicios_feitos,
                    json.xp,
                    json.xp_para_subir_de_nivel,
                    json.doador
                )
                setLogado(true);
            })
            .catch(err => Toast.error(err));
    }

    return (

        <UserContext.Provider value={{
            userId,
            contribuidor,
            email,
            foto,
            level,
            name,
            rotinasFeitas,
            xp,
            xpParaUpar,
            setUserInfos,
            setUserNome,
            setUserFoto,
            setUserLevel,
            setUserRotinasFeitas,
            setUserXp,
            setUserXpParaUpar,
            refreshUser,
            getPhoto,
            logado
        }}>
            {children}
        </UserContext.Provider>

    )


}