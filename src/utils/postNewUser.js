const postNewUser = (payload) => {
  return fetch(`/.netlify/functions/postNewUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((result) => {
      return result.records;
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Rethrow the error to handle it further if needed
    });
};

export { postNewUser };
