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

export { getData, getUserById, getConsultationById, getConsultationResponseById };
