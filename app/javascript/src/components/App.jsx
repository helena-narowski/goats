import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Home from './Home/Home';

function App() {
  return (
    <>
      <div>whassup</div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route render={() => <Navigate to="/" />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
