import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import Course from '../../components/course/course';
import './courses.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from '../../axios';

class Courses extends Component {
 state = {
    courses:[],
 	  isLoggedIn:this.props.loggedIn
  }
  componentDidMount(){
  axios.get('/getCourses')
    .then(response => {
      this.setState({courses:response.data},()=>{
        console.log(this.state);
      });
    })
    .catch(error => {
         console.log(error);
    });
  }

  componentDidUpdate(){
      if(this.state.isLoggedIn !== this.props.loggedIn){
         this.setState({isLoggedIn:this.props.loggedIn},()=>{
           console.log(this.state);
        });
      }
  }

  render() {
  	let baseComponent;
    if(this.state.isLoggedIn){
      baseComponent=(
          this.state.courses.map(course =>(
              <div>
                <MDBContainer>
                  <MDBRow>
                    <MDBCol md="12"><Course courseObj={course}/></MDBCol>
                  </MDBRow>
                </MDBContainer>
             </div>
          ))
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
