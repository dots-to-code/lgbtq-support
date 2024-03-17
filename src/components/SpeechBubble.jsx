import { UserInfo } from '../components/UserInfo';
import { Paper, Box } from '@mui/material';

export const SpeechBubble = ({ children, user, customStyle }) => {

    const PaperStyle = {
        width: '90%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '30px',
        borderRadius: '40px',
        padding: '20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        ...customStyle,
        // 吹き出しのデザインはまだ
        // '&::after': {
        //     content: '""',
        //     position: 'relative',
        //     margin: 0,
        //     bottom: '20px',
        //     left: '-180px',
        //     width: 0,
        //     height: 0,
        //     borderTop: '30px solid #F6ADA8',
        //     borderLeft: '20px solid transparent',
        //     borderRight: '20px solid transparent',
        //     transform: 'rotate(70deg)',
        //     zIndex: '-1',
        //   },
    };

    return (
        <Paper sx={PaperStyle}>
            <Box sx={{ width: '100%', alignItems: 'flex-start' }}>
                <UserInfo user={user} />
            </Box>
            {children}
        </Paper>
    )
}