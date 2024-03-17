import { UserInfo } from '../components/UserInfo';
import { Paper, Box, Button } from '@mui/material';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import StarsSharpIcon from '@mui/icons-material/StarsSharp';

export const SpeechBubble = ({ children, user, customStyle, isDispFavoButoon = false}) => {

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

    const GoodIconStyle = {
        margin: '10px',
        color: '#EB6159',
        '&:hover': {
            color: '#EB6159',
            opacity: 0.7,
        },
    }

    const BoxStyle ={
        width: '100%',
        alignItems: 'flex-start',
        display: 'flex',
        justifyContent: 'space-between'
    }

    const handleFavo = () => {
        // DBに登録する？色変える？
        window.alert('お気に入りボタンクリック');
    }

    const FavoriteButton = () => {

        // TODO レイアウト調整がまだで、現在スマホサイズで表示すると見切れます
        const ButtonStyle = {
            width: '72px',
            height: '20px',
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

        return (
            <Button sx={ButtonStyle}>お気に入り<StarsSharpIcon fontSize={'small'} sx={{ marginLeft: "5px"}}/></Button>
        );
    }

    return (
        <Paper sx={PaperStyle}>
            <Box sx={BoxStyle}>
                <UserInfo user={user} />
                {
                    isDispFavoButoon ? <FavoriteButton onClick={handleFavo}/> : ''
                }
            </Box>
            {children}
        </Paper>
    )
}