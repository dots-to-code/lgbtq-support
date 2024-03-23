const functionPath = '/.netlify/functions';

const getData = (funcName) => {
  return fetch(`/.netlify/functions/${funcName}`)
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

const getConsultationResponseById = (id) => {
  return fetch(`${functionPath}/getConsultationResponse`)
    .then((result) => result.json())
    .then((result) => {
      return result.records;
    })
    .catch((err) => console.error(err));
};

export { getData, getUserById, getConsultationById, getConsultationResponseById };
