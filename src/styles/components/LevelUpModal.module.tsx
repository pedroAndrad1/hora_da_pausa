import styled from 'styled-components';

export const Overlay = styled.div`
    background: rgba(242,243,245, 0.8);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 10000;

`

export const ModalContainer = styled.div`
    background: var(--white);
    width: 100%;
    max-width: 400px;
    padding: 2rem 3rem;
    border-radius: 5px;
    box-shadow: 0 0 60px  rgba(0,0,0, .05);
    text-align: center;
    position: relative;

    & header{
        font-size: 8.25rem;
        font-weight: 600;
        color: var(--blue);
        background: url('/icons/levelup.svg') no-repeat center;
        background-size: contain;
    }

    & strong{
        font-size: 2.25rem;
        color: var(--title);
    }

    & p{
        font-size: 1.25rem;
        color: var(--text);
        margin-top: .25rem;
    }

    
`
export const Exit = styled.button`
    position: absolute;
        right: .5rem;
        top: .5rem;
        background: transparent;
        border: 0;
        font-size: 0; //Para o outline do clique no botao ficar no tamanho ideal

`

export const ShareButton = styled.a`
   display: flex;
    align-items: center;
    justify-content: space-around;

    background: #4267B2;
    color: var(--white);
    height: 3rem;
    border: 0;
    border-radius: 5px;
    font-weight: 600;
    transition: .2s;
    padding: 1rem;

    &:hover{
        filter: brightness(0.9);
    }

    @media(max-width: 600px){
        width: 50%;
    }


`
