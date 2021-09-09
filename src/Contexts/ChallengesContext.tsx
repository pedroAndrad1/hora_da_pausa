//Informacoes compartilhadas sobre os desafios e rotinas por todos os components
import Cookies from "js-cookie";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import challenges from '../../challenges.json';
import LevelUpModal from "../components/LevelUpModal";
import Challenge from "../models/Challenge.model";
import { Level } from "../styles/components/Profile.module";
import ChallengeService from "../utils/services/ChallengeService";
import UserService from "../utils/services/UserService";
import Toast from "../utils/Toast";
import { CountdownContext } from "./CountdownContext";
import { UserContext } from "./UserContext";

export const ChallengesContext = createContext({} as ChallengesContextData);

//Para ficar explicito e ajudar com auto complete nos lugares que usarem esse context, 
//porem funciona sem isso abaixo.

//Para definir que o children sera um component. 
interface ChallengesProviderProps {
    children: ReactNode;
}
interface ChallengesContextData {
    activeChallenge: Challenge;
    startNewChallenge: (type: string) => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
    setRotina_Id: (id: number) => void;
    rotinaId: number;
    loadingChallenge: boolean;
}


export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {

    //?? para caso nao tenha, coloque aquele valor
    const [rotinaId, setRotinaId] = useState(null);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalActive, setIsLevelUpModalActive] = useState(false);
    const [loadingChallenge, setLoadingChallenge] = useState(false);
    //const experienceToNextLevel = Math.pow( (level + 1) * 4 , 2)
    const {userId, xp, xpParaUpar, setUserXp, rotinasFeitas, setUserRotinasFeitas, refreshUser} = useContext(UserContext);
    const {resetCountdown} = useContext(CountdownContext);
    //Pedindo permissao para fazer notificacoes assim que carrega a app ao carregar a app
    useEffect(() => {
        Notification.requestPermission();
    }, [])

    //Salva o level, currentExperience, challengesCompleted em um cookie para fazer a persistencia
    //dos dados, sempre que um desses states mudarem. 
    //Essa vai ser uma forma provisoria e no futuro vou buscar um back-end para tal.
    //useEffect(() => {
        //Cookies.set('level', String(level), {expires: new Date('9999-01-01')} );
        //Cookies.set('currentExperience', String(currentExperience), {expires: new Date('9999-01-01')} );
        //Cookies.set('challengesCompleted', String(challengesCompleted), {expires: new Date('9999-01-01')} );
    //}, [])

    const setRotina_Id = id => {
        setRotinaId(Number(id));
    }

    const levelUp = () => {
        //UserService.userLevelUp(userId)
        refreshUser();
        setIsLevelUpModalActive(true)
       
    }

    const closeLevelUpModal = () => {
        setIsLevelUpModalActive(false);
    }

    const startNewChallenge = (type: string) => {
        setLoadingChallenge(true);
        ChallengeService.getChallenge(type)
            .then(res => {
                setActiveChallenge(
                    new Challenge(res.exercicio.type, res.exercicio.description, res.exercicio.amount,
                        res.exercicio.id)
                )

            })
            .catch(err =>{
                Toast.error(err.message);
            })
            .finally(() => setLoadingChallenge(false));
    }

    const resetChallenge = () => {
        setActiveChallenge(null);
        //ChallengeService.cancelarChallenge_Rotina(rotinaId,user.id)
    }

    const completeChallenge = () => {
        const { amount } = activeChallenge;

        ChallengeService.confirmaChallenge(rotinaId, userId, amount)
        .then( res=>{
            console.log(res);
            let finalExperience = xp + amount;
     
             //Se a experiencia final depois do challenge foi maior que a experiencia para o proximo
             //nivel. A experiencia final deve ser diminuida da experiencia pra upar e deve-se upar
             if(finalExperience >= xpParaUpar){
                 finalExperience = finalExperience - xpParaUpar;
                 levelUp();
             }
                   
             setUserRotinasFeitas(rotinasFeitas + 1);
             setUserXp(finalExperience);
             setActiveChallenge(null);
        })
        .catch(err => Toast.error(err));


    }

    return (
        <ChallengesContext.Provider value={
            {
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,
                setRotina_Id,
                rotinaId,
                loadingChallenge
            }
        }>
            {children}
            {
                isLevelUpModalActive && <LevelUpModal />
            }
        </ChallengesContext.Provider>
    )
}