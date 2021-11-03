import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { Nav, Logo, Menu, Item, StyledLink, NavIcon, Line, Overlay, OverlayMenu }
  from '../../styles/components/Navbar.module';
import Divider from '../Divider';

const Navbar = () => {
  const [toggle, setToogle] = useState(false);

  const logOff = () =>{
    Cookies.remove("access_token");
  }

  return (
    <>
      <Nav>
        <Logo>
          <StyledLink href='/'>
            Hora da pausa
          </StyledLink>
        </Logo>
        <Menu>
          <Item>
            <StyledLink href='/perfil'>
              Perfil
            </StyledLink>
          </Item>
          {/* <Item>
            <StyledLink href='/estatisticas'>
              Estatísticas
            </StyledLink>
          </Item> */}
          <Item>
            <StyledLink href='/ranking'>
              Ranking
            </StyledLink>
          </Item>
          <Item>
            <StyledLink href='/doacao'>
              Doe com picpay
            </StyledLink>
          </Item>
          <Item onClick={logOff}>
            <StyledLink href='/login' >
              Logoff
            </StyledLink>
          </Item>
        </Menu>
        <NavIcon onClick={() => setToogle(!toggle)}>
          <Line open={toggle} />
          <Line open={toggle} />
          <Line open={toggle} />
        </NavIcon>
      </Nav>
      <Overlay open={toggle}>
        <OverlayMenu open={toggle}>
          <Item>
            <StyledLink href='/perfil'>
              Perfil
            </StyledLink>
          </Item>
          <Divider color='var(--white)' />
          { /*<Item>
            <StyledLink href='/estatisticas'>
              Estatísticas
            </StyledLink>
          </Item>
          <Divider color='var(--white)' />
          <Item>
            <StyledLink href='/ranking'>
              Ranking
            </StyledLink>
          </Item> */}
          <Item>
            <StyledLink href='/doacao'>
              Doe com picpay
            </StyledLink>
          </Item>
          <Divider color='var(--white)' />
        </OverlayMenu>
      </Overlay>
    </>
  );
};

export default Navbar;
