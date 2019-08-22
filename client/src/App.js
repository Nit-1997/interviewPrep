import React, { Component } from 'react';
import {Container,Button} from 'react-bootstrap';
import {Route,Switch} from 'react-router-dom';
import Landing from './containers/landing/landing';
import Signup from './containers/signup/signup';
import Courses from './containers/courses/courses';
import Login from './containers/login/login';
import About from './containers/about/about';
import Create from './containers/create/create';
import Header from './components/header/header';
import AddLinks from './components/addlinks/addlinks';
import CourseDetails from './components/courseDetails/courseDetails';
import AddComment from './containers/addcomment/addcomment';
import axios from 'axios';
import {withRouter} from 'react-router-dom';


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
       <Header updateUser={this.updateUser} loggedIn={this.state.loggedIn} email={this.state.username}/>
         <header>
           <Switch>
              <Route path="/" exact render={() => <Landing loggedIn={this.state.loggedIn}/>}/>
              <Route path="/about" render={() => <About/>}/>
              <Route path="/courses" render={() => <Courses loggedIn={this.state.loggedIn}/>}/>
              <Route path="/signup" render={() => <Signup/>}/>
              <Route path="/login"  render={() => <Login updateUser={this.updateUser}/>} />
              <Route path="/createCourse"  render={() => <Create username={this.state.username} loggedIn = {this.state.loggedIn}/>} />
              <Route path="/singleCourse" render={() => <CourseDetails username={this.state.username} loggedIn={this.state.loggedIn}/>}/>
              <Route path="/addcomment" render={() => <AddComment username={this.state.username} loggedIn={this.state.loggedIn}/>}/>
              <Route path="/addLinks" render={() => <AddLinks username={this.state.username} loggedIn={this.state.loggedIn}/>}/>
           </Switch>
         </header>
       </div>
    );
  }
}

export default withRouter(App);
