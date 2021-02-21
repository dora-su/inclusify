import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import TextPage from "./components/TextPage/textpage"
import Header from "./components/Header/Header"
import Landing from "./components/LandingPage/landing"
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
  useLocation,
  useParams
} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'


function Content () {
  const location = useLocation()

  return (
    <div className='fill content'>
      <TransitionGroup>
        <CSSTransition
          timeout={300}
          classNames='fade'
          key={location.key}
          location={location}
          exit={false}
        >
          <Switch location={location}>
          
          <Route exact path="/app"><TextPage/></Route>
          <Route exact path="/"><Landing/></Route>
       
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

class App extends React.Component {
  
  render() {
    return (
      <Router>
      <Header/>
      <Content/>
      </Router>

    );
  }
}
export default App;
