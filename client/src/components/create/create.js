import React,{ Component } from "react";
import './create.css';
import  { Redirect } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import axios, { post } from 'axios';
import { MDBFileInput } from "mdbreact";

class Create extends Component {
  constructor() {
    super();
    this.state = {
        title:'',
        image:'',
        details:''
   }
  }
  
  onChangeHandler = (e) => {
      this.setState({[e.target.id]:e.target.value},()=>{
        console.log(this.state);
      })
  }

  onChangeHandlerFile = (e) =>{
    this.setState({image:e.target.files[0]},()=>{
        console.log(this.props);
      })
  }

  onSubmitHandler = (e) =>{
    const formData = new FormData();
    formData.append('image',this.state.image);
    formData.append('title',this.state.title);
    formData.append('details',this.state.details);
   
    const url = 'http://localhost:7000/createCourse';
    axios.post(url,
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(response=>{
            console.log(response);
            this.props.history.push({
              pathname: '/courses',
              state: { detail: response.data }
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  render() {
    return (
      <Form className="major commHeader">
          <h1 className="title">Add a course</h1>
          
          <Form.Group controlId="title">
            <Form.Label>Course Title</Form.Label>
            <Form.Control type="text" onChange={this.onChangeHandler} placeholder="Enter Course Title" />
          </Form.Group>
          
          
          <Form.Group controlId="image">
            <Form.Label>Name</Form.Label>
            <Form.Control as="input" type="file"  onChange={this.onChangeHandlerFile} placeholder="Enter Name" />
          </Form.Group>
         
         <Form.Group controlId="details">
            <Form.Label>Course Title</Form.Label>
            <Form.Control as="textarea" onChange={this.onChangeHandler} placeholder="Enter Course Details" />
          </Form.Group>

          <Button variant="primary"  onClick ={this.onSubmitHandler}>
            Submit
         </Button>
     </Form>
    );
  }
}

export default withRouter(Create);
