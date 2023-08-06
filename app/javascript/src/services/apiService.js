const baseUrl = window.location.origin;

const token = document.getElementsByName('csrf-token')[0]?.content;

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-CSRF-Token': token,
};

const apiFetch = async (url, options) => {
  const response = await fetch(`${baseUrl}/${url}`, {
    headers,
    ...options,
  });

  const result = await response.json();

  if (!response.ok) {
    // throw new Error(`HTTP error! status: ${response.status}`);
    throw new Error(`Error! ${result.error}`);
  }

  return result;
};

export default apiFetch;
