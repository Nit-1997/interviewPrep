import './create.css';
import React from 'react';
import Register from '../../components/create/create';
import {withRouter} from 'react-router-dom';

const create =(props)=> {
    console.log(props);
    let baseComponent;
     if(props.loggedIn){
      baseComponent=(
         <div>
            <Register 
             {...props} 
            />
         </div>
      );
    }else{
       baseComponent=(
           <div>
             <h1 style={{ color: '#f5f3f2'}}>404 Planet not found...</h1>
           </div>
       );
    }
    return (
      <div className="mainer">
         {baseComponent}
      </div>
    );
 }

export default withRouter(create);
