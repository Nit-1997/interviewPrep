import React, { Component } from 'react';
import {Container,Button} from 'react-bootstrap';
import {Route,Switch} from 'react-router-dom';
import Landing from './containers/landing/landing';
import Signup from './containers/signup/signup';
import Courses from './containers/courses/courses';
import Login from './containers/login/login';
import ForgetPass from './containers/forgetPass/forgetPass';
import Team from './containers/team/team';
import Code from './containers/code/code';
import Create from './containers/create/create';
import Header from './components/header/header';
import AddLinks from './components/addlinks/addlinks';
import CourseDetails from './components/courseDetails/courseDetails';
import AddComment from './containers/addcomment/addcomment';
import Dummy from './containers/dummy/dummy';
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class App extends Component {
 constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      user:null
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
          username: response.data.user.username,
          user: response.data.user
        },()=>{
          console.log(this.state);
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
       <div>
       <Header updateUser={this.updateUser} loggedIn={this.state.loggedIn} email={this.state.username} user={this.state.user}/>
         <header>
           <Switch>
              <Route path="/" exact render={() => <Landing loggedIn={this.state.loggedIn}/>}/>
              <Route path="/team" render={() => <Team/>}/>
              <Route path="/code" render={() => <Code loggedIn={this.state.loggedIn}/>}/>
              <Route path="/courses" render={() => <Courses loggedIn={this.state.loggedIn}/>}/>
              <Route path="/signup" render={() => <Signup/>}/>
              <Route path="/login"  render={() => <Login updateUser={this.updateUser}/>} />
              <Route path="/forgetPass"  render={() => <ForgetPass updateUser={this.updateUser}/>} />
              <Route path="/createCourse"  render={() => <Create username={this.state.username} loggedIn = {this.state.loggedIn}/>} />
              <Route path="/singleCourse" render={() => <CourseDetails username={this.state.username} loggedIn={this.state.loggedIn}/>}/>
              <Route path="/addcomment" render={() => <AddComment username={this.state.username} loggedIn={this.state.loggedIn}/>}/>
              <Route path="/addLinks" render={() => <AddLinks username={this.state.username} loggedIn={this.state.loggedIn}/>}/>
           </Switch>
         </header>
         <footer class="footer">
              <div class="container">
                <div class="row align-items-center">
                  <div class="col-md-4">
                    <span class="copyright">Copyright &copy; prepZone 2019</span>
                  </div>
                  <div class="col-md-4">
                    <ul class="list-inline social-buttons">
                      <li class="list-inline-item">
                        <a href="#">
                          <i class="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a href="#">
                          <i class="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li class="list-inline-item">
                        <a href="#">
                          <i class="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-4">
                    <ul class="list-inline quicklinks">
                      <li class="list-inline-item">
                        <a href="#">Privacy Policy</a>
                      </li>
                      <li class="list-inline-item">
                        <a href="#">Terms of Use</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
         </footer>
       </div>
    );
  }
}

export default withRouter(App);
