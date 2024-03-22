const functionPath = '/.netlify/functions';
const getData = (table) => {
  return fetch(`${functionPath}/get${table}`)
    .then((result) => result.json())
    .then((result) => {
      return result.records;
    })
    .catch((err) => console.error(err));
};

const getUserById = (id) => {
  return fetch(`${functionPath}/getUser?id=${id}`)
    .then((result) => result.json())
    .then((result) => {
      return result.fields;
    })
    .catch((err) => console.error(err));
};

const getConsultationById = (id) => {
  return fetch(`${functionPath}/getConsultationDetail?id=${id}`)
    .then((result) => result.json())
    .then((result) => {
      return result.fields;
    })
    .catch((err) => console.error(err));
};

export { getData, getUserById, getConsultationById };
