import React, { useState, useEffect } from 'react';
import {
  Button, TextField, List, ListItem, Typography, Grid, Container,
} from '@mui/material';

import { getUserGoals } from '../../services/apiService';

import styles from './styles';

// import { goatImage } from '../../images/download.jpg';
const goat1 = require('../../images/goat1.jpg');
const goat2 = require('../../images/goat2.jpeg');
const goat3 = require('../../images/goat3.jpeg');
const goat4 = require('../../images/goat4.jpeg');
const goat6 = require('../../images/goat6.jpeg');
const goat7 = require('../../images/goat7.jpeg');

function Home() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  const handleNewGoalSubmit = (event) => {
    event.preventDefault();
    if (newGoal === '') return; // don't add empty goals
    setGoals([...goals, newGoal]);
    setNewGoal(''); // clear the new goal input field
  };

  useEffect(() => {
    getUserGoals()
      .then((data) => setGoals(data))
      .catch((error) => console.error(error));
  }, []);

  console.log(styles);

  return (
    <div>
      <Container className={styles.welcomeBanner} maxWidth="md">
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
      <List>
        {goals.map((goal) => (
          <ListItem key={goal.id}>
            {goal.name}
            {' '}
            -
            {' '}
            {goal.category}
          </ListItem>
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
