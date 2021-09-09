//Informacoes sobre o timer do countdown
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import ChallengeService from "../utils/services/ChallengeService";
import UserService from "../utils/services/UserService";
import Toast from "../utils/Toast";
import { ChallengesContext } from "./ChallengesContext";
import { UserContext } from "./UserContext";

interface CountdownProviderProps {
    children: ReactNode;
}
interface CountdownContextData {
    time: number;
    isActive: boolean;
    hasFinished: boolean;
    minutes: number;
    seconds: number;
    startCountdown: () => void;
    resetCountdown: (type: string) => void;
    updateTimer: (newInitialTime:number) => void;
}



export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownContextProvider({ children }: CountdownProviderProps) {
    // Para eu controlar o timeout
    let countdownTimeout: NodeJS.Timeout;

    const {rotinaId, setRotina_Id, resetChallenge } = useContext(ChallengesContext);
    const {userId, xp, xpParaUpar} = useContext(UserContext);

    //Para armazenar qual deve ser o valor a retoranr com o resetCountdown
    //Vezes 60 pq são 30 minutos e não segundos
    const[initialTime, setInitialTime] = useState(1);
    const [time, setTime] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    //Pegando os minutos. Estou arredondando pra baixo, pq o resto da divisao sao os segs
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    //Para pegar cada numero dos minutos e segundos, vou passar para string e splitar.
    //Se os minutos forem menor que uma dezena, ou seja, so tem um numero, vou
    //colocar um zero na frente com padStart. Assim fica 05, por exemplo.

    //Para fazer o countdown funcionar, vou usar um useEffect que acontecera quando o isActive mudar
    //e quando o time mudar.
    //O segredo esta no time, pois vou muda-lo dentro do useEffect. Assim ele sera chamado dnv e dnv
    //ate o time ser igual a zero.

    useEffect(() => {

        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => setTime(time - 1), 1000);
        }
        else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            countdownOverAlert();
        }
    }, [isActive, time])

    const countdownOverAlert = () =>{
        //Para avisar que a rotina acabou
        new Audio('/notification.mp3').play();

        //Disparando uma notification se estiver permitido
        if(Notification.permission == 'granted'){
            new Notification('Fim da rotina! 🎉 🎉 🎉 ', {
                body: `Escolha o tipo do seu desafio.`
            })
        }
    }

    const startCountdown = () => {
        setIsActive(true);
        ChallengeService.iniciarRotina(userId)
        .then(res =>{
            console.log(res);
            setRotina_Id(res.id_rotina);
        })
        .catch(err => Toast.error(err))
    }

   
    const resetCountdown = (type: string) => {

        setIsActive(false);
        //Limpando as execucoes pendentes do timeout, para de vez o timeout
        clearTimeout(countdownTimeout);
        //Resetando o timer
        setTime(initialTime);
        //Resetando o botao
        setHasFinished(false);
        //Cancelando a rotina
        if(type == 'give_up'){
            ChallengeService.cancelarChallenge_Rotina(rotinaId);
        }
        resetChallenge();
    }

    const updateTimer = (newInitialTime: number) =>{
        //Vezes 60 pq são minutos e não segundos
        setInitialTime(newInitialTime * 60);
        setTime(newInitialTime * 60);
    }

    return (
        <CountdownContext.Provider value={{
            time,
            isActive,
            hasFinished,
            minutes,
            seconds,
            startCountdown, 
            resetCountdown,
            updateTimer
        }}>
            {children}
        </CountdownContext.Provider>
    )
}