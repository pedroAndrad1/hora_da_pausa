//Decide qual o tempo do timer

import { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { CountdownContext } from '../../Contexts/CountdownContext';

const TimeContainer = styled.div`
    display: flex;
    margin-bottom: 1.5rem;
    justify-content: space-between;
`

const Choices = styled.div`
    font-size: 1.25rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    
    & button:nth-child(2){
        margin: 0 1rem;
    }
`
const Title = styled.span`
    color: var(--text);
`

interface TimeButtonProps{
    backgroundColor: string;
    active: boolean;
}
const TimeButton = styled.button<TimeButtonProps>`
    height: 3rem;
    width: 3rem;
    border: 0;
    border-radius: 50%;
    color:var(--white);
    cursor:'pointer';

    ${
        ({backgroundColor}) => {
            return css`
                background: ${backgroundColor};
            `
        }
    }

    ${
        ({active}) => 
            active && css`filter:brightness(1.5);`
        
    }

    &:hover{
       filter:brightness(1.5)
    }


`
export default function TimeSelect() {

    //Vou atualizar o valor do timer no CountdownContext
    const { updateTimer, isActive } = useContext(CountdownContext);

    //Nao achei um jeito de fazer isso so com css. Nao gosto dessa solucao, mas vai ser isso por agora
    const [activeButton30, setActiveButton30] = useState(true);
    const [activeButton45, setActiveButton45] = useState(false);
    const [activeButton60, setActiveButton60] = useState(false);

    //Lida com as mudanças noS BUTTONS
    const handleSubmit = (event) => {
        event.preventDefault();
        
        //Sim, isso e muito deselegante. Preciso ver como mudar dps
        if(!isActive){
            updateTimer(event.target.value)
            switch(event.target.value){
                case "30":
                    setActiveButton30(true);
                    setActiveButton45(false);
                    setActiveButton60(false);
                    break;
                case "45":
                    setActiveButton30(false);
                    setActiveButton45(true);
                    setActiveButton60(false);
                    break;
                case "60":
                    setActiveButton30(false);
                    setActiveButton45(false);
                    setActiveButton60(true);
                    break;
            }
        }

    }

    return (
        <TimeContainer>
            <Title>Decida o tempo da rotina</Title>
            <Choices>
                <TimeButton value={30} onClick={handleSubmit} backgroundColor="#000066" 
                    active={activeButton30}>
                    30
                </TimeButton>
                <TimeButton value={45} onClick={handleSubmit} backgroundColor="#993d00"
                    active={activeButton45}> 
                    45
                </TimeButton>
                <TimeButton value={60} onClick={handleSubmit} backgroundColor="#b30000"
                     active={activeButton60}>
                    60
                </TimeButton>
            </Choices>
        </TimeContainer>
    )

}