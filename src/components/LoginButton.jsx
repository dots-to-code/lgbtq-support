import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { ButtonStyle } from './styles';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button style={ButtonStyle} onClick={() => loginWithRedirect()}>
      登録する / ログイン
    </Button>
  );
};

export default LoginButton;
