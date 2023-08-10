import React, { useState, useEffect } from 'react';

import {
  List, ListItem, ListItemSecondaryAction, IconButton, Input,
  Select, MenuItem, Button, TextField, Typography,

} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';

import { CATEGORIES } from '../../constants';

import {
  getGoals, createGoal, deleteGoal, updateGoal,
} from '../../services/goalService';

function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [editingGoal, setEditingGoal] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedCategory, setEditedCategory] = useState('');

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
    if (newGoal === '') return;

    onCreateGoal(newGoal);

    setNewGoal('');
  };

  const handleDeleteGoal = (id) => {
    onDeleteGoal(id);
  };

  const handleEditedGoalSubmit = () => {
    onUpdateGoal(editingGoal.id, editedName, editedCategory);

    setEditingGoal(null);
  };

  return (
    <div>
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
                  {CATEGORIES.map((category) => (
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
    </div>
  );
}

// Goals.propTypes = {
//   goals: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     name: PropTypes.string,
//     category: PropTypes.string,
//   })).isRequired,
//   onCreateGoal: PropTypes.func.isRequired,
//   onDeleteGoal: PropTypes.func.isRequired,
//   onUpdateGoal: PropTypes.func.isRequired,
// };

export default Goals;
