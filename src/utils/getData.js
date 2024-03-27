const functionPath = '/api'; // Assuming your Vercel functions are in the '/api' directory

const getData = async (funcName) => {
  try {
    const result = await fetch(`${functionPath}/${funcName}`);
    const data = await result.json();
    return data.records;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getUserById = async (id) => {
  try {
    const result = await fetch(`${functionPath}/getUser?id=${id}`);
    const data = await result.json();
    return data.fields;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const getConsultationById = async (id) => {
  try {
    const result = await fetch(`${functionPath}/getConsultationDetail?id=${id}`);
    const data = await result.json();
    return data.fields;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const getConsultationResponseById = async (id) => {
  try {
    const result = await fetch(`${functionPath}/getConsultationResponse?id=${id}`);
    const data = await result.json();
    return data.records;
  } catch (error) {
    console.error(error);
    return [];
  }
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
  const filterFormula = `OR(${consultationIds.map((id) => `RECORD_ID()='${id}'`).join(',')})`;
  const queryParams = encodeURIComponent(filterFormula);

  return fetch(`${functionPath}/getConsultationsByIds?filterByFormula=${queryParams}`)
    .then((result) => result.json())
    .then((result) => {
      return result.records;
    })
    .catch((err) => console.error(err));
};

export {
  getData,
  getUserById,
  getConsultationById,
  getConsultationResponseById,
  getFavriteByUserIdConsultationId,
  getFavriteByUserId,
  getConsultationsByIds,
};
