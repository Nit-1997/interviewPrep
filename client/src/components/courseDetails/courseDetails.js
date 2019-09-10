import React,{Component} from 'react';
import { Card,Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {Route,Switch} from 'react-router-dom';
import './courseDetails.css';
import Comp from '../../containers/viewcomp/viewcomp';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

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

  render(){
    let baseComponent;
    if(this.state.isLoggedIn){
      if(this.state.links && this.state.links.length){
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
    }else{
       baseComponent=(
           <div className="col-lg-12 text-center">
                  <h2 className="section-heading text-uppercase">404 planet not found!!!</h2>
           </div>
       );
    }
    
    let button;
    if(this.props.loggedIn){
      if(this.props.username === "ntnbhat9@gmail.com"){
        button = (
            <div>
               <Button onClick={this.onclickhandler}>Add Link</Button>
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
   


export default withRouter(CourseDetails);