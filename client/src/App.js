import React, { Component } from 'react';
import {Container,Button} from 'react-bootstrap';
import {Route,Switch} from 'react-router-dom';
import Landing from './containers/landing/landing';
import Signup from './containers/signup/signup';
import Courses from './containers/courses/courses';
import Login from './containers/login/login';
import About from './containers/about/about';
import Header from './components/header/header';
import axios from 'axios';


class App extends Component {
 constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }



  render() {
    return (
       <div className="App">
       <Header updateUser={this.updateUser} loggedIn={this.state.loggedIn}/>
         <header>
           <Switch>
              <Route path="/" exact render={() => <Landing loggedIn={this.state.loggedIn}/>}/>
              <Route path="/about" render={() => <About/>}/>
              <Route path="/courses" render={() => <Courses loggedIn={this.state.loggedIn}/>}/>
              <Route path="/signup" render={() => <Signup/>}/>
              <Route path="/login"  render={() => <Login updateUser={this.updateUser}/>} />
           </Switch>
         </header>
       </div>
    );
  }
}

export default App;
