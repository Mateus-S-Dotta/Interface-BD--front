import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button, MenuItem, Checkbox } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Edit } from '@mui/icons-material';
import { Celula, ContainerMargin, BoxMarginTop } from '../styles';
import EditarRegistroModal from './editarRegistroModal';
import Header from './header';

const Tabela = () => {
    const { nomeTabela } = useParams();
    const [tabela, setTabela] = useState([]);
    const [colunasDados, setColunasDados] = useState({ colunas: [] });
    const [novoDado, setNovoDado] = useState({});
    const [adicionarDado, setAdicionarDado] = useState(false);
    const [valuresBooleanos, setValoresBooleanos] = useState({});
    const [colunasSelecionadas, setColunasSelecionadas] = useState([]);
    const [order, setOrder] = useState({ colunaOrdenacao: undefined, ordem: false });
    const [excluir, setExcluir] = useState(false);
    const [registroSelecionado, setRegistroSelecionado] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);

    const handleAbrirModal = (registro) => {
        setRegistroSelecionado(registro);
        setModalAberto(true);
    };

    const handleFecharModal = () => {
        setModalAberto(false);
    };

    const excluirRegistros = async () => {
        if (colunasSelecionadas.length === 0) {
            alert('Selecione um Registro');
            return;
        }
        try {
            await axios.put(`http://localhost:8000/api/excluirRegistros/${nomeTabela}`, { idsRegistros: colunasSelecionadas });
            fetchDataTableData();
            setColunasSelecionadas([]);
        } catch (error) {
            console.error('Erro ao excluir o conteúdo:', error);
        }
    };

    const excluirConteudo = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/excluirConteudo/${nomeTabela}`);
            fetchDataTableData();
        } catch (error) {
            console.error('Erro ao excluir o conteúdo:', error);
        }
    };

    const handleOrder = (event) => {
        const coluna = event.target.getAttribute("name");
        if (coluna === order.colunaOrdenacao) {
            if (order.ordem === 'asc') {
                setOrder({ ...order, ordem: 'desc' });
            } else {
                setOrder({ ...order, ordem: 'asc' });
            }
        } else {
            setOrder({ colunaOrdenacao: coluna, ordem: 'asc' });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNovoDado((prevDados) => ({ ...prevDados, [name]: value }));
        if (event.target.tipo === "boolean") {
            setValoresBooleanos({ ...valuresBooleanos, [name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`http://localhost:8000/api/inserirRegistro/${nomeTabela}`, novoDado);
            fetchDataTableData();
            fetchDataTableInfo();
        } catch (error) {
            console.error('Erro ao adicionar novo dado:', error);
        }
    };

    async function fetchDataTableData() {
        try {
            const response = await axios.get(`http://localhost:8000/api/mostrarTabela/${nomeTabela}${order.colunaOrdenacao ? `?colunaOrdenacao=${order.colunaOrdenacao}&ordem=${order.ordem}` : ''}`);
            setTabela(response.data);
        } catch (error) {
            console.error('Erro ao obter informações das tabelas:', error);
        }
    };

    async function fetchDataTableInfo() {
        try {
            const response = await axios.get('http://localhost:8000/api/mostrarNomeTabelas/');
            const tabelaEspecifica = response.data.find(tabela => tabela.nome === nomeTabela);
            setColunasDados(tabelaEspecifica);
            tabelaEspecifica.colunas.forEach(({ tipo, nome }) => {
                if (tipo === 'boolean') {
                    setValoresBooleanos({ ...valuresBooleanos, [nome]: false });
                }
            });
        } catch (error) {
            console.error('Erro ao obter informações das tabelas:', error);
        }
    };

    const handleToggleSelecao = (tabela) => {
        if (colunasSelecionadas.includes(tabela)) {
            setColunasSelecionadas(colunasSelecionadas.filter((item) => item !== tabela));
        } else {
            setColunasSelecionadas([...colunasSelecionadas, tabela]);
        }
    };

    useEffect(() => {
        fetchDataTableData();
        fetchDataTableInfo();
    }, [order]);

    return (
        <>
            <Header arrow='true' nomeTabela={nomeTabela} />
            <ContainerMargin maxWidth="md">
                <TableContainer component={Paper}>
                    <Table>
                        {tabela.length === 0 ? (
                            <TableHead>
                                <TableRow>
                                    <Celula>
                                        Está tabela está vazia
                                    </Celula>
                                </TableRow>
                            </TableHead>
                        ) : (
                            <>
                                <TableHead>
                                    <TableRow>
                                        <Celula>
                                            <Checkbox
                                                checked={colunasSelecionadas.length === colunasDados.totalRegistros}
                                                onChange={() =>
                                                    colunasSelecionadas.length === colunasDados.totalRegistros
                                                        ? setColunasSelecionadas([])
                                                        : setColunasSelecionadas(tabela.map((tabela) => tabela.id))
                                                }
                                                color="primary"
                                            />
                                        </Celula>
                                        {colunasDados.colunas.map((coluna) => (
                                            <Celula cursorp='true' key={coluna.nome} name={coluna.nome} onClick={handleOrder}>{coluna.nome}</Celula>
                                        ))}
                                        <Celula />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tabela.map((linha) => {
                                        const entries = Object.entries(linha);
                                        return (
                                            <TableRow key={linha.id}>
                                                <Celula>
                                                    <Checkbox
                                                        checked={colunasSelecionadas.includes(linha.id)}
                                                        onChange={() => handleToggleSelecao(linha.id)}
                                                        color="primary"
                                                    />
                                                </Celula>
                                                {entries.map(([key, value]) => (
                                                    <Celula key={key}>{`${value}`}</Celula>
                                                ))}
                                                <Celula cursorp='true' onClick={() => handleAbrirModal(linha)}>
                                                    <Edit />
                                                </Celula>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </>
                        )}
                    </Table>
                </TableContainer>
                <BoxMarginTop>
                    <Button onClick={() => setAdicionarDado(!adicionarDado)} variant="contained" color="primary">
                        Adicionar
                    </Button>
                    <Button onClick={excluirRegistros} variant="contained" color={colunasSelecionadas.length === 0 ? "grey" : "error"}>
                        Excluir Registros
                    </Button>
                    <Button onClick={() => setExcluir(!excluir)} variant="contained" color="secondary">
                        Excluir Conteúdo
                    </Button>
                    {excluir && (
                        <Button onClick={excluirConteudo} variant="contained" color="error">
                            Confirme Exclusão
                        </Button>
                    )}
                </BoxMarginTop>
            </ContainerMargin>
            {adicionarDado && (
                <ContainerMargin maxWidth="md">
                    <Typography variant="h4" gutterBottom>
                        Adicionar Novo Dado na Tabela {nomeTabela}
                    </Typography>
                    <form
                        style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '32px' }}
                        onSubmit={handleSubmit}
                    >
                        {colunasDados.colunas.map((coluna) => {
                            if (coluna.nome === 'id') {
                                return
                            }
                            if (coluna.tipo === 'boolean') {
                                return (
                                    <TextField
                                        select
                                        key={coluna.nome}
                                        label={coluna.nome}
                                        value={valuresBooleanos[coluna.nome]}
                                        onChange={(e) => handleChange({ target: { name: coluna.nome, value: e.target.value, tipo: coluna.tipo } })}
                                        required
                                    >
                                        <MenuItem value={'true'}>
                                            True
                                        </MenuItem>
                                        <MenuItem value={'false'}>
                                            false
                                        </MenuItem>
                                    </TextField>
                                )
                            }
                            return (
                                <TextField
                                    key={coluna.nome}
                                    label={coluna.nome}
                                    name={coluna.nome}
                                    onChange={handleChange}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    type={`${coluna.tipo === 'date' || coluna.tipo === 'text' ? coluna.tipo : 'number'}`}
                                />
                            )
                        })}
                        <Button type="submit" variant="contained" color="primary">
                            Adicionar Dado
                        </Button>
                    </form>
                </ContainerMargin>
            )}
            <EditarRegistroModal
                open={modalAberto}
                onClose={handleFecharModal}
                registro={registroSelecionado}
                onSave={fetchDataTableData}
                nomeTabela={nomeTabela}
            />
        </>
    );
};

export default Tabela;