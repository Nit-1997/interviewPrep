import React,{Component} from 'react';
import { Card,Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {Route,Switch} from 'react-router-dom';
import './courseDetails.css';
import Player from '../youtube/youtube';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

class CourseDetails extends Component{
   state = {
     course:null,
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
      if(this.state.links !== links){
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
              <div>
                <MDBContainer>
                  <MDBRow>
                    <MDBCol md="12"><Player id={link.link}/></MDBCol>
                  </MDBRow>
                </MDBContainer>
             </div>
          ))
        );
      }
    }else{
       baseComponent=(
           <div>
            <br/><br/>
            <h1 style={{ color: 'white' }}>COURSES ONLY VISIBLE WHEN LOGGED IN</h1>
           </div>
       );
    }
    
    let button;
    if(this.props.loggedIn){
      if(this.props.username === "ntnbhat9@gmail.com"){
        button = (
            <div>
               <Button onClick={this.onclickhandler}>Add Link</Button>
            </div>
        );
      }
    }
     return(
      <div>
       <div className ="mainx">
           <div className="x">
            {button} 
            </div>
           <div className="baseComp">
             {baseComponent}
           </div>
       </div>
      </div>
     );
  }   
}
   


export default withRouter(CourseDetails);