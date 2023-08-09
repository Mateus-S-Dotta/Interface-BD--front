import { styled } from '@mui/system';
import { Box, Container, Modal, TableCell } from '@mui/material';

export const Celula = styled(TableCell)`
        border: 1px solid #ddd;
        border-bottom: 2px solid #aaa;
        width: ${({ minw }) => (minw && '5%')};
        ${(({ cursorp }) => (cursorp && 'cursor: pointer'))};
`;

export const ContainerMargin = styled(Container)`
        margin-top: 64px;
`;

export const BoxMarginTop = styled(Box)`
        margin-top: 32px;
        display: flex;
        gap: 12px;
        ${({ column }) => (column && 'flex-direction: column;')}
`;

export const ModalFlex = styled(Modal)`
        display: flex;
        justify-content: center;
        align-items: center;
`;

export const BoxModal = styled(Box)`
        padding: 30px;
        background-color: white;
        box-shadow: 0px 20px 40px 0px rgba(0,0,0,0.75);
        border-radius: 12px;
        z-index: 4;
`;

export const BoxHeader = styled(Box)`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;
        background-color: rgba(0, 110, 224, 0.6);
        border-radius: 0 0 16px 16px;
        box-shadow: 0px 12px 20px 0px rgba(0, 0, 0, 0.6);
        gap: 12px;
`;