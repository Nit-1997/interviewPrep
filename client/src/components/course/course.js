import React,{Component} from 'react';
import { Card,Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import starFull from '../../assets/star-full.png';
import './course.css';
import Stars from '../numStars/numStars';



class Course extends Component{
  state = {

  }

  startCourseHandler = (e)=>{
     this.props.history.push({
                        pathname: '/singleCourse',
                        state: { detail: this.props.courseObj }
     });     
  }

  commentCourseHandler = (e) =>{
     this.props.history.push({
                        pathname: '/addcomment',
                        state: { detail: this.props.courseObj }
     }); 
  }

  render(){
     return(
        <div className="col-md-4 col-sm-6 portfolio-item">
              <a className="portfolio-link" data-toggle="modal" href="#portfolioModal1">
                <div onClick ={this.startCourseHandler} className="portfolio-hover">
                  <div className="portfolio-hover-content">
                    <i className="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                <img className="img-fluid" src={this.props.courseObj.image}  alt=""/>
              </a>
              <div className="portfolio-caption">
                <h4>{this.props.courseObj.title}</h4>
                <p className="text-muted">{this.props.courseObj.details}</p>
                          <Stars number="5"/>
                          <br/>
            <Button variant="primary" className="xxx commHeader" onClick ={this.startCourseHandler}>Start Course</Button>
            <Button variant="success" className="xxx commHeader" onClick ={this.commentCourseHandler}>Comments</Button>
             </div>
        </div>
     );
  }   
}
   


export default withRouter(Course);