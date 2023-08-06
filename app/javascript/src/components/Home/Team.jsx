import React, { useState, useEffect } from 'react';
import {
  Button, TextField, List, ListItem, Typography, Grid, Container,
} from '@mui/material';
// import CancelIcon from '@mui/icons-material/Cancel';
// import EditIcon from '@mui/icons-material/Edit';
// import CloseIcon from '@mui/icons-material/Close';

import {
  getTeams, createTeam,
} from '../../services/teamService';

function Team() {
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState('');

  const handleNewTeamSubmit = (event) => {
    event.preventDefault();
    if (newTeam === '') return; // don't add empty goals

    createTeam({ name: newGoal, category: 'Fitness' })
      .then((data) => setGoals([...goals, data]))
      .catch((error) => console.error('Error:', error));

    setNewTeam(''); // clear the new goal input field
  };

  useEffect(() => {
    getTeams()
      .then((data) => setTeams(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      Team

      <form onSubmit={handleNewTeamSubmit}>
        <TextField
          label="New Goal"
          variant="outlined"
          value={newGoal}
          onChange={(e) => setNewTeam(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Add Goal
        </Button>
      </form>
    </div>
  );
}

export default Team;
