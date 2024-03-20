import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const ButtonStyle = {
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    backgroundColor: '#EB6159',
    height: '60px',
    width: '265px',
    margin: '0 auto',
  };

  return (
    <button style={ButtonStyle} onClick={() => loginWithRedirect()}>
      ログイン
    </button>
  );
};

export default LoginButton;
