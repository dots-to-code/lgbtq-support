import { Box, Stack, Typography } from '@mui/material';
import LoginButton from '../components/LoginButton';

const TitleStyle = {
  fontSize: '80px',
  fontFamily: '"Bungee", sans-serif',
  fontWeight: 900,
  textShadow: '5px 5px 0 #847c7c',
  textTransform: 'uppercase',
  color: '#EB6159',
  lineHeight: 0.9,
};

export default function Login() {
  return (
    <Stack sx={{ textAlign: 'center', height: '100vh', justifyContent: 'space-evenly' }}>
      <Box sx={{ margin: '20px 0' }}>
        <Typography sx={TitleStyle}>PEN</Typography>
        <Typography sx={TitleStyle}>FAM</Typography>
      </Box>
      <Typography sx={{ fontSize: '1.3rem' }}>ペンファムへようこそ！</Typography>
      <LoginButton />
      <img alt="penfam logo" src="/src/assets/PENFAM.png" style={{ maxWidth: '300px', margin: '0 0 0 auto' }} />
    </Stack>
  );
}
