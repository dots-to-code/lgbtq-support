import { useState, useEffect } from 'react';
import { getData } from '../utils/getData';
import FixedBottomNavigation from '../components/Navigation';
import Loading from '../components/Loading';

export default function Information() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData().then((airtableData) => setData(airtableData));
    console.log('DATA', data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Welcome Home</h1>
      <li>{data ? data : <Loading />}</li>
      <li>
        <a href="/.netlify/functions/hello?name=you">Hello World</a>
      </li>
      <FixedBottomNavigation />
    </div>
  );
}
