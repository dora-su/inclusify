import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import TextPage from "./components/TextPage/textpage"
import Landing from "./components/LandingPage/landing"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
  }


  render() {
    return (
      <Router>
      <div>
        <div className="nav-bar">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/app">About</Link>
            </li>
          </ul>
        </nav>
        </div>
        <Switch>
          <Route path="/app">
            <TextPage />
          </Route>
          <Route path="/">
            <Landing/>
          </Route>
        </Switch>
      </div>
      </Router>

    );
  }
}
export default App;
