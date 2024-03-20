const getData = (table) => {
  return fetch(`/.netlify/functions/get${table}`)
    .then((result) => result.json())
    .then((result) => {
      return result.records;
    })
    .catch((err) => console.error(err));
};

export { getData };
