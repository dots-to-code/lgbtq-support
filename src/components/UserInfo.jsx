import { GENDER } from '../constants';
import { Box, Typography } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export const UserInfo = ({ user, hiddenChildren = false }) => {
  const IconStyle = {
    color: '#393532',
    mr: 1,
  };

  const RootStyle = {
    display: 'flex',
    alignItems: 'flex-start', // 上揃え
    margin: '10px',
    justifyContent: 'flex-start', // 左寄せ
  };

  const UserInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const ChildrenStyle = {
    fontSize: '10px',
  };

  const displayChilden = (children) => {
    if (children && children.length > 0) {
      return children.map((child, index) => {
        const birthday = new Date(child.birthday);
        const today = new Date();
        const age = today.getFullYear() - birthday.getFullYear();
        return `${age}さい ${GENDER[child.gender]}${children.length - 1 > index ? ' / ' : ''}`;
      });
    }
    return null;
  };

  return (
    <>
      <Box sx={RootStyle}>
        <AccountCircleRoundedIcon fontSize={'large'} sx={IconStyle} />
        <Box sx={UserInfoStyle}>
          <Typography sx={{ fontSize: '15px' }}>{user.name}</Typography>
          {hiddenChildren ? <></> : <Typography sx={ChildrenStyle}>{displayChilden(user.children)}</Typography>}
        </Box>
      </Box>
    </>
  );
};
