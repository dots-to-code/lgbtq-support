const functionPath = '/.netlify/functions';

const getData = (funcName) => {
  return fetch(`${functionPath}/${funcName}`)
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

const getFavriteByUserIdConsultationId = (userId, consultationId) => {
  return fetch(`${functionPath}/getFavriteByUserIdConsultationId?userId=${userId}&consultationId=${consultationId}`)
    .then((result) => result.json())
    .then((result) => {
      return result.records;
    })
    .catch((err) => console.error(err));
};

const getFavriteByUserId = (userId) => {
  return fetch(`${functionPath}/getFavriteByUserId?userId=${userId}`)
    .then((result) => result.json())
    .then((result) => {
      return result.records;
    })
    .catch((err) => console.error(err));
};


const getConsultationsByIds = (consultationIds) => {
  const filterFormula = `OR(${consultationIds.map(id => `RECORD_ID()='${id}'`).join(',')})`;
  const queryParams = encodeURIComponent(filterFormula);

  return fetch(`${functionPath}/getConsultationsByIds?filterByFormula=${queryParams}`)
    .then((result) => result.json())
    .then((result) => {
      return result.records;
    })
    .catch((err) => console.error(err));
};

export { getData, getUserById, getConsultationById, getConsultationResponseById, getFavriteByUserIdConsultationId, getFavriteByUserId, getConsultationsByIds };
