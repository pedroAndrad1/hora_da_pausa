import styled, { css } from "styled-components";

export const Nav = styled.nav`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap: 4rem;
    margin-bottom: 3rem;

    @media(max-width: 767px){
        grid-template-columns: 1fr;
        grid-gap: 2rem;
    }

`
interface NavItemProps {
    active: boolean;
}
export const NavItem = styled.a<NavItemProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    cursor: pointer;
    
    background: var(--blue-dark);
    color: var(--white);
    border: none;
    box-shadow: .25rem .25rem .25rem rgba(0,0,0,0.2);
    padding: .75rem 1.75rem;
    
    &:hover{
        background: var(--text-highlight);
    }

    ${({ active }) => active && css`background: var(--text-highlight);`
    }
`

export const Table = styled.table`

    width: 100%;
    height: 100%;
    background: var(--white);
    box-shadow: .25rem .25rem .25rem rgba(0,0,0,0.2);
    margin-bottom: 2rem;
`
interface Responsive {
    responsive?: boolean;
}
export const Th = styled.th<Responsive>`
    padding: 2rem;

    @media(max-width: 500px){
    ${ ({ responsive }) => responsive && css`display:none;` }
    }

    `
export const Td = styled.td<Responsive>`

    @media(max-width: 500px){
        ${ ({ responsive }) => responsive && css`display:none;` }
    }
`
    
export const Tr = styled.tr`
    text-align: center;
    box-shadow: 0 0 .25rem rgba(0,0,0,0.2);
    border-radius: 10px;
    margin-top:.25rem;
    cursor: pointer;
    
`

export const Main = styled.main`
    width: 100%;
    height: 100%;
`

export const Photo = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;

`
export const NavTableContainer = styled.div`

   display: grid;
   grid-template-columns: 1fr 1fr;
   align-items: center;

   & a{
       text-align: center;
   }

   @media(max-width: 500px){
        grid-template-columns: 1fr;
        gap: 3rem;
    }
`