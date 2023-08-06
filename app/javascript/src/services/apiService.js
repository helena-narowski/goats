const baseUrl = window.location.href;

const token = document.getElementsByName('csrf-token')[0]?.content;

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-CSRF-Token': token,
};

const apiFetch = async (url, options) => {
  const response = await fetch(`${baseUrl}${url}`, {
    headers,
    ...options,
  });

  // idk if this works
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  // console.log(result);
  // return response.json();
  return result;
};

export default apiFetch;
