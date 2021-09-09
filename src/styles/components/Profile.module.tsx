import styled, { keyframes } from 'styled-components';

export const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
`

export const ProfilePhoto = styled.img`
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
    opacity: 0;
    transition: 0.2s;
`

export const ProfileInfos = styled.div`
    margin-left: 1.5rem;
`

export const Name = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--title);
`
export const Level = styled.p`
    font-size: 1rem;
    margin-top: .5rem;

    & img{
        margin-right: .5rem;
    }
`
/**Uma animacao para dar a impressao de que o background do skeleton esta se movimentando,
 * passando uma ideia de carregamento.
 */
 const skeletonRunBG = keyframes`
 from {
 background-position: 0px;
 }
 to {
 background-position: -200%;
 }
`

export const Skeleton = styled.div`
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
    background-image: linear-gradient(90deg, #eee 0px, #fff 50%, #eee 100%);
    background-color: #eee;

    animation: ${skeletonRunBG} 1.5s infinite linear;
`