import React, { useState } from 'react';
import {
  Button, TextField, List, ListItem, Typography,
} from '@mui/material';

function Home() {
  const [goals, setGoals] = useState(['Goal 1', 'Goal 2', 'Goal 3']);
  const [newGoal, setNewGoal] = useState('');

  const handleNewGoalSubmit = (event) => {
    event.preventDefault();
    if (newGoal === '') return; // don't add empty goals
    setGoals([...goals, newGoal]);
    setNewGoal(''); // clear the new goal input field
  };

  return (
    <div>
      <Typography variant="h1">Welcome to Goats!</Typography>
      <Typography variant="h2">Goals</Typography>
      <List>
        {goals.map((goal) => (
          <ListItem key={goal}>{goal}</ListItem>
        ))}
      </List>
      <form onSubmit={handleNewGoalSubmit}>
        <TextField
          label="New Goal"
          variant="outlined"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Add Goal
        </Button>
      </form>
    </div>
  );
}

export default Home;
