//import './signup.css';
import React from 'react';
import AddQuestion from '../../components/addquestion/addquestion';
import {withRouter} from 'react-router-dom';

const addQuestion =(props)=> {
    console.log(props);
    return (
      <div >
         <AddQuestion 
             {...props} 
          />
      </div>
    );
 }

export default withRouter(addQuestion);
