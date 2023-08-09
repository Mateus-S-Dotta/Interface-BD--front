import { ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { theme } from './theme/theme';
import Home from './pages/home';
import Tabela from './components/tabelaEspecifica';

export default function Rotas() {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/tabela/:nomeTabela" element={<Tabela />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </ThemeProvider>
    )
}