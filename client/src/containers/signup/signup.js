import './signup.css';
import React from 'react';
import Register from '../../components/signup/signup';
import {withRouter} from 'react-router-dom';

const signup =(props)=> {
    console.log(props);
    return (
      <div className="master">
         <Register 
             {...props} 
          />
      </div>
    );
 }

export default withRouter(signup);
