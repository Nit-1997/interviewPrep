import React, { Component } from 'react';
import {Container,Button} from 'react-bootstrap';
import {Route,Switch,Redirect} from 'react-router-dom';
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
import {connect} from 'react-redux';
import * as actions from './store/actions/index';



class App extends Component {
 constructor() {
    super()
    this.state = {
      
    }
  }

  componentDidMount() {
    if(this.props.loggedIn){
      this.props.fetchQues(this.props.user.username);
      this.props.fetchCourses();
      console.log(this.props.solvedQuestions);
      console.log(this.props.questions);
    }
    this.props.onTryAutoSignIn();
  }

  async componentDidUpdate(){
    if(this.props.loggedIn){
      if(!localStorage.getItem('quesData')){
        await this.props.fetchQues(this.props.user.username);
        await this.props.fetchCourses();   
      }
      //  await this.props.fetchQues(this.props.user.username);
      //  await this.props.fetchCourses();
      //  console.log(this.props.solvedQuestions);
      // console.log(this.props.questions);
    }
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact render={() => <Landing loggedIn={this.props.loggedIn}/>}/>
        <Route path="/team" render={() => <Team/>}/>
        <Route path="/signup" render={() => <Signup/>}/>
        <Route path="/login"  render={() => <Login/>} />
        <Redirect to="/" />
      </Switch>
    );
    if ( this.props.loggedIn ) {
      if(this.props.user.username === 'ntnbhat9@gmail.com'){
          routes = (
                      <Switch>
                            <Route path="/" exact render={() => <Landing loggedIn={this.props.loggedIn}/>}/>
                            <Route path="/team" render={() => <Team/>}/>
                            <Route path="/questions" render={() => <QuestionList user={this.props.user} loggedIn={this.props.loggedIn}/>}/>
                            <Route path="/code" render={() => <Code user = {this.props.user} loggedIn={this.props.loggedIn}/>}/>
                            <Route path="/addQuestion" render={() => <AddQuestion loggedIn={this.props.loggedIn}/>}/>
                            <Route path="/courses" render={() => <Courses loggedIn={this.props.loggedIn}/>}/>
                            <Route path="/createCourse"  render={() => <Create loggedIn = {this.props.loggedIn}/>} />
                            <Route path="/singleCourse" render={() => <CourseDetails username={this.props.user.username} loggedIn={this.props.loggedIn}/>}/>
                            <Route path="/addcomment" render={() => <AddComment username={this.props.user.username} loggedIn={this.props.loggedIn}/>}/>
                            <Route path="/addLinks" render={() => <AddLinks username={this.props.user.username} loggedIn={this.props.loggedIn}/>}/>
                            <Redirect to="/" />
                      </Switch>
                    );
      }else{
          routes = (
                      <Switch>
                            <Route path="/" exact render={() => <Landing loggedIn={this.props.loggedIn}/>}/>
                            <Route path="/team" render={() => <Team/>}/>
                            <Route path="/questions" render={() => <QuestionList user={this.props.user} loggedIn={this.props.loggedIn}/>}/>
                            <Route path="/code" render={() => <Code user = {this.props.user} loggedIn={this.props.loggedIn}/>}/>
                            <Route path="/courses" render={() => <Courses loggedIn={this.props.loggedIn}/>}/>
                            <Route path="/singleCourse" render={() => <CourseDetails username={this.props.user.username} loggedIn={this.props.loggedIn}/>}/>
                            <Route path="/addcomment" render={() => <AddComment username={this.props.user.username} loggedIn={this.props.loggedIn}/>}/>
                            <Redirect to="/" />
                      </Switch>
                    );
      }
    }
    return (
       <div className="commHeader">
       <Header loggedIn={this.props.loggedIn} user={this.props.user}/>
         <header>
            {routes}
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

const mapDispatchToProps = dispatch =>{
  return{
    fetchQues: (username)=>dispatch(actions.fetchQuestions(username)),
    fetchCourses:(username)=>dispatch(actions.fetchCourses()),
    onTryAutoSignIn: () => dispatch( actions.authCheckState() )
  }
}

const mapStateToProps = state =>{
  if(state.user === null){
    console.log('no user is present in session');
  }else{
    return{
      user:state.auth.user,
      loggedIn:state.auth.loggedIn,
      token:state.auth.token,
      questions:state.ques.questions,
      solvedQuestions:state.ques.solvedQuestions
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
