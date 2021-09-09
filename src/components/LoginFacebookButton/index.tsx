import styled from "styled-components";

const LoginFacebookButton = styled.button`
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
    width: 30%;
    margin: 1rem auto;
    padding: 1rem;

    &:hover{
        filter: brightness(0.9);
    }

    @media(max-width: 600px){
        width: 50%;
    }
`
export default LoginFacebookButton;