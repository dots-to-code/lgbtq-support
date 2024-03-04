import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { createClient } from '@supabase/supabase-js';

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

  // const supabase = createClient('https://<project>.supabase.co', '<your-anon-key>');

  // const [countries, setCountries] = useState([]);

  // useEffect(() => {
  //   getCountries();
  // }, []);

  // async function getCountries() {
  //   const { data } = await supabase.from('countries').select();
  //   setCountries(data);
  // }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul> */}
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
