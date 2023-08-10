import apiFetch from './apiService';

const RESOURCE = 'users';

// eslint-disable-next-line import/prefer-default-export

export const getCurrentUser = async () => {
  const response = apiFetch(`${RESOURCE}/current_user`);

  return response;
};

export const signup = async (email, password) => {
  const userData = {
    email,
    password,
  };

  const data = {
    method: 'POST',
    body: JSON.stringify({ user: userData }),
  };

  const response = apiFetch(RESOURCE, data);

  return response;
};

export const signin = async (email, password) => {
  const userData = {
    email,
    password,
  };

  const data = {
    method: 'POST',
    body: JSON.stringify({ user: userData }),
  };

  const response = apiFetch(`${RESOURCE}/sign_in`, data);

  return response;
};

export const signOut = async () => {
  const data = {
    method: 'DELETE',
  };

  const response = apiFetch(`${RESOURCE}/sign_out`, data);

  return response;
};
