import styled, { css } from 'styled-components';

interface DividerProps{
    color:string;
}

const Divider = styled.span<DividerProps>`
    width: 80%;
    height: 1px;
    ${({color}) => css`
        background: linear-gradient(to left, #ffffff , ${color} 50%, #ffffff);
    `};
    margin:1rem 0;
`
export default Divider;