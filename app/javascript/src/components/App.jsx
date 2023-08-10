import React, { useState, useEffect } from 'react';

import {
  Typography, Box, AppBar, Toolbar, IconButton, Button,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from 'react-router-dom';

import { styled } from '@mui/system';
import Home from './Home/Home';
import Teams from './Home/Teams';
import Goals from './Home/Goals';
import SignIn from './Home/SignIn';
import SignUp from './Home/Signup';

import { getCurrentUser, signOut } from '../services/usersService';

import { UserContext } from '../contexts/UserContext';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'purple',
});

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then((data) => setUser(data));
  }, []);

  const onSignOut = () => {
    signOut().then(() => setUser(null));
  };

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <StyledAppBar position="sticky">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography sx={{ flexGrow: 1 }}>
              <Button component={Link} to="/home" color="inherit">Home</Button>
              <Button component={Link} to="/my_teams" color="inherit">Teams</Button>
              <Button component={Link} to="/my_goals" color="inherit">Goals</Button>
            </Typography>

            {user && (
              <>
                <Typography>{user.email}</Typography>
                <Button onClick={onSignOut} color="inherit">Sign Out</Button>
              </>
            )}

            {!user && (
              <Button component={Link} to="/signin" color="inherit">Signin</Button>
            )}

          </Toolbar>
        </StyledAppBar>
      </Box>

      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/my_teams" element={<Teams />} />
              <Route path="/my_goals" element={<Goals />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              {/* Default redirect to signin if no user is logged in */}
              {/* <Route path="*" element={<Navigate to="/signin" replace />} /> */}
            </>
          )}
        </Routes>
      </UserContext.Provider>
    </Router>

  );
}

export default App;
