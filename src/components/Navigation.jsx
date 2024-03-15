import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Paper from '@mui/material/Paper';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FixedBottomNavigation() {
  const navButtonStyling = {
    padding: '0 0 0 0',
    minWidth: '75px',
    backgroundColor: '#EB6159',
    color: 'white !important',
    '&.Mui-selected': {
      backgroundColor: '#F6ADA8',
      fontSize: '10px',
    },
  };
  const pageUrls = ['/consultation', '/share', '/diagnosis', '/information', '/settings'];
  const location = useLocation();
  const [value, setValue] = React.useState(pageUrls.findIndex((url) => url === location.pathname) || 0);
  const ref = React.useRef(null);
  const navigate = useNavigate();
  const handleClickNavigation = (event, newValue) => {
    setValue(newValue);
    navigate(pageUrls[newValue]);
  };

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={5}>
        <BottomNavigation showLabels value={value} onChange={handleClickNavigation}>
          <BottomNavigationAction sx={navButtonStyling} label="相談" showLabel icon={<QuestionAnswerRoundedIcon />} />
          <BottomNavigationAction sx={navButtonStyling} label="シェア" showLabel icon={<MenuBookRoundedIcon />} />
          <BottomNavigationAction sx={navButtonStyling} label="診断" showLabel icon={<FavoriteBorderRoundedIcon />} />
          <BottomNavigationAction
            sx={navButtonStyling}
            label="お知らせ"
            showLabel
            icon={<NotificationsNoneRoundedIcon />}
          />
          <BottomNavigationAction
            sx={navButtonStyling}
            label="マイページ"
            showLabel
            icon={<AccountCircleRoundedIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}