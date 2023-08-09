import React, { useEffect, useState } from 'react';
import { Backdrop, Fade, TextField, Button, MenuItem, Typography } from '@mui/material';
import axios from 'axios';
import { ModalFlex, BoxModal } from '../styles';

const EditarRegistroModal = ({ open, onClose, registro, onSave, nomeTabela }) => {
    const [dadosEditados, setDadosEditados] = useState(registro);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDadosEditados((prevDados) => ({ ...prevDados, [name]: value }));
    };

    const handleSalvar = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/atualizarRegistro/${nomeTabela}/${registro.id}`, dadosEditados);
            onSave(dadosEditados);
            onClose();
        } catch (error) {
            console.error('Erro ao editar registro:', error);
        }
    };

    useEffect(() => {
        setDadosEditados(registro);
    }, [registro]);

    return (
        <ModalFlex
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <BoxModal>
                    <Typography style={{ marginBottom: '30px' }}>Editar Registro</Typography>
                    <form onSubmit={handleSalvar} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        {Object.keys(dadosEditados).length > 0 &&
                            (Object.keys(registro).map((key) => {
                                const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/;
                                const isDate = String(dadosEditados[key]).match(regex);
                                if (key === 'id') {
                                    return
                                }
                                if (typeof
                                    dadosEditados[key] === 'boolean') {
                                    return (
                                        <TextField
                                            select
                                            key={key}
                                            label={key}
                                            value={dadosEditados[key]}
                                            onChange={(e) => handleChange({ target: { name: key, value: e.target.value, tipo: key } })}
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
                                        key={key}
                                        label={key}
                                        name={key}
                                        onChange={handleChange}
                                        value={isDate ? dadosEditados[key].slice(0, 10) : dadosEditados[key]}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        type={`${isDate ? 'date' : typeof dadosEditados[key] === 'string' ? key : 'number'}`}
                                    />
                                )
                            }))
                        }
                        <Button variant="contained" color="primary" type='submit'>
                            Salvar
                        </Button>
                    </form>
                </BoxModal>
            </Fade>
        </ModalFlex>
    );
};

export default EditarRegistroModal;
