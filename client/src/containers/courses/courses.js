import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image,Spinner} from 'react-bootstrap';
import Course from '../../components/course/course';
import './courses.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from '../../axios';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';


class Courses extends Component {
 state = {
    courses:[]
  }
  componentDidMount(){
    if(this.props.loggedIn){
      let courseData = JSON.parse(localStorage.getItem('courseData'));
      if(localStorage.getItem('addedCourse')){
        localStorage.removeItem('addedCourse')
      }
      if(localStorage.getItem('deleteCourseContent')){
        localStorage.removeItem('deleteCourseContent')
      }
      if(localStorage.getItem('updatedCourseContent')){
        localStorage.removeItem('updatedCourseContent')
      }
      if(localStorage.getItem('addedCourseContent')){
        localStorage.removeItem('addedCourseContent');
      }
      if(localStorage.getItem('updatedCourse')){
        localStorage.removeItem('updatedCourse');
      }
      if(localStorage.getItem('deletedCourse')){
        localStorage.removeItem('deletedCourse');
      }
      if(courseData){
       this.setState({courses:courseData});
      }
    }
  }

  componentDidUpdate(){
     if(this.state.courses.length === 0){
      let courseData = JSON.parse(localStorage.getItem('courseData'));
      if(courseData){
       this.setState({courses:courseData});
      }
     }
  }

  render() {
  	let baseComponent;
    if(this.state.courses.length === 0){
      baseComponent=(
           <div style={{'text-align':'center'}}>
                   <Spinner  style={{'height':'100px','width':'100px'}} animation="border"/>     
           </div>
      );
    }
    let cards =(
                this.state.courses.map(course =>(
                    <Course courseObj={course}/>
                  ))
       );
    
    return (
        <section className="bg-light page-section" id="portfolio">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h2 className="section-heading text-uppercase">Courses</h2>
                  <h3 className="section-subheading text-muted">Best courses for those best jobs.</h3>
                </div>
               </div>
               {baseComponent}
               <div class="row">
                {cards}
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

