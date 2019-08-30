import React, { Component } from 'react';
import ForgetPass from '../../components/forgetPass/forgetPass';
import {withRouter} from 'react-router-dom';

const forgetPass = (props) =>{
	console.log(props);
    return (
      <div className="master">
         <ForgetPass
            {...props} 
         />
      </div>
    );
  }

export default withRouter(forgetPass);
