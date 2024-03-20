import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';
import { BaseLayout } from '../components/BaseLayout';
import { Typography, Stack } from '@mui/material';

export default function Settings() {
  const { user } = useAuth0();
  return (
    <BaseLayout>
      <Stack sx={{ height: '90vh' }}>
        <h1 style={{ alignSelf: 'center' }}>マイページ</h1>
        <Typography>名前：{user.name}</Typography>
        <Typography>メール：{user.email}</Typography>
        <LogoutButton style={{ alignSelf: 'center' }} />
      </Stack>
    </BaseLayout>
  );
}
