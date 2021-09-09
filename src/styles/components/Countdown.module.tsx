import styled from 'styled-components';

export const CountdownContainer = styled.div`
    display: flex;
    align-items: center;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    color: var(--title);
    
    //Caixas dos minutos e segundos
    & > div{
        flex: 1;

        display: flex;
        align-items: center;
        justify-content: space-evenly;

        background: var(--white);
        box-shadow: 0 0 60px rgba(0,0,0, .05);
        border-radius: 5px;
        font-size: 8.5rem;
        text-align: center;
    }

    //Dois pontos
    & > span{
        font-size: 6.25rem;
        margin: 0 .5rem;
    }

    //Numeros
    & > div span{
        flex: 1;
        width: 5rem; //Para nao ficar mudando o tamanho da caixa do numero e zoando o layout
    }

    //Primeiro numero de cada caixa
    & > div span:first-child{
        border-right: 1px solid #f0f1f3;
    }

    //Segundo numero de cada caixa
    & > div span:last-child{
        border-left: 1px solid #f0f1f3;
    }

`

export const CountdownButtonStart = styled.button`
    width: 100%;
    height: 5rem;

    margin-top: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 0;
    border-radius: 5px;

    background: var(--blue);
    color: var(--white);

    font-size: 1.25rem;
    font-weight: 600;

    transition: .2s;

    &:hover{
        background: var(--blue-dark);
    }
`

export const CountdownButtonGiveUp = styled.button`
    width: 100%;
    height: 5rem;

    margin-top: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 0;
    border-radius: 5px;

    background: var(--white);
    color: var(--text);

    font-size: 1.25rem;
    font-weight: 600;

    transition: .2s;

    &:not(:disabled):hover{
        background: var(--red);
        color: var(--white);
    }

    //Estilos para quando o countdown chegar a zero. 
    //O botão sera o mesmo, mas estara disabled
    &:disabled{
        color: var(--text);
        cursor: not-allowed;
        border-bottom: 5px solid #4CD62B;
    }

`