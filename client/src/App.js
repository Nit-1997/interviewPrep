import React, { Component } from 'react';
import {Container,Button} from 'react-bootstrap';
import {Route,Switch} from 'react-router-dom';
import Landing from './containers/landing/landing';
import Signup from './containers/signup/signup';
import Courses from './containers/courses/courses';
import Login from './containers/login/login';
import ForgetPass from './containers/forgetPass/forgetPass';
import Team from './containers/team/team';
import QuestionList from './containers/questionList/questionList';
import Code from './containers/code/code';
import Create from './containers/create/create';
import Header from './components/header/header';
import AddLinks from './components/addlinks/addlinks';
import CourseDetails from './components/courseDetails/courseDetails';
import AddComment from './containers/addcomment/addcomment';
import AddQuestion from './containers/addquestion/addquestion';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';


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

  componentDidUpdate(){
    const cookies = new Cookies();
    const username = cookies.get('username');
    let loggedIn = cookies.get('loggedIn');
    if(loggedIn === "true"){
      loggedIn = true;
    }else{
      loggedIn = false;
    }
    if(this.state.loggedIn!== loggedIn){
       this.setState({username:username,loggedIn:loggedIn},()=>{
      console.log(this.state);
    });
    }
  }

  updateUser (userObject) {
    console.log(userObject)
    //this.setState(userObject)
    const cookies = new Cookies();
    const username = cookies.get('username');
    let loggedIn = cookies.get('loggedIn');
    if(loggedIn === "true"){
      loggedIn = true;
    }else{
      loggedIn = false;
    }
    this.setState({username:username,loggedIn:loggedIn},()=>{
      console.log(this.state);
    });
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
       <div className="commHeader">
       <Header updateUser={this.updateUser} loggedIn={this.state.loggedIn} email={this.state.username} user={this.state.user}/>
         <header>
           <Switch>
              <Route path="/" exact render={() => <Landing loggedIn={this.state.loggedIn}/>}/>
              <Route path="/team" render={() => <Team/>}/>
              <Route path="/questions" render={() => <QuestionList loggedIn={this.state.loggedIn}/>}/>
              <Route path="/code" render={() => <Code loggedIn={this.state.loggedIn}/>}/>
              <Route path="/addQuestion" render={() => <AddQuestion loggedIn={this.state.loggedIn}/>}/>
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
         <footer className="footer textVal">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <span className="copyright">Copyright &copy; prepZone 2019</span>
                  </div>
                  <div className="col-md-4">
                    <ul className="list-inline social-buttons">
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <ul className="list-inline quicklinks">
                      <li className="list-inline-item">
                        <a href="#" style={{'color':'black'}}>Privacy Policy</a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#" style={{'color':'black'}}>Terms of Use</a>
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
