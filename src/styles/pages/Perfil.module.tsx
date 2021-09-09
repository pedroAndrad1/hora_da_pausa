import Link from "next/link";
import styled from "styled-components";


export const Contribuidor = styled.div`
  position: absolute;
  top: 0;
  border: 0;
  right: 0;
  z-index: 20;

  width: 3rem;
  height: 3rem;

  background:black;
`;

export const ProfilePicture = styled.img`
  
    width: 15rem;
    height: 15rem;
    border-radius: 50%;   
    margin-bottom: 3rem;

    box-shadow: 0 0 1.25rem rgba(0,0,0, 0.4);
`
export const Title = styled.h1`
      margin-bottom: 4rem;
`
export const ProfileInfos = styled.div`
 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin-bottom: 1rem;

    & p{
       text-align: center;
    }

    @media(max-width: 600px){
        width: 100%;
    }
`
export const ConquistasTitle = styled.h2`
    align-self: flex-start;
    margin-bottom: 3rem;

`
export const ConquistasContainer = styled.div`
    display: flex;
    justify-content: flex-start;

    width: 100%;
    height: 80vh;

    background: var(--gray-line);
    border-radius: 10px;
    box-shadow: .25rem .25rem .25rem rgba(0,0,0,0.2);

`
export const EditarPerfil = styled.a`
    height: 3rem;
    width: 25%;
    margin-bottom: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    border: 0;
    border-radius: 5px;

    color: var(--white);
    background: var(--blue-dark);

    font-size: 1rem;
    font-weight: 600;

    transition: .2s;

    &:hover{
        filter: brightness(0.9);
    }

`
