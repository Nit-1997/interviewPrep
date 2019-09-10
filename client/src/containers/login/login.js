import './login.css';
import React, { Component } from 'react';
import Signin from '../../components/login/login';
import {withRouter} from 'react-router-dom';

const login = (props) =>{
	console.log(props);
    return (
      <div>
         <Signin
            {...props} 
         />
      </div>
    );
  }

export default withRouter(login);
