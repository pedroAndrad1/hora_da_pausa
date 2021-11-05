import styled from "styled-components";

export const Table = styled.table`
    width: 100%;
    height: 100%;
    background: var(--white);
    box-shadow: .25rem .25rem .25rem rgba(0,0,0,0.2);
    margin-bottom: 2rem;

    th, td{
        padding: 1rem;
    }

    tr{
        text-align: center;
        box-shadow: 0 0 .25rem rgba(0,0,0,0.2);
        border-radius: 10px;
        margin-top:.25rem;
    }

`