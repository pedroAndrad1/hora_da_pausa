import styled from 'styled-components';

export const StyledSection = styled.section`
    
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6.25rem;
    align-content: center;
    justify-content: center;
    
    padding: 2rem;

    @media(max-width:768px){
        grid-template-columns: 1fr;
    }
`