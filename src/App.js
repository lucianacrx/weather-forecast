import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import HomeContainer from './components/Home/HomeContainer.js';
import DetailContainer from './components/Detail/DetailContainer.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeContainer} />
        <Route path="/:id" exact component={DetailContainer} />
      </Switch>
    </Router>
  );
}

export default App;
