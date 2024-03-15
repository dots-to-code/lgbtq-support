import FixedBottomNavigation from '../components/Navigation';
import Box from '@mui/material/Box';

export const BaseLayout = ({ children }) => {
  return (
    <>
      <Box>{children}</Box>
      <FixedBottomNavigation />
    </>
  );
};
