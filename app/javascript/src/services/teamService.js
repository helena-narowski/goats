// eslint-disable-next-line import/prefer-default-export
import apiFetch from './apiService';

const RESOURCE = 'teams';

export const getTeams = () => {
  const response = apiFetch(RESOURCE);

  return response;
};

export const createTeam = (teamData) => {
  const data = {
    method: 'POST',
    body: JSON.stringify({ team: teamData }),
  };

  const response = apiFetch(RESOURCE, data);

  return response;
};
