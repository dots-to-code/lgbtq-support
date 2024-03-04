import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div>
      <h1>404</h1>
      <p>
        このページは存在しません。 <Link to="/">Home Page</Link>に戻りましょう
      </p>
    </div>
  );
}
