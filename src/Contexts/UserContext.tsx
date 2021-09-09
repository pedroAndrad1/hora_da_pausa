import Cookies from "js-cookie";
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
        foto: string,
        level: number,
        rotinasFeitas: number,
        xp: number,
        xpParaUpar: number,
        contribuidor: boolean) => void;
    setUserNome: (nome: string) => void;
    setUserFoto: (foto: string) => void;
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
    //Se tiver um token, tenta realizar o autologin ao iniciar a pagina
    useEffect(() =>{
        if(Cookies.get('access_token')){
            refreshUser();
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

    const setUserInfos =
        (id: number,
            name: string,
            email: string,
            foto: string,
            level: number, 
            rotinasFeitas:number, 
            xp: number,
            xpParaUpar: number,
            contribuidor: boolean) => {
            setUserId(id);
            setName(name);
            setEmail(email);
            setFoto(`${API_URL}/${foto}`);
            setLevel(level);
            setXp(xp);
            setXpParaUpar(xpParaUpar);
            setContribuidor(contribuidor);
            setRotinasFeitas(rotinasFeitas)
        }

    const setUserNome = (name: string) => {
        setName(name);
    }
    const setUserFoto = (foto: string) => {
        if(foto !== null) setFoto(`${API_URL}/${foto}`);
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

    const refreshUser = () => {
        UserService.refreshUser()
            .then(res => {
                console.log(res)
                setUserInfos(
                    res.id,
                    res.nome,
                    res.email,
                    res.url_img,
                    res.nivel,
                    res.rotinas,
                    res.exp,
                    res.exp_cap,
                    res.contribuiu
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