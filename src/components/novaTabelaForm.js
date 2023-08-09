import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { BoxMarginTop } from '../styles';

const NovaTabelaForm = ({ onFormSubmit }) => {
    const [nomeTabela, setNomeTabela] = useState('');
    const [nomeColuna, setNomeColuna] = useState('');
    const [tipoColuna, setTipoColuna] = useState('');
    const [colunas, setColunas] = useState([]);
    const tiposColuna = ['text', 'integer', 'date', 'boolean'];

    const handleAddColuna = () => {
        if (nomeColuna && tipoColuna) {
            setColunas([...colunas, { nome: nomeColuna, tipo: tipoColuna }]);
            setNomeColuna('');
            setTipoColuna('');
        }
    };

    const handleRemoverColuna = (index) => {
        const novasColunas = colunas.filter((_, i) => i !== index);
        setColunas(novasColunas);
    };

    const handleSubmit = () => {
        if (nomeTabela && colunas.length > 0) {
            const tabela = { nomeTabela, colunas };
            onFormSubmit(tabela);
            setNomeTabela('');
            setColunas([]);
        }
    };

    return (
        <Box>
            <BoxMarginTop column='true'>
                <TextField
                    label="Nome da Tabela"
                    value={nomeTabela}
                    onChange={(e) => setNomeTabela(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Nome da Coluna"
                    value={nomeColuna}
                    onChange={(e) => setNomeColuna(e.target.value)}
                />
                <TextField
                    select
                    label="Tipo da Coluna"
                    value={tipoColuna}
                    onChange={(e) => setTipoColuna(e.target.value)}
                >
                    {
                        tiposColuna.map((tipo) => (
                            <MenuItem key={tipo} value={tipo}>
                                {tipo}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <Button variant="outlined" onClick={handleAddColuna}>
                    Adicionar Coluna
                </Button>
                {colunas.map((coluna, index) => (
                    <Typography key={index}>
                        {coluna.nome} - {coluna.tipo}{' '}
                        <Button variant="outlined" onClick={() => handleRemoverColuna(index)}>
                            Remover
                        </Button>
                    </Typography>
                ))}
                <Button variant="contained" onClick={handleSubmit}>
                    Criar Tabela
                </Button>
            </BoxMarginTop>
        </Box >
    );
};

export default NovaTabelaForm;
