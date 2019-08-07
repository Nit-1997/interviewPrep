import './login.css';
import React, { Component } from 'react';
import Signin from '../../components/login/login';

class Login extends Component {
 state = {
  };
  render() {
    return (
      <div className="master">
         <Signin/>
      </div>
    );
  }
}

export default Login;
