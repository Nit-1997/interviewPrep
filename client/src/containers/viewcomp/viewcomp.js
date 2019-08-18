import React,{Component} from 'react';
import { Card,Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {Route,Switch} from 'react-router-dom';
import Player from '../../components/youtube/youtube';


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
		        
		    </div>
          );
  	 }
     return(
       <div>
          {baseComp}
       </div>
     );
  }   
}
   


export default withRouter(ViewComp);