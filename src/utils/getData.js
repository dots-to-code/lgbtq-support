export async function getData() {
  const rawResponse = await fetch('http://localhost:8888/.netlify/functions/hello?name=you');
  const data = await rawResponse.json();
  return data;
}
