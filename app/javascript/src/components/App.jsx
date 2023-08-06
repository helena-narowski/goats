import React from 'react';

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
import Login from './Home/Login';
import SignUp from './Home/Signup';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'purple',

});

function App() {
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

            {/* <Button underline="none" component={Link} to="/your-route">Goats</Button> */}
            <Typography sx={{ flexGrow: 1 }}>
              <Button component={Link} to="/home" color="inherit">Home</Button>
            </Typography>
            {/* <Typography sx={{ flexGrow: 1 }}>
              <Button component={Link} to="/my_teams" color="inherit">Teams</Button>
            </Typography> */}

            <Button component={Link} to="/login" color="inherit">Login</Button>
          </Toolbar>
        </StyledAppBar>
      </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my_teams" element={<Teams />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/sign_in" element={<Teams />} /> */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>

  );
}

export default App;
