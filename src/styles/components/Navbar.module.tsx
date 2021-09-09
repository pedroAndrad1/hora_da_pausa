import styled, { css } from "styled-components";
import Link from 'next/link';
interface ToogleProps {
  open: boolean;
}


export const Nav = styled.nav`
  padding: 0 20px;
  min-height: 9vh;
  background: var(--blue-dark);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.h1`
  font-size: 25px;
  color: var(--white);
`;

export const Menu = styled.ul`
  list-style: none;
  display: flex;

  li:nth-child(2) {
    margin: 0px 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Item = styled.li`
color: white;
`;

export const StyledLink = styled(Link)`
  
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

export const NavIcon = styled.button`
  background: none;
  cursor: pointer;
  border: none;
  outline: none;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const Line = styled.span<ToogleProps>`
  display: block;
  border-radius: 50px;
  width: 25px;
  height: 3px;
  margin: 5px;
  background-color: var(--white);
  transition: width 0.4s ease-in-out;

  :nth-child(2) {
    width: ${(props) => (props.open ? "40%" : "70%")};
  }
`;

export const Overlay = styled.div<ToogleProps>`
  position: absolute;
  height: ${(props) => (props.open ? "70vh" : 0)};
  width: 100vw;
  background:var(--blue-dark);
  transition: height 0.4s ease-in-out;
  z-index:1;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const OverlayMenu = styled.ul<ToogleProps>`
  list-style: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*Para o menu nao atrapalhar a tela quando fechado */
  ${
    ({open}) => !open && css`pointer-events: none;`
  }

  

  li {
    opacity: ${(props) => (props.open ? 1 : 0)};
    font-size: 25px;
    margin: 3rem 0;
    transition: .5s ease-in-out;
  }

  span{
    opacity: ${(props) => (props.open ? 1 : 0)};
    transition: opacity .5s ease-in-out;
  } 
  
`;