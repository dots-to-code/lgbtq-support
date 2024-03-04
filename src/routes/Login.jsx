import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      <Link to="/home">
        <button>Login</button>
      </Link>
    </div>
  );
}
