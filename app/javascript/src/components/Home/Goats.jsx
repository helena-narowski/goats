import React from 'react';

import {
  Typography, Button, Grid,
} from '@mui/material';

import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const goat1 = require('../../images/goat1.jpg');
const goat2 = require('../../images/goat2.jpeg');
const goat3 = require('../../images/goat3.jpeg');
const goat4 = require('../../images/goat4.jpeg');
const goat5 = require('../../images/goat5.jpeg');
const goat6 = require('../../images/goat6.jpeg');
const goat7 = require('../../images/goat7.jpeg');
const goat8 = require('../../images/goat8.jpeg');
const goat9 = require('../../images/goat9.jpeg');
const goat10 = require('../../images/goat10.jpeg');
const goat11 = require('../../images/goat11.jpeg');

const StyledDiv = styled('div')({
  position: 'relative',
});

const StyledTypography = styled(Typography)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'black', // #247e7a
  fontWeight: 'bold',
  textShadow: '10px 10px 10px rgba(0, 0, 0, 0.5)',
  zIndex: 2,
});

// use flexbox instead here
const StyledButton = styled(Button)({
  position: 'absolute',
  top: '80%',
  left: '50%',
  backgroundColor: 'purple',
  color: 'white',
  transform: 'translate(-50%, -50%)',
  textShadow: '10px 10px 10px rgba(0, 0, 0, 0.5)',
  zIndex: 3,
  width: '300px',
  fontSize: '1.5rem',
});

const StyledImage = styled('img')({
  opacity: 0.3,
});

function Goats({ showSignUp }) {
  const welcomeText = showSignUp ? 'Welcome to Goats!' : 'Welcome back, esteemed goat feeder.';
  const variant = showSignUp ? 'h1' : 'h3';
  return (
    <>
      <StyledDiv fixed>
        <StyledTypography variant={variant}>{welcomeText}</StyledTypography>
        {showSignUp && (
        <StyledButton component={Link} size="large" to="/signin" color="inherit">Sign In </StyledButton>
        )}

        <Grid container spacing={2}>

          <Grid item xs={3}>
            <StyledImage width={475} height={475} src={goat1} alt="goat" />
          </Grid>
          <Grid item xs={3}>
            <StyledImage width={475} height={475} src={goat2} alt="goat" />
          </Grid>
          <Grid item xs={3}>
            <StyledImage width={475} height={475} src={goat3} alt="goat" />
          </Grid>
          <Grid item xs={3}>
            <StyledImage width={475} height={475} src={goat4} alt="goat" />
          </Grid>

        </Grid>
      </StyledDiv>
      {showSignUp && (
      <StyledDiv fixed>
        <Grid container spacing={2}>

          <Grid item xs={3}>
            <StyledImage width={475} height={475} src={goat9} alt="goat" />
          </Grid>
          <Grid item xs={3}>
            <StyledImage width={475} height={475} src={goat10} alt="goat" />
          </Grid>
          <Grid item xs={3}>
            <StyledImage width={475} height={475} src={goat11} alt="goat" />
          </Grid>
          <Grid item xs={3}>
            <StyledImage width={475} height={475} src={goat8} alt="goat" />
          </Grid>

        </Grid>
      </StyledDiv>
      )}
    </>
  );
}

export default Goats;
