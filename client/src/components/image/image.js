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
      <div>
      
        <header className="masthead">
          <div className="container">
            <div className="intro-text">
            <div className="intro-heading text-uppercase">Welcome to PrepZone</div>
              <div className="intro-lead-in">The ultimate interview prep guide.
                        100 video explanations of popular interview questions with solutions in JavaScript, Python, C++ and Java.
                        Alongwith coding problems we provide comprehensive courses on Object Oriented Proramming,C,DBMS,Computer Networks and so on.
              </div>
              {button}
            </div>
          </div>
        </header>


  <section className="page-section" id="services">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading text-uppercase">What we offer</h2>
          <h3 className="section-subheading text-muted">with great power comes great responsibility :p</h3>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fas fa-circle fa-stack-2x text-primary"></i>
            <i className="fas fa-briefcase fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">Job Opportunity</h4>
          <p className="text-muted">
             We have a network of around 1000+ active users and alumni which opens you up to a community
             of software engineers who can help you get a job.
          </p>
        </div>
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fas fa-circle fa-stack-2x text-primary"></i>
            <i className="fas fa-laptop fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">Premium Content</h4>
          <p className="text-muted">
             We have set of video tutorials which help you prepare for the common interview topics like
             Operating System,DBMS,Computer Networks,Object-Oriented-Programming and System design.
          </p> 
        </div>
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fas fa-circle fa-stack-2x text-primary"></i>
            <i className="fas fa-code fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">100+ Practice questions</h4>
          <p className="text-muted">
             We have a set of handpicked questions on Data structures and algorithms which will help you clear
             those difficult coding rounds in big Tech Companies.
          </p> 
         </div>
      </div>
    </div>
  </section>

 
     </div>
     );
  }   
}
   


export default withRouter(Imager);