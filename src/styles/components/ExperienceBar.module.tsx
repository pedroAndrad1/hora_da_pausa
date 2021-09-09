import styled, { css } from 'styled-components';

export const BarContainer = styled.header`
    display: flex;
    align-items: center;

    & span{
        font-size: 1rem;
    }
    
`
export const Bar = styled.div`
    flex: 1;
    height: 4px;
    border-radius: 4px;
    background: var(--gray-line);
    margin: 0 1.5rem;
    position: relative;

`
//Usar interface e necessario para o typescript nao reclamar de customprops
interface ExperienceProps{
    experiencePercent: number;
}
export const StyledExperienceBar = styled.div<ExperienceProps>`
     height: 4px;
     border-radius: 4px;
     background: var(--green);
     width: ${props => `${props.experiencePercent}%`};
     transition: .2s;
`
export const ExperienceValue = styled.span<ExperienceProps>`
    position: absolute;
    top: 12px;
    left:${props => `${props.experiencePercent}%`};
    transform: translateX(-50%);
    //Para nao aparecer a quantidade de xp, caso seja zero
    ${props => 
        props.experiencePercent == 0 && css`
            display: none;
        `
    }
`