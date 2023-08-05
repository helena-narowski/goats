const url = 'http://localhost:3000/goals';

// eslint-disable-next-line import/prefer-default-export
export async function getUserGoals() {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    const goals = await response.json();
    console.log(goals);
    return goals;
  }
}
