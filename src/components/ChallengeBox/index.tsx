import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../../Contexts/ChallengesContext';
import { CountdownContext } from '../../Contexts/CountdownContext';
import {
    BodyChallenge,
    ChallengeBoxActive, ChallengeBoxContainer, ChallengeBoxNotActive, ChooseChallengeTypeContainer, EyeChallenge, FailedButton,
    SucceedButton
}
    from '../../styles/components/ChallengeBox.module';
import Spinner from '../Spinner';

export default function ChallengeBox() {

    const { activeChallenge, resetChallenge, completeChallenge, startNewChallenge, loadingChallenge}
     = useContext(ChallengesContext);
    const { resetCountdown, hasFinished, initialTime } = useContext(CountdownContext);
    const [choosingChallengeType, setChoosingChallengeType] = useState(false);

    //Sempre que o hasFinished mudar de false para true, quer dizer que o timer zerou e devo ir para a
    //tela de escolha do type do desafio
    useEffect(() => {
        if (hasFinished) setChoosingChallengeType(true);
    }, [hasFinished])

    const handleSucceed = () => {
        completeChallenge(initialTime);
        resetCountdown();
    }
    const handleFailed = () => {
        //Coloquei essa funcao no resetCountdown pra cancelar a rotina so uma vez
        //resetChallenge();
        resetCountdown();
    }

    const handleChooseType = (event) => {
        setChoosingChallengeType(false);
        startNewChallenge(event.target.value);
    }

    return (
        <ChallengeBoxContainer>
            {
                (!choosingChallengeType && !activeChallenge && !loadingChallenge) &&

                <ChallengeBoxNotActive>
                    <strong>
                        Finalize um ciclo para receber um desafio!
                         </strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level up" />
                            Avance de level completando desafios!
                        </p>
                </ChallengeBoxNotActive>

            }
            {
                loadingChallenge && 
                <Spinner/>
            }
            {
                choosingChallengeType &&

                <ChooseChallengeTypeContainer>
                    <header>Escolha um tipo de exercício como desafio dessa rotina!</header>
                    <main>
                        <EyeChallenge onClick={handleChooseType} value='olhos'>
                            Exercício para Olhos
                         </EyeChallenge>
                        <BodyChallenge onClick={handleChooseType} value='corpo'>
                            Exercício para Corpo
                    </BodyChallenge>
                    </main>
                    <footer>
                        <FailedButton>
                            Sair do ciclo
                        </FailedButton>
                    </footer>
                </ChooseChallengeTypeContainer>
            }
            {
                activeChallenge &&
                <ChallengeBoxActive>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img
                            src={`icons/${activeChallenge.type}.svg`}
                            alt="Ícone de um olho ou punho segurando um altere"
                        />
                        <strong>Novo desafio!</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <SucceedButton onClick={handleSucceed}>
                            Fiz o exercício
                           </SucceedButton>
                        <FailedButton onClick={handleFailed}>
                            Não fiz o exercício
                           </FailedButton>
                    </footer>
                </ChallengeBoxActive>
            }
        </ChallengeBoxContainer>
    )
}