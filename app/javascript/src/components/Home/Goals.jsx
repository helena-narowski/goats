import React, { useState } from 'react';

import PropTypes from 'prop-types';
import {
  List, ListItem, ListItemSecondaryAction, IconButton, Input, Select, MenuItem, Button, TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';

import { CATEGORIES } from '../../constants';

function Goals({
  goals, onCreateGoal, onDeleteGoal, onUpdateGoal,
}) {
  const [newGoal, setNewGoal] = useState('');
  const [editingGoal, setEditingGoal] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedCategory, setEditedCategory] = useState('');

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

Goals.propTypes = {
  goals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
  })).isRequired,
  onCreateGoal: PropTypes.func.isRequired,
  onDeleteGoal: PropTypes.func.isRequired,
  onUpdateGoal: PropTypes.func.isRequired,
};

export default Goals;
