import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import Course from '../../components/course/course';
import './courses.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import cisco from '../../assets/cisco.jpeg';

class Courses extends Component {
 state = {
 	  isLoggedIn:this.props.loggedIn
  };
  render() {
  	let baseComponent;
  	let details = 'A detailed course on operating systems covering major topics asked in interviews';
    if(this.state.isLoggedIn){
      baseComponent=(
         <div>
         	 <MDBContainer>
		      <MDBRow>
		        <MDBCol md="12"><Course title="Operating Systems" imageLink={cisco} details={details}/></MDBCol>
		      </MDBRow>
		    </MDBContainer>
         </div>
      );
    }else{
       baseComponent=(
           <div>
          	<br/><br/>
            <h1 style={{ color: 'white' }}>COURSES ONLY VISIBLE WHEN LOGGED IN</h1>
           </div>
       );
    }
    return (
       <div className="main">
         {baseComponent}
       </div>
    );
  }
}

export default withRouter(Courses);
