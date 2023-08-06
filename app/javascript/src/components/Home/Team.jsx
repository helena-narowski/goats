import React, { useState, useEffect } from 'react';
import {
  // eslint-disable-next-line no-unused-vars
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

    createTeam({ name: newTeam, category: 'Fitness' })
      .then((data) => setTeams([...teams, data]))
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
      <Typography variant="h2">Teams</Typography>
      {teams.map((team) => (
        <ListItem key={team.id}>
          <>
            {team.name}
            {' '}
          </>
        </ListItem>
      ))}
      <form onSubmit={handleNewTeamSubmit}>
        <TextField
          label="Team Name"
          variant="outlined"
          value={newTeam}
          onChange={(e) => setNewTeam(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Add Team
        </Button>
      </form>
    </div>
  );
}

export default Team;
