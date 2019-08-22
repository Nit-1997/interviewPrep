import React,{Component} from 'react';
import amazon from '../../assets/amzon.png';
import google from '../../assets/google.png';
import microsoft from '../../assets/microsoft.png';
import intuit from '../../assets/intuit.png';
import adobe from '../../assets/adobe.png';
import cisco from '../../assets/cisco.jpeg';
import fb from '../../assets/fb.png';
import walmart from '../../assets/walmart.jpeg';
import { Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import './image.css';



class Imager extends Component{
  render(){
      let button;
      if(this.props.loggedIn){
            button= ( 
                  <NavLink 
                     to='/courses'
                  >
                  <Button  variant="primary" className="commHeader">View Courses</Button>
                  </NavLink>
              );            
      }else{
          button= ( 
                  <Button  variant="primary" className="commHeader" disabled>View Courses</Button>
              );  
      }

     return(
       <Container>
        <Row>
          <Col xs={6} md={3}>
            <Image src={fb} roundedCircle thumbnail fluid/>
          </Col>
          <Col xs={6} md={3}>
            <Image src={microsoft} roundedCircle thumbnail fluid/>
          </Col>
          <br/><br/><br/>
          <Col xs={6} md={3}>
            <Image src={intuit} roundedCircle thumbnail fluid/>
          </Col>
          <Col xs={6} md={3}>
            <Image src={adobe} roundedCircle thumbnail fluid/>
          </Col>
          <br/><br/><br/>
          <Col xs={6} md={3}>
            <Image src={amazon} roundedCircle thumbnail fluid/>
          </Col>
          <Col xs={6} md={3}>
            <Image src={google} roundedCircle thumbnail fluid/>
          </Col>
          <br/><br/><br/><br/>
          <Col xs={6} md={3}>
            <Image src={cisco} roundedCircle thumbnail fluid/>
          </Col>
          <Col xs={6} md={3}>
            <Image src={walmart} roundedCircle thumbnail fluid/>
          </Col> 
        </Row>
        <h2 className="commHeader xs">
          Want to ace the technical interviews?
        </h2>
         {button}
      </Container>
     );
  }   
}
   


export default withRouter(Imager);