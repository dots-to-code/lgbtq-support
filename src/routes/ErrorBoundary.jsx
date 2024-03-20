import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div>
      <h1>⚠️エラー</h1>
      <p>
        <Link to="/">Home Page</Link>に戻りましょう
      </p>
    </div>
  );
}
