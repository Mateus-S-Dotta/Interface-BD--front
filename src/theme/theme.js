import { createTheme } from '@mui/material'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#006EE0',
            light: '#C3D4FE',
            dark: '#080096'
        },
        secondary: {
            main: '#0E8750',
            light: '#ACD9C5',
            dark: '#034A2A'
        },
        warning: {
            main: '#EF8F00',
            light: '#F5D9B0',
            dark: '#CC7800'
        },
        info: {
            main: '#5482F6',
            light: '#C3D4FE',
            dark: '#243F80'
        },
        grey: {
            main: 'rgba(0, 0, 0, 0.05)',
        },
        background: {
            payed: '#EEF6F6',
            overdue: '#FFEFEF',
            planned: '#FCF6DC',
            payedAmount: '#1FA7AF',
            overdueAmount: '#971D1D',
            plannedAmount: '#C5A605'
        }
    },
    typography: {
        title1: {
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: '1.95rem'
        },
        title2: {
            fontFamily: 'Montserrat',
            fontWeight: 700,
            fontSize: '1.5rem',
            lineHeight: '1.95rem'
        },
        title3: {
            fontFamily: 'Montserrat',
            fontWeight: 700,
            fontSize: '1.125rem',
            lineHeight: '1.5rem'
        },
        title4: {
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '1.625rem',
            lineHeight: '2.125rem'
        },
        title5: {
            fontFamily: 'Montserrat',
            fontWeight: 700,
            fontSize: '1rem',
            lineHeight: '1.3125rem'
        },
        title6: {
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '1.625rem',
            lineHeight: '2.125rem'
        },
        title7: {
            fontFamily: 'Montserrat',
            fontWeight: 700,
            fontSize: '1rem',
            lineHeight: '1.5rem'
        },
        subtitle: {
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: '1rem',
            lineHeight: '1.375rem'
        },
        body1: {
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: '1.5rem'
        },
        body2: {
            fontFamily: 'Nunito',
            fontWeight: 400,
            fontSize: '1.125rem',
            lineHeight: '1.5rem'
        },
        body3: {
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: '0.875rem',
            lineHeight: '1.25rem'
        },
        body4: {
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: '1.375rem',
            lineHeight: '1.875rem'
        },
        body5: {
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: '1rem',
            lineHeight: '3.125rem'
        },
        body6: {
            fontFamily: 'Nunito',
            fontWeight: 600,
            fontSize: '0.5rem',
            lineHeight: '0.6875rem'
        },
        body7: {
            fontFamily: 'Nunito',
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: '1.5rem'
        },
        body8: {
            fontFamily: 'Nunito',
            fontWeight: 400,
            fontSize: '0.875rem',
            lineHeight: '2.5rem'
        },
        button: {
            textTransform: 'none'
        }
    }
})