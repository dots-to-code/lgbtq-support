import { useState, useEffect } from 'react';
import { getData } from '../utils/getData';
import FixedBottomNavigation from '../components/Navigation';

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
      <li>
        <a href="/.netlify/functions/hello?name=PenFamily">Hello World</a>
      </li>
      <FixedBottomNavigation />
    </div>
  );
}
