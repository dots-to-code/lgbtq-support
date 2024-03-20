import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { ButtonStyle } from './styles';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button style={ButtonStyle} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      ログアウト
    </Button>
  );
};

export default LogoutButton;
