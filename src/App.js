import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import Home from './components/Home/Home.js';
import Detail from './components/Detail/Detail.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:id" exact component={Detail} />
      </Switch>
    </Router>
  );
}

export default App;
