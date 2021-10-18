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
    completeChallenge: (countdownTime: number) => void;
    closeLevelUpModal: () => void;
    loadingChallenge: boolean;
}


export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    // ?? = para caso nao tenha, coloque aquele valor
    const [activeChallenge, setActiveChallenge] = useState<Challenge>(null);
    const [isLevelUpModalActive, setIsLevelUpModalActive] = useState(false);
    const [loadingChallenge, setLoadingChallenge] = useState(false);
    const {userId, refreshUser} = useContext(UserContext);
    const {resetCountdown} = useContext(CountdownContext);
    //Pedindo permissao para fazer notificacoes assim que carrega a app ao carregar a app
    useEffect(() => {
        Notification.requestPermission();
    }, [])

  

    const closeLevelUpModal = () => {
        setIsLevelUpModalActive(false);
    }

    const startNewChallenge = (type: string) => {
        setLoadingChallenge(true);
        ChallengeService.getChallenge(type)
            .then(res => {
                console.log(res[0]);
                setActiveChallenge(
                    new Challenge(res[0].tipo_exercicio, res[0].descricao, res[0].xp,
                        res[0].id)
                )

            })
            .catch(err =>{
                Toast.error(err.message);
            })
            .finally(() => setLoadingChallenge(false));
    }

    const resetChallenge = () => {
        setActiveChallenge(null);
    }

    const completeChallenge = (countdownTime: number) => {
        console.log("tempo!", countdownTime)
        ChallengeService.confirmaChallenge(userId, activeChallenge.id , countdownTime)
        .then( async res => {
            if(res.levelUp) setIsLevelUpModalActive(true)

            refreshUser();
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
                loadingChallenge,
            }
        }>
            {children}
            {
                isLevelUpModalActive && <LevelUpModal />
            }
        </ChallengesContext.Provider>
    )
}