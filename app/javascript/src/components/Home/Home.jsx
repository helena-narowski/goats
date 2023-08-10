import React, { useState, useEffect, useContext } from 'react';
import {
  Typography, Grid, Button,
} from '@mui/material';

import Week from './Week';
import Team from './Teams';
import Goals from './Goals';
import Goats from './Goats';

import { UserContext } from '../../contexts/UserContext';

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Goats showSignUp={!user} />
      {user && (
        <>

          {/* <Goals /> */}
          {/* <Team /> */}
          <Week goals={[]} />
        </>
      )}
    </div>

  );
}

export default Home;
