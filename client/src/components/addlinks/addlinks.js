import React,{ Component } from "react";
import './addlinks.css';
import  { Redirect } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import axios from '../../axios';
import { MDBFileInput } from "mdbreact";

class AddLinks extends Component {
   state = {
        course:null,
        isLoggedIn:this.props.loggedIn,
        link:'',
        title:''
   }
  
 componentDidMount(){
    if(this.state.isLoggedIn){
        let courseDetails = this.props.location.state.detail;
        this.setState({course:courseDetails},()=>{
           console.log(this.state);
        });
    }
  }

  onChangeHandler = (e) => {
      this.setState({[e.target.id]:e.target.value},()=>{
        console.log(this.state);
      })
  }

  onSubmitHandler = (e) =>{
      const formData = {
       link:this.state.link,
       title:this.state.title,
       course:this.state.course
    }
    axios.post('/addlinks',formData)
            .then(response => {
                console.log(response.data);
                 this.props.history.push({
                        pathname: '/singleCourse',
                        state: { detail: response.data }
                  });        
            }).catch(error => {
                console.log(error);
            })
  }

  render() {
    return (
      <Form className="major">
          <h1 className="title">Add Links</h1>
        
          <Form.Group controlId="link">
            <Form.Label>Link URL</Form.Label>
            <Form.Control type="text" onChange={this.onChangeHandler} placeholder="Enter the video link id from youtube" />
          </Form.Group>
          

          <Button variant="primary"  onClick ={this.onSubmitHandler}>
            Submit
         </Button>
     </Form>
    );
  }
}

export default withRouter(AddLinks);
