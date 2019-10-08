import React,{Component} from 'react';
import { Card,Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image,Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {Route,Switch} from 'react-router-dom';
import './courseDetails.css';
import Comp from '../../containers/viewcomp/viewcomp';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from '../../axios';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class CourseDetails extends Component{
   state = {
     course:'',
     isLoggedIn:this.props.loggedIn,
     links:[]
   }
  
  componentDidMount(){
    if(this.state.isLoggedIn){
        let courseDetails = this.props.location.state.detail;
        this.setState({course:courseDetails},()=>{
           console.log(this.state.course.links);
        });
        let links = courseDetails.links;
        this.setState({links:links},()=>{
           console.log(this.state);
        });
    }
  }
  componentDidUpdate(){
      if(this.state.isLoggedIn !== this.props.loggedIn){
         this.setState({isLoggedIn:this.props.loggedIn},()=>{
           console.log(this.state);
        });
      }
     let courseDetails = this.props.location.state.detail;
     let links = courseDetails.links;
      if(this.state.links.length !== links.length){
          this.setState({links:links},()=>{
              console.log(this.state);
          });
      }
  }

  onclickhandler = (event) =>{
     this.props.history.push({
                        pathname: '/addLinks',
                        state: { detail: this.state.course }
     });        
  }

  editcoursehandler = (event) =>{
   this.props.history.push({
                        pathname: '/updateCourse',
                        state: { detail: this.state.course }
     });        
  }

  editLinkHandler = (link) =>{
   console.log(link);
   console.log(this.state.course);
   let sendObj = {
     linkData : link,
     courseData : this.state.course
   }
   this.props.history.push({
                        pathname: '/updateLink',
                        state: { detail: sendObj }
   });        
  }

  deleteLinkHandler = (link) =>{
   let formData = {
      linkData: link,
      courseData:this.state.course
   }
   this.props.deleteCoursesContent(formData);
  }

  delteCourseHandler = () =>{
    this.props.deleteCourse(this.state.course);
  }

  async componentDidUpdate(){
    if(localStorage.getItem('deleteCourseContent')){
      if(this.props.courses){
        this.props.history.push({
              pathname: '/courses'
        });
      }
    }
    if(localStorage.getItem('deletedCourse')){
      if(this.props.courses){
        this.props.history.push({
              pathname: '/courses'
        });
      }
    }
  }

  render(){
    let baseComponent;
    if(this.props.loading){
      baseComponent = (
         <div style={{'text-align':'center'}}>
                   <Spinner  style={{'height':'100px','width':'100px'}} animation="border"/>         
           </div>
      )
    }else{
      if(this.state.isLoggedIn){
      if(this.state.links && this.state.links.length){
        if(this.props.username === 'ntnbhat9@gmail.com'){
             baseComponent=(
                  this.state.links.map(link =>(
                      <div className="col-md-4 col-sm-6 portfolio-item">
                            <a>
                              <Comp link = {link}/>
                            </a>
                            <div className="portfolio-caption">
                              <h4>{link.title}</h4>
                              <div>
                                 <br/> <br/>
                                 <button class="btn btn-warning" onClick={() => this.editLinkHandler(link)}>Edit Link</button>
                                 
                                 <button class="btn btn-danger" onClick={() => this.deleteLinkHandler(link)}>Delete Link</button>
                              </div>
                           </div>
                      </div> 
                  ))
                );
        }else{
             baseComponent=(
                  this.state.links.map(link =>(
                      <div className="col-md-4 col-sm-6 portfolio-item">
                            <a>
                              <Comp link = {link}/>
                            </a>
                            <div className="portfolio-caption">
                              <h4>{link.title}</h4>
                           </div>
                      </div> 
                  ))
                );
        }
      }
    }else{
       baseComponent=(
           <div className="col-lg-12 text-center">
                  <h2 className="section-heading text-uppercase">404 planet not found!!!</h2>
           </div>
       );
    }  
    }
    
    
    let button;
    if(this.props.loggedIn){
      if(this.props.username === "ntnbhat9@gmail.com"){
        button = (
            <div>
               <button className="btn btn-info" onClick={this.onclickhandler}>Add Link</button>
      
               <button className="btn btn-warning" onClick={this.editcoursehandler}>Edit Course</button>
           
               <button className="btn btn-danger" onClick={this.delteCourseHandler}>Delete Course</button>
               <br/>
               <br/>
               <br/>
            </div>
        );
      }
    }
     return(
      <section className="bg-light page-section" id="portfolio">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h2 className="section-heading text-uppercase">{this.state.course.title}</h2>
                  <h3 className="section-subheading text-muted">{this.state.course.details}</h3>
                   {button}
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
   
const mapDispatchToProps = dispatch =>{
  return{
    deleteCoursesContent: (formData)=>dispatch(actions.deleteCoursesContent(formData)),
    deleteCourse: (formData)=>dispatch(actions.deleteCourses(formData))
  }
}
const mapStateToProps = state =>{
  console.log(state);
  return{
    loading:state.course.loading,
    courses:state.course.courses
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CourseDetails));

