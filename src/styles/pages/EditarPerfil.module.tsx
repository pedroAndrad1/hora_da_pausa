import styled from "styled-components";

export const Title = styled.h1`
     font-size: 2rem;
     margin-bottom: 4rem;
`

export const Button = styled.button`
     height: 3rem;
     margin-top: 4rem;
     
     display: flex;
     align-items: center;
     justify-content: center;

     border: 0;
     border-radius: 5px;

     color: var(--white);
     background: var(--blue-dark);

     font-size: 1rem;
     font-weight: 600;

     transition: .2s;


    & :hover{
        filter: brightness(0.9);
    }

`