import styled from "styled-components";

export const Table = styled.table`
    width: 100%;
    margin: 2rem 0;
    color: black;

    th, td{
        padding: .75rem 1rem;
        border-bottom: 1px solid black;
    }

    th{
        text-transform: uppercase;
        font-size: .75rem;
        text-align: left;
    }

    tbody{   
        color: black;
    }

    i{
        cursor: pointer;
    }
`