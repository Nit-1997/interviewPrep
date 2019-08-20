import React,{Component} from 'react';
import { Card,Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {Route,Switch} from 'react-router-dom';
import './pdf.css';

class Pdf extends Component{
   state = {
     
   }
   openDocumentHandler = (event) =>{
       window.open(this.props.link, "_blank"); 
   }
  render(){
     return(
         <div class="carder" onClick={this.openDocumentHandler}></div>
     );
  }   
}
   


export default withRouter(Pdf);