//import './signup.css';
import React from 'react';
import Register from '../../components/signup/signup';
import {withRouter} from 'react-router-dom';

const signup =(props)=> {
    console.log(props);
    return (
      <div >
         <Register 
             {...props} 
          />
      </div>
    );
 }

export default withRouter(signup);
