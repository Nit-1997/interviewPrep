import './signup.css';
import React, { Component } from 'react';
import Register from '../../components/signup/signup';

class Signup extends Component {
 state = {
  };
  render() {
    return (
      <div className="master">
         <Register/>
      </div>
    );
  }
}

export default Signup;
