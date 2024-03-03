import { Link } from 'react-router-dom';

function App() {
  const styledLink = {
    border: '1px solid black',
    borderRadius: '6px',
    width: '300px',
    height: '120px',
    fontSize: '24px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p>概要 想いなど...</p>
      <Link style={styledLink} to="/consultation">
        相談画面
      </Link>
      <Link style={styledLink} to="/information">
        情報共有
      </Link>
      <Link style={styledLink} to="/diagnosis">
        好きなもの診断
      </Link>
    </div>
  );
}

export default App;
