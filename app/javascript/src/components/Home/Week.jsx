import React, { Fragment, useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, Dialog, TextField, Box, Typography,
  Snackbar,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import BackspaceIcon from '@mui/icons-material/Backspace';
import Alert from '@mui/material/Alert';

import {
  getLogs, createLog, deleteLog, updateLog,
} from '../../services/logService';

import {
  getGoals,
} from '../../services/goalService';

function Week() {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [openModal, setOpenModal] = useState(false);
  const [currentLog, setCurrentLog] = useState(null);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [editedNote, setEditedNote] = useState('');

  const [weekDates, setWeekDates] = useState({});
  const [logs, setLogs] = useState([]);
  const [goals, setGoals] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    // Reduce is like ruby's inject or each with object
    const dates = daysOfWeek.reduce((acc, dayName, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + diff + i);
      acc[dayName] = date.toLocaleDateString();
      return acc;
    }, {});

    setWeekDates(dates);
  }, []);

  useEffect(() => {
    if (weekDates.length === 0) return;

    getLogs().then((data) => setLogs(data))
      .catch((error) => console.error(error));
  }, [weekDates]);

  useEffect(() => {
    getGoals()
      .then((data) => setGoals(data))
      .catch((error) => console.error(error));
  }, []);

  const getIsoDate = (date) => new Date(date).toISOString().split('T')[0];

  const handleCheck = (goal, date) => {
    const isoDate = getIsoDate(date);

    createLog({ goal_id: goal.id, date: isoDate })
      .then((data) => setLogs([...logs, data]))
      .catch((error) => {
        setSnackbarMessage(error.message);
        setOpenSnackbar(true);
      });
  };

  const getLogForGoal = (goal, date) => {
    const isoDate = getIsoDate(date);
    // const isoDate = date;
    const logForGoal = logs.find((log) => log.goal_id === goal.id && log.date === isoDate);
    return logForGoal;
  };

  const handleClear = (log) => {
    deleteLog(log.id)
      .then(() => setLogs(logs.filter((l) => l.id !== log.id)))
      .catch((error) => {
        setSnackbarMessage(error);
        setOpenSnackbar(true);
      });
  };

  const handleEditLog = (id, note) => {
    updateLog(id, { note })
      .then(() => {
        setLogs(logs.map((l) => (l.id === id ? { ...l, note } : l)));
      })
      .catch((error) => {
        setSnackbarMessage(error);
        setOpenSnackbar(true);
      });
  };

  return (
    <>
      <Typography variant="h2">This Week</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Goal</TableCell>
              {daysOfWeek.map((day) => (
                <TableCell key={day}>
                  {day}
                  {' '}
                  {weekDates[day]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal) => (
              <TableRow key={goal.id}>
                <TableCell component="th" scope="row">
                  {goal.name}
                </TableCell>

                {daysOfWeek.map((day) => {
                  const logForGoal = getLogForGoal(goal, weekDates[day]);
                  return (
                    <TableCell key={day}>
                      {logForGoal
                        ? (
                          <div>
                            {logForGoal.note}
                            {' '}
                            DONE!
                            <Button color="primary" onClick={() => handleClear(logForGoal)}>
                              <BackspaceIcon />
                            </Button>
                            <IconButton onClick={() => {
                              setCurrentGoal(goal);
                              setEditedNote(logForGoal.note);
                              setCurrentLog(logForGoal);
                              setOpenModal(true);
                            }}
                            >
                              <EditIcon />
                            </IconButton>

                          </div>
                        )
                        : (
                          <Button color="secondary" onClick={() => handleCheck(goal, weekDates[day])}>
                            <CheckIcon />
                          </Button>
                        )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Box sx={{ width: 600 }}>
          {' '}
          <Typography variant="h6" component="h2">
            Edit note for
            {' '}
            {currentGoal?.name}
            {' '}
            on
            {' '}
            {currentLog?.date}
          </Typography>
          <TextField
            value={editedNote}
            onChange={(e) => setEditedNote(e.target.value)}
            label="Edit note"
          />
          <Button onClick={() => {
            handleEditLog(currentLog?.id, editedNote);
            setOpenModal(false);
          }}
          >
            Save
          </Button>
          <Button onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Box>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Week;
