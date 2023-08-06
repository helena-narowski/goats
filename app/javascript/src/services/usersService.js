import apiFetch from './apiService';

const RESOURCE = 'users';

// eslint-disable-next-line import/prefer-default-export
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

// export const signin = async (email, password) => {
//   try {
//     const response = await instance.post('/users/sign_in', {
//       user: {
//         email,
//         password,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
