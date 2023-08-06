import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Home from './Home/Home';
import Teams from './Home/Teams';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route render={() => <Navigate to="/" />} />
      </Routes>
    </Router>

  );
}

export default App;
