import React, { useEffect, useState } from 'react';
import TabelaNova from '../components/novaTabelaForm';
import axios from 'axios';
import { Typography, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Checkbox, Button } from '@mui/material';
import { Celula, ContainerMargin, BoxMarginTop } from '../styles';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';

const Home = () => {
    const [tabelas, setTabelas] = useState([]);
    const [tabelasSelecionadas, setTabelasSelecionadas] = useState([]);
    const [tamanhoCuluna, setTamanhoColuna] = useState(0);
    const [ordenacao, setOrdenacao] = useState(null);
    const [novaTabela, setNovaTabela] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/mostrarNomeTabelas');
            setTabelas(response.data);
            response.data.forEach((linha) => {
                if (linha.colunas.length > tamanhoCuluna) {
                    setTamanhoColuna(linha.colunas.length);
                }
            });
        } catch (error) {
            console.error('Erro ao obter informações das tabelas:', error);
        }
    }

    const handleCriarTabela = async (tabela) => {
        try {
            await axios.post('http://localhost:8000/api/inserirTabela', tabela);
            alert('Tabela criada com sucesso!');
            fetchData();
        } catch (error) {
            alert('Ocorreu um erro ao criar a tabela. Por favor, tente novamente mais tarde.');
        }
    };

    const ordenarTabela = (coluna) => {
        if (ordenacao && ordenacao.coluna === coluna) {
            setTabelas([...tabelas.sort((a, b) => (ordenacao.ordem === 'asc' ? a[coluna].localeCompare(b[coluna]) : b[coluna].localeCompare(a[coluna])))]);
            setOrdenacao({ coluna, ordem: ordenacao.ordem === 'asc' ? 'desc' : 'asc' });
        } else {
            setTabelas([...tabelas.sort((a, b) => a[coluna].localeCompare(b[coluna]))]);
            setOrdenacao({ coluna, ordem: 'asc' });
        }
    };

    const handleToggleSelecao = (tabela) => {
        if (tabelasSelecionadas.includes(tabela)) {
            setTabelasSelecionadas(tabelasSelecionadas.filter((item) => item !== tabela));
        } else {
            setTabelasSelecionadas([...tabelasSelecionadas, tabela]);
        }
    };

    const handleExcluirSelecionadas = async () => {
        if (tabelasSelecionadas.length === 0) {
            alert('Nenhuma tabela selecionada!');
            return;
        }
        try {
            await axios.put('http://localhost:8000/api/excluirTabela', { tabelasParaExcluir: tabelasSelecionadas });
            setTabelas(tabelas.filter((tabela) => !tabelasSelecionadas.includes(tabela.nome)));
            setTabelasSelecionadas([]);
        } catch (error) {
            console.error('Erro ao excluir as tabelas selecionadas:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Header />
            <ContainerMargin maxWidth="md">
                {tabelas.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table" style={{ borderCollapse: 'collapse' }}>
                            <TableHead>
                                <TableRow>
                                    <Celula minw='true'>
                                        <Checkbox
                                            checked={tabelasSelecionadas.length === tabelas.length}
                                            onChange={() =>
                                                tabelasSelecionadas.length === tabelas.length
                                                    ? setTabelasSelecionadas([])
                                                    : setTabelasSelecionadas(tabelas.map((tabela) => tabela.nome))
                                            }
                                            color="primary"
                                        />
                                    </Celula>
                                    <Celula align="center" onClick={() => ordenarTabela('nome')} cursorp='true'>
                                        Nome
                                    </Celula>
                                    <Celula align="center" colSpan={tamanhoCuluna + 1}>
                                        Colunas
                                    </Celula>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tabelas.map((tabela) => (
                                    <TableRow key={tabela.nome}>
                                        <Celula>
                                            <Checkbox
                                                checked={tabelasSelecionadas.includes(tabela.nome)}
                                                onChange={() => handleToggleSelecao(tabela.nome)}
                                                color="primary"
                                            />
                                        </Celula>
                                        <Celula align="center" onClick={() => navigate(`/tabela/${tabela.nome}`)} cursorp='true'>
                                            {tabela.nome}
                                        </Celula>
                                        {
                                            tabela.colunas.map((coluna, index) => (
                                                <Celula key={index} align="center">
                                                    {coluna.nome}
                                                </Celula>
                                            ))
                                        }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography variant="body1">Nenhuma tabela encontrada.</Typography>
                )}
                <BoxMarginTop>
                    <Button variant="contained" color='primary' onClick={() => setNovaTabela(!novaTabela)}>
                        Adicionar Tabela
                    </Button>
                    <Button variant="contained" color={tabelasSelecionadas.length === 0 ? "grey" : "error"} onClick={handleExcluirSelecionadas}>
                        Excluir Tabelas Selecionadas
                    </Button>
                </BoxMarginTop>
                {
                    novaTabela && (
                        <TabelaNova onFormSubmit={handleCriarTabela} />
                    )
                }
            </ContainerMargin >
        </>
    );
};

export default Home;