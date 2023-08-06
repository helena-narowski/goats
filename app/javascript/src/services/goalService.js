// eslint-disable-next-line import/prefer-default-export
import apiFetch from './apiService';

const RESOURCE = 'goals';

export const getGoals = () => {
  const response = apiFetch(RESOURCE);

  return response;
};

export const createGoal = (goalData) => {
  const data = {
    method: 'POST',
    body: JSON.stringify({ goal: goalData }),
  };

  const response = apiFetch(RESOURCE, data);

  return response;
};

export const updateGoal = (goalId, updatedGoalData) => {
  const data = {
    method: 'PATCH',
    body: JSON.stringify({ goal: updatedGoalData }),
  };

  const response = apiFetch(`${RESOURCE}/${goalId}`, data);

  return response;
};

export const deleteGoal = async (goalId) => {
  const data = {
    method: 'DELETE',
  };
  const response = apiFetch(`${RESOURCE}/${goalId}`, data);

  return response;
};
