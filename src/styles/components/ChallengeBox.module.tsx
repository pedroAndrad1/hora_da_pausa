import styled from 'styled-components';

export const ChallengeBoxContainer = styled.div`
    height: 100%;

    background: var(--white);
    border-radius: 5px;
    box-shadow: 0 0 60px rgba(0,0,0, .05);
    padding: 1.5rem 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;

    & > div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height: 100%;
    }

    @media(max-width: 768px){
        height: 60vh;
    }
`
export const ChallengeBoxNotActive = styled.div`

    & strong{
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 1.5;
    }

    & p{
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 70%;
    }
`
export const ChallengeBoxActive = styled.div`
    
    & header{
        color: var(--blue);
        font-weight: 600;
        font-size: 1.25rem;
        padding: 0 2rem 1.5rem;
        border-bottom: 1px solid var(--gray-line);
    }

    & main{
        flex: 1;

        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    & main strong{
        font-size: 2rem;
        font-weight: 600;
        color: var(--title);
        margin: 1.5rem 0 1rem;
    }

    & main p{
        line-height: 1.5rem;
    }

    & footer{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;

        width: 100%;
    }

    & footer button{
        height: 3rem;
        
        display: flex;
        align-items: center;
        justify-content: center;

        border: 0;
        border-radius: 5px;

        color: var(--white);

        font-size: 1rem;
        font-weight: 600;

        transition: .2s;
    }

    & footer button:hover{
        filter: brightness(0.9);
    }
`

export const SucceedButton = styled.button`
    background: var(--green);
`

export const FailedButton = styled.button`
    background: var(--red);
`
export const ChooseChallengeTypeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    width: 100%;

    & header{
        color: var(--blue);
        font-weight: 600;
        font-size: 1.25rem;
        padding: 0 2rem 1.5rem;
        border-bottom: 1px solid var(--gray-line);
    }

    & main{
        flex: 1;

        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        width: 100%;

        
    }

    
    & footer{
        width: 50%;
    }

    button{
        height: 3rem;
        width: 100%;
        
        display: flex;
        align-items: center;
        justify-content: center;

        border: 0;
        border-radius: 5px;

        color: var(--white);

        font-size: 1rem;
        font-weight: 600;

        transition: .2s;
    }

    button:hover{
        filter: brightness(0.9);
    }


`
export const EyeChallenge = styled.button`
    
    background: var(--blue);
`
export const BodyChallenge = styled.button`
    
    background: var(--blue-twitter);
`
