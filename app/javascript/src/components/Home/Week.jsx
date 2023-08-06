import React, { Fragment, useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Snackbar,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import BackspaceIcon from '@mui/icons-material/Backspace';
import Alert from '@mui/material/Alert';

import {
  getLogs, createLog, deleteLog, updateLog,
} from '../../services/logService';

function Week({ goals }) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [weekDates, setWeekDates] = useState({});
  const [logs, setLogs] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const dates = {};
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + diff + i);
      const dayName = daysOfWeek[i];
      dates[dayName] = date.toLocaleDateString();
      // This will format the date as MM/DD/YYYY. Adjust the format as needed.
    }

    setWeekDates(dates);
  }, []);

  useEffect(() => {
    if (weekDates.length === 0) return;

    getLogs().then((data) => setLogs(data))
      .catch((error) => console.error(error));
  }, [weekDates]);

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

  return (
    <>
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

                {daysOfWeek.map((day) => (
                  <TableCell key={day}>
                    {getLogForGoal(goal, weekDates[day])
                      ? (
                        <div>
                          DONE!
                          <Button color="primary" onClick={() => handleClear(getLogForGoal(goal, weekDates[day]))}>
                            <BackspaceIcon />
                          </Button>
                        </div>
                      )
                      : (
                        <Button color="secondary" onClick={() => handleCheck(goal, weekDates[day])}>
                          <CheckIcon />
                        </Button>
                      )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
