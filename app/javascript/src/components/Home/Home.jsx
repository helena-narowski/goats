import React, { useState, useEffect } from 'react';
import {
  Button, TextField, List, ListItem, Typography, Grid, Container,
  IconButton, ListItemSecondaryAction, Input, Select, MenuItem,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import {
  getGoals, createGoal, deleteGoal, updateGoal,
} from '../../services/goalService';

import Week from './Week';
import Team from './Teams';
import Goals from './Goals';

const goat1 = require('../../images/goat1.jpg');
const goat2 = require('../../images/goat2.jpeg');
const goat3 = require('../../images/goat3.jpeg');
const goat4 = require('../../images/goat4.jpeg');
// const goat6 = require('../../images/goat6.jpeg');
// const goat7 = require('../../images/goat7.jpeg');

function Home() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    getGoals()
      .then((data) => setGoals(data))
      .catch((error) => console.error(error));
  }, []);

  const onCreateGoal = (name) => {
    createGoal({ name, category: 'Fitness' })
      .then((data) => setGoals([...goals, data]))
      .catch((error) => console.error('Error:', error));
  };

  const onDeleteGoal = (id) => {
    deleteGoal(id)
      .then(() => setGoals(goals.filter((goal) => goal.id !== id)))
      .catch((error) => console.error('Error:', error));
  };

  const onUpdateGoal = (id, editedName, editedCategory) => {
    updateGoal(id, { name: editedName, category: editedCategory })
      .then((data) => {
        setGoals(goals.map((goal) => (goal.id === data.goal.id ? data.goal : goal)));
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <Container className="welcome" maxWidth="md">
        <Typography variant="h1">Welcome to Goats!</Typography>
      </Container>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <img width={475} height={475} src={goat1} alt="goat" />
        </Grid>
        <Grid item xs={3}>
          <img width={475} height={475} src={goat2} alt="goat" />
        </Grid>
        <Grid item xs={3}>
          <img width={475} height={475} src={goat3} alt="goat" />
        </Grid>
        <Grid item xs={3}>
          <img width={475} height={475} src={goat4} alt="goat" />
        </Grid>
      </Grid>

      <Typography variant="h2">Goals</Typography>
      <Goals
        goals={goals}
        onCreateGoal={onCreateGoal}
        onDeleteGoal={onDeleteGoal}
        onUpdateGoal={onUpdateGoal}
      />
      <Team />
      <Week goals={goals} />
    </div>
  );
}

export default Home;
