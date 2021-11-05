import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { Container } from "../components/Container";
import Navbar from "../components/Navbar";
import {
    Main, Photo
} from "../styles/pages/Ranking.module";
import LeftArrow from "../components/Arrows/LeftArrow";
import RightArrow from "../components/Arrows/RightArrow";
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { Table } from "../components/Table";
import Filtro from "../components/Filtro"
import UserService from "../utils/services/UserService";
import useBufferToImage from '../utils/customHooks/useBufferToImage';

export default function Ranking({ usuarios_rankeados }) {
  
    const data = useMemo(() => usuarios_rankeados, []);

    const columns = useMemo(
        () => [
            {
                Header: 'Posição',
                accessor: 'posicao' //chave da info para a coluna
            },
            {
                Header: 'Foto',
                accessor: 'foto' //chave da info para a coluna
            },
            {
                Header: 'Nome',
                accessor: 'nome' //chave da info para a coluna
            },
            {
                Header: 'Nível',
                accessor: 'nivel' //chave da info para a coluna
            },
            {
                Header: 'Xp',
                accessor: 'xp' //chave da info para a coluna
            },
        ]
        , []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        // @ts-ignore
        page,
        // @ts-ignore
        pageOptions,
        // @ts-ignore
        nextPage,
        // @ts-ignore
        canNextPage,
        // @ts-ignore
        canPreviousPage,
        // @ts-ignore
        previousPage,
        // @ts-ignore
        setGlobalFilter,
        // @ts-ignore
        setPageSize
    } =
        // @ts-ignore
        useTable({ columns, data }, useGlobalFilter, usePagination)

    // @ts-ignore
    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <>
            <Head>
                <title>Hora da pausa | Ranking</title>
            </Head>
            <Navbar />
            <Container>
                <Main className='animeLeft'>
                    <Filtro name='filtro' value={globalFilter} onChange={e => setGlobalFilter(e.target.value)}
                        placeholder='Filtre por qualquer uma das colunas'
                    />
                    <Table {...getTableProps()} cellSpacing={0} >
                        <thead>
                            {/* Fazendo um looping para as linhas de header */}
                            {
                                headerGroups.map((headerGroup, i) => (
                                    // Aplicando as props de header
                                    <tr {...headerGroup.getHeaderGroupProps()} key={`${i}_header_row`} >
                                        {
                                            headerGroup.headers.map((column, i) => (
                                                //Aplicando as props de header cell
                                                <th
                                                    {...column.getHeaderProps()}
                                                    key={`${i}_header_cell`}
                                                >
                                                    {/* Renderizando a cell */}
                                                    {column.render('Header')}
                                                </th>
                                            ))
                                        }
                                    </tr>
                                ))}
                        </thead>
                        {/* Aplicando as props de body */}
                        <tbody {...getTableBodyProps()}>
                            {
                                //Fazendo um looping nas rows
                                page.map((row, i) => {
                                    //Preparando a row para display
                                    prepareRow(row)

                                    return (
                                        //Aplicando as props de row
                                        <tr {...row.getRowProps()} key={`${i}_body_row`} className='animeLeft'>
                                            {
                                                //fazendo um looping nas row cells
                                                row.cells.map((cell, i) => {
                                                    if (cell.column.id === 'foto') {
                                                        return (
                                                            <td
                                                                key={`${i}_body_cell`}
                                                                {...cell.getCellProps()}
                                                            >
                                                                {/* Renderizando a cell */}
                                                                <Photo src={cell.value} alt='Foto de perfil' />
                                                            </td>
                                                        )
                                                    }
                                                    else {
                                                        return (
                                                            //Aplicando as props de cell
                                                            <td
                                                                key={`${i}_body_cell`}
                                                                {...cell.getCellProps()}
                                                            >
                                                                {/* Renderizando a cell */}
                                                                {cell.render('Cell')}
                                                            </td>
                                                        )
                                                    }
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <div className='pagination'>
                        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} >
                            {
                                [5, 10, 15].map(pageSize =>
                                    <option key={pageSize} value={pageSize}>
                                        {`Mostrar ${pageSize}`}
                                    </option>
                                )
                            }
                        </select>
                        <span>
                            {`Página ${pageIndex + 1} de ${pageOptions.length}`}
                        </span>
                        <LeftArrow onClick={() => previousPage()} disabled={!canPreviousPage} />
                        <RightArrow onClick={() => nextPage()} disabled={!canNextPage} />
                    </div>
                </Main>
            </Container>
        </>
    )
}

//PRECISA TER ESSE FORMATO E NOME

//Essa function ocorrera no servidor Next que intermedia o front com o back.
//Como isso ocorre antes de renderizar a page, e otimo para fazer requisicoes
//para api's. Assim o conteudo estara disponivel na renderizacao da pagina e  
//crawlers indexadores poderam ver o conteudo requisitado.
export const getServerSideProps: GetServerSideProps = async (context) => {

    const { access_token } = context.req.cookies;
    const usuarios_server =
        await UserService.rankingGeral(access_token)
            .then(async res => {
                if (res.ok) {
                    return await res.json();
                }
            })
    // Mapeando os Usuarios para a tabela de ranking
    const usuarios_rankeados = usuarios_server.map((usuario, pos) => {
        // Verificando se o usuario tem foto para evitar erro
        let foto;
        if (usuario.foto) {
            foto = useBufferToImage(usuario.foto)
        }
        else {
            foto = 'https://hajiri.co/uploads/no_image.jpg';
        }

        return {
            posicao: pos + 1,
            foto,
            nome: usuario.nome,
            nivel: usuario.nivel,
            xp: usuario.xp,
        }
    });
    //Verifica se o user tem o cookie que indica que ele esta logado, se nao, e mandando para tela de login
    /*if(!authorized){
      return{
        redirect:{
          destination:'/login',
          permanent: false,
        }
      }
    }*/


    return {
        props: {
            usuarios_rankeados
        }
    }
}