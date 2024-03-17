import { Button } from '@mui/material';

export const OvalButton = ({ children }) => {

    const ButtonStyle = {
        width: '200px',
        borderRadius: '999px',
        backgroundColor: '#EB6159',
        color: '#FFFFFF',
        fontWeight: 'bold',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#EB6159',
          opacity: 0.7,
        },
    };

    return <Button sx={ButtonStyle}>{children}</Button>

};
