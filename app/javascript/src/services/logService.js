// eslint-disable-next-line import/prefer-default-export
import apiFetch from './apiService';

const RESOURCE = 'logs';

export const getLogs = () => {
  const response = apiFetch(RESOURCE);

  return response;
};

export const createLog = (logData) => {
  const data = {
    method: 'POST',
    body: JSON.stringify({ log: logData }),
  };

  const response = apiFetch(RESOURCE, data);

  return response;
};

export const updateLog = (logId, updatedLogData) => {
  const data = {
    method: 'PATCH',
    body: JSON.stringify({ log: updatedLogData }),
  };

  const response = apiFetch(`${RESOURCE}/${logId}`, data);

  return response;
};

export const deleteLog = async (logId) => {
  const data = {
    method: 'DELETE',
  };
  const response = apiFetch(`${RESOURCE}/${logId}`, data);

  return response;
};
