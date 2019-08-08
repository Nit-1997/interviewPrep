import React,{Component} from 'react';
import { Card,Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';



class Course extends Component{
  state = {

  }

  startCourseHandler = (e)=>{
     
  }

  render(){
     return(
       <div>
         <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={this.props.imageLink} />
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Text>
              {this.props.details}
            </Card.Text>
            <Button variant="primary" onClick ={this.startCourseHandler}>Start Course</Button>
          </Card.Body>
        </Card>
       </div>
     );
  }   
}
   


export default withRouter(Course);