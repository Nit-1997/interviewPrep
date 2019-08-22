import React,{Component} from 'react';
import { Card,Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import starFull from '../../assets/star-full.png';
import './course.css';



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
       <div>
         <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={this.props.courseObj.image} />
          <Card.Body>
            <Card.Title className="titleCourse">{this.props.courseObj.title}</Card.Title>
            <Card.Text className="commHeader">
              {this.props.courseObj.details}
            </Card.Text>
                          <img src={starFull} className="icon babyz" />
                          <img src={starFull} className="icon babyz" />
                          <img src={starFull} className="icon babyz" />
                          <img src={starFull} className="icon babyz" />
                          <img src={starFull} className="icon babyz" />
                          <br/>
            <Button variant="primary" className="xxx commHeader" onClick ={this.startCourseHandler}>Start Course</Button>
            <Button variant="success" className="xxx commHeader" onClick ={this.commentCourseHandler}>Comments</Button>
          </Card.Body>
        </Card>
       </div>
     );
  }   
}
   


export default withRouter(Course);