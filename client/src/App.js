import React, { Component } from 'react';
import Header from './components/header/header';
import {Container,Button} from 'react-bootstrap';
import {Route,Switch} from 'react-router-dom';
import Landing from './containers/landing/landing';
import Signup from './containers/signup/signup';
import Login from './containers/login/login';
import About from './containers/about/about';
import axios from 'axios';


class App extends Component {
 state = {
  };
  render() {
    return (
       <div className="App">
         <Header/>
         <header>
           <Switch>
            <Route path="/" exact component = {Landing}/>
            <Route path="/about" component = {About}/>
            <Route path="/signup" component = {Signup}/>
            <Route path="/login" component = {Login}/>
           </Switch>
         </header>
       </div>
    );
  }
}

export default App;
