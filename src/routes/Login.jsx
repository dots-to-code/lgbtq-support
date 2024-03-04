import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      <Link to="/information">
        <button>Login</button>
      </Link>
    </div>
  );
}
