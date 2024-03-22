const getData = (funcName) => {
  return fetch(`/.netlify/functions/${funcName}`)
    .then((result) => result.json())
    .then((result) => {
      return result.records;
    })
    .catch((err) => console.error(err));
};

export { getData };
