import React,{Component} from "react";
import './login.css';
import {NavLink} from 'react-router-dom';
import {Form,Button,Toast} from 'react-bootstrap';
import axios from '../../axios';
import ErrorImg from '../../assets/error.png';
import Cookies from 'universal-cookie';

class Login extends Component {
 constructor() {
    super();
    this.state = {
        username:'',
        password:'',
        show:false
   }
  }

  onChange = (e) => {
      this.setState({[e.target.id]:e.target.value},()=>{
        console.log(this.state);
      })
  }

  onSubmitHandler = (e) =>{
     e.preventDefault();
    const formData = {
       username:this.state.username,
       password:this.state.password
    }
    axios.post('/login',formData)
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    });
                    const cookies = new Cookies();
                    cookies.set('username', response.data.username, { path: '/' }); 
                    cookies.set('loggedIn', true, { path: '/' });
                    this.props.history.push({
                        pathname: '/',
                        state: { detail: response.data }
                    });       
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                window.scrollTo(0, 0);
                this.setState({show:true},()=>{
                  console.log(this.state.show);
                });  
                
            })
  }

  render() {
    return (
      <div>
       <Toast
        onClose={() => this.setState({show:false})}
        show={this.state.show} delay={4000} autohide
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
          <Toast.Header>
              <img src={ErrorImg} className="rounded mr-2 toastImg" alt="" />
              <strong className="mr-auto">Invalid details</strong>
              <small>just now</small>
          </Toast.Header>

          <Toast.Body>
             username or password is incorrect
          </Toast.Body>
      </Toast>
      <div className="container-fluid commHeader">
          <div className="row no-gutter">
            <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
            <div className="col-md-8 col-lg-6">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-lg-8 mx-auto">
                      <h3 className="login-heading mb-4">Sign In</h3>
                      <form onSubmit={this.onSubmitHandler}>
                        <div className="form-label-group">
                          <input onChange={this.onChange} type="email" id="username" className="form-control" placeholder="Email address" required autofocus/>
                          <label for="username">Email address</label>
                        </div>

                        <div className="form-label-group">
                          <input onChange={this.onChange} type="password" id="password" className="form-control" placeholder="Password" required/>
                          <label for="password">Password</label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign in</button>
                        <div className="text-center">
                          <a className="small" href="">Forgot password?</a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
       </div>
      </div>
  );
  }
}

export default Login;
