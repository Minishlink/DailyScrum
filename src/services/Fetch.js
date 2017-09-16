export const handleFetchResponse = response => {
  if (!response.ok) {
    throw new Error(response.status);
  }

  return response.json();
};
