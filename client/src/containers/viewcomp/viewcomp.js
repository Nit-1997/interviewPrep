import React,{Component} from 'react';
import { Card,Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {Route,Switch} from 'react-router-dom';
import Player from '../../components/youtube/youtube';
import Pdf from '../../components/pdf/pdf';
import './viewcomp.css';

class ViewComp extends Component{
   state = {
   
   } 
  render(){
  	 let baseComp;
  	 if(this.props.link.types === 'video'){
          baseComp = (
            <Player id={this.props.link.link}/>
          );
  	 }
  	 if(this.props.link.types === 'document'){
  	 	 
        baseComp = (
            <div>
		          <Pdf link={this.props.link.link}/>
		       </div>
          );
  	 }
     return(
       <div className="mainxxx">
          {baseComp}
       </div>
     );
  }   
}
   


export default withRouter(ViewComp);