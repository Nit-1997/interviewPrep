import React,{Component} from 'react';
import { Card,Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {Route,Switch} from 'react-router-dom';
import './addcomment.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CommentBox from '../../components/comment/comment';
import Comment from '../../components/viewComment/viewComment';

class AddComment extends Component{
   state = {
     course:null,
     isLoggedIn:this.props.loggedIn
   }
  
  componentDidMount(){
    if(this.state.isLoggedIn){
        let courseDetails = this.props.location.state.detail;
        this.setState({course:courseDetails},()=>{
           console.log(this.state.course.links);
        });
    }
  }
  componentDidUpdate(){
      if(this.state.isLoggedIn !== this.props.loggedIn){
         this.setState({isLoggedIn:this.props.loggedIn},()=>{
           console.log(this.state);
        });
      }
  }

  render(){
    let baseComponent;
    if(this.state.isLoggedIn){
      baseComponent=(
           <div>
             <CommentBox
                 {...this.props}
                 className="xoxo"
              />
              <Comment
                 {...this.props}
              />
           </div>
       );
    }else{
       baseComponent=(
           <div>
            <br/><br/>
            <h1 className="commHeader" style={{ color: 'white' }}>404 planet not found</h1>
           </div>
       );
    }
    
     return(
      <div>
       <div className ="mainxero">
           <div>
             {baseComponent}
           </div>
       </div>
      </div>
     );
  }   
}
   


export default withRouter(AddComment);