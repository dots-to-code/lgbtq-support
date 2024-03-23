import { BaseLayout } from '../components/BaseLayout';
import { SubTitleStyle } from '../styles';
import { Box, Container } from '@mui/material';

export default function Share() {
  return (
    <BaseLayout>
      <h1 style={{ alignSelf: 'center', ...SubTitleStyle }}>Share</h1>
      <Container maxWidth="sm" sx={{ p: 0, position: 'relative' }}>
        <Box sx={{ height: '240px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          comming soon...
        </Box>
      </Container>
    </BaseLayout>
  );
}
