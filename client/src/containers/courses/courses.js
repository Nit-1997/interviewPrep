import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import Course from '../../components/course/course';
import './courses.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from '../../axios';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';


class Courses extends Component {
 state = {
    courses:[],
 	  isLoggedIn:this.props.loggedIn
  }
  componentDidMount(){
  // axios.get('/getCourses')
  //   .then(response => {
  //     this.setState({courses:response.data},()=>{
  //       console.log(this.state);
  //     });
  //   })
  //   .catch(error => {
  //        console.log(error);
  //   });
   this.setState({courses:this.props.courses});
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
            <Course courseObj={course}/>
          ))
      );
    }else{
       baseComponent=(
                <div className="col-lg-12 text-center">
                  <h2 className="section-heading text-uppercase">404 planet not found!!!</h2>
                </div>
       );
    }
    return (
        <section className="bg-light page-section" id="portfolio">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h2 className="section-heading text-uppercase">Courses</h2>
                  <h3 className="section-subheading text-muted">Best courses for those best jobs.</h3>
                </div>
               </div>
               <div class="row">
                {baseComponent}
               </div>
             </div>
        </section>
    );
  }
}
const mapStateToProps = state =>{
  if(state.auth.user === null){
    console.log('no user is present in session');
  }else{
    return{
      courses:state.course.courses
    }
  }
}

export default connect(mapStateToProps)(withRouter(Courses));

