const postPrompt = (payload, funcName) => {
  return fetch(`/.netlify/functions/${funcName}`, {
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
      return result;
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    });
};

export { postPrompt };
