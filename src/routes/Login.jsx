import { Box, Stack, Typography } from '@mui/material';
import LoginButton from '../components/LoginButton';
import { TitleStyle } from '../styles';

export default function Login() {
  return (
    <Stack
      sx={{ textAlign: 'center', height: '100vh', justifyContent: 'space-evenly', maxWidth: '700px', margin: '0 auto' }}
    >
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
