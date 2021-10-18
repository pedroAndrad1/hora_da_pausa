import { useContext} from "react";
import { CountdownContext } from "../../Contexts/CountdownContext";
import { CountdownButtonStart, CountdownContainer, CountdownButtonGiveUp } from "../../styles/components/Countdown.module";

//THE FINAL COUNTDOWN !!!! TU RU TU.. TU RU TU RU TU TU...

export default function Countdown() {

    const {
        minutes,
        seconds,
        hasFinished,
        isActive,
        resetCountdown,
        startCountdown,
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');



    return (
        <>
            <CountdownContainer >
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </CountdownContainer>
            {

                hasFinished ?
                    <CountdownButtonGiveUp disabled >
                        Ciclo terminado
                    </CountdownButtonGiveUp>
                    :
                    isActive ?
                        <CountdownButtonGiveUp onClick={resetCountdown}>
                            Abandonar ciclo
                        <img src='icons/close.svg' alt='x' />
                        </CountdownButtonGiveUp>
                        :
                        <CountdownButtonStart onClick={startCountdown}>
                            Iniciar ciclo
                    </CountdownButtonStart>
            }
        </>
    )
}