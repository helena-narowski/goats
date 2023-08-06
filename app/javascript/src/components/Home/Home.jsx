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

// import './home.css';

const goat1 = require('../../images/goat1.jpg');
const goat2 = require('../../images/goat2.jpeg');
const goat3 = require('../../images/goat3.jpeg');
const goat4 = require('../../images/goat4.jpeg');
// const goat6 = require('../../images/goat6.jpeg');
// const goat7 = require('../../images/goat7.jpeg');

function Home() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [editingGoal, setEditingGoal] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedCategory, setEditedCategory] = useState('');

  const categories = ['Fitness', 'Cooking', 'Learning', 'Travel'];

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setEditedName(goal.name);
    setEditedCategory(goal.category);
  };

  const handleCancelEdit = () => {
    setEditingGoal(null);
  };

  const handleNewGoalSubmit = (event) => {
    event.preventDefault();
    if (newGoal === '') return; // don't add empty goals

    createGoal({ name: newGoal, category: 'Fitness' })
      .then((data) => setGoals([...goals, data]))
      .catch((error) => console.error('Error:', error));

    setNewGoal(''); // clear the new goal input field
  };

  const handleDeleteGoal = (id) => {
    deleteGoal(id)
      .then(() => setGoals(goals.filter((goal) => goal.id !== id)))
      .catch((error) => console.error('Error:', error));
  };

  const handleEditedGoalSubmit = () => {
    updateGoal(editingGoal.id, { name: editedName, category: editedCategory })
      .then((data) => {
        setGoals(goals.map((goal) => (goal.id === data.goal.id ? data.goal : goal)));
        setEditingGoal(null);
      })
      .catch((error) => console.error('Error:', error));
  };

  useEffect(() => {
    getGoals()
      .then((data) => setGoals(data))
      .catch((error) => console.error(error));
  }, []);

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
      <List>
        {goals.map((goal) => (
          <ListItem key={goal.id}>
            {editingGoal?.id === goal.id ? (
              <>
                <Input value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                <Select
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)}
                >
                  {/* write me a loop for these menu items */}

                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
                <Button onClick={handleEditedGoalSubmit}>Save</Button>
                <IconButton onClick={handleCancelEdit} edge="end" aria-label="cancel">
                  <CloseIcon />
                </IconButton>
              </>
            ) : (
              <>
                {goal.name}
                {' '}
                -
                {' '}
                {goal.category}
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleEditGoal(goal)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteGoal(goal.id)} aria-label="delete">
                    <CancelIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </>
            )}
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

      <Week goals={goals} />
    </div>
  );
}

export default Home;
