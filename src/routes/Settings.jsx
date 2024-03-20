import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';
import { BaseLayout } from '../components/BaseLayout';
import { Box, Typography, Stack } from '@mui/material';
import { SubTitleStyle } from '../styles';

export default function Settings() {
  const { user } = useAuth0();

  const LabelStyle = { fontWeight: 600 };

  return (
    <BaseLayout>
      <Stack sx={{ height: '90vh' }}>
        <h1 style={{ alignSelf: 'center', ...SubTitleStyle }}>Account</h1>
        <Box sx={{ margin: '50px 20px' }}>
          <Typography>
            <span style={LabelStyle}>名前：</span>
            {user.name}
          </Typography>
          <Typography>
            <span style={LabelStyle}>メール：</span>
            {user.email}
          </Typography>
          <Typography>
            <span style={LabelStyle}>ニックネーム：</span>
            {user.nickname}
          </Typography>
        </Box>
        <LogoutButton style={{ alignSelf: 'center' }} />
      </Stack>
    </BaseLayout>
  );
}
