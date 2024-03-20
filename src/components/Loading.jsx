import { Stack, Typography } from '@mui/material';

const Loading = ({ size }) => {
  return (
    <Stack sx={{ padding: '20vh 0' }}>
      <img
        alt="penfam logo"
        src="/src/assets/PENFAM.gif"
        style={{ height: `${size ? size : ''}`, maxWidth: '100px', margin: '0 auto' }}
      />
      <Typography style={{ textAlign: 'center' }}>読み込み中...</Typography>
    </Stack>
  );
};

export default Loading;
