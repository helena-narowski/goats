import React, { useState, useEffect } from 'react';
import {
  Typography, Grid, Container, Box, AppBar, Toolbar, IconButton, Button,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import { styled } from '@mui/system';

import { Link } from 'react-router-dom';

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

const StyledDiv = styled('div')({
  position: 'relative',
});

const StyledTypography = styled(Typography)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#fff',
  fontWeight: 'bold',
  textShadow: '10px 10px 10px rgba(0, 0, 0, 0.5)',
  zIndex: 2,

});

const StyledImage = styled('img')({
  opacity: 0.3,
});

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

      <StyledDiv fixed>
        {/* <StyledTypography variant="h1">Welcome to Goats!</StyledTypography> */}

        <Grid container spacing={2}>

          <Grid item xs={3}>
            <StyledImage width={475} height={475} src={goat1} alt="goat" />
          </Grid>
          <Grid item xs={3}>
            <StyledImage width={475} height={475} src={goat2} alt="goat" />
          </Grid>
          <Grid item xs={3}>
            <StyledImage width={475} height={475} src={goat3} alt="goat" />
          </Grid>
          <Grid item xs={3}>
            <StyledImage width={475} height={475} src={goat4} alt="goat" />
          </Grid>
        </Grid>
      </StyledDiv>

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
