import FixedBottomNavigation from '../components/Navigation';
import { Box, Container } from '@mui/material';

export const BaseLayout = ({ children }) => {
  return (
    <Container sx={{ padding: '10px 20px' }}>
      <Box>{children}</Box>
      <FixedBottomNavigation />
    </Container>
  );
};
