import Image from '../../components/image/image';
import './landing.css';
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class Landing extends Component {
 state = {
 	isLoggedIn:this.props.loggedIn
  };


  render() { 
    console.log(this.props);
    return (
     <div>
      <div>
       <Image loggedIn={this.state.isLoggedIn}/>
      </div>
     </div> 
    );
  }
}

export default withRouter(Landing);
