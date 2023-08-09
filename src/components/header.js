import { ArrowBack } from '@mui/icons-material';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BoxHeader } from '../styles';

const Header = ({ arrow, nomeTabela }) => {
    const navigate = useNavigate();

    return (
        <BoxHeader>
            {arrow && (
                <ArrowBack sx={{
                    cursor: 'pointer',
                    width: '40px',
                    height: '40px'
                }} onClick={() => navigate('/home')} />
            )}
            <Typography variant='title1' sx={{ color: '#000' }}>
                {arrow ? `Tabela: ${nomeTabela}` : `Gerenciador de Tabelas`}
            </Typography>
        </BoxHeader>
    );
};

export default Header;
