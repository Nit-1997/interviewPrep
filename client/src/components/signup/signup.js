import React,{ Component } from "react";
import './signup.css';
import  { Redirect } from 'react-router-dom'
import {Form,Button} from 'react-bootstrap';
import axios from 'axios';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
        email:'',
        name:'',
        college:'',
        branch:'',
        year:'',
        password:'',
        image:''
   }
  }
  
  onChangeHandler = (e) => {
      this.setState({[e.target.id]:e.target.value},()=>{
        console.log(this.state);
      })
  }

  onChangeHandlerFile = (e) =>{
    this.setState({image:e.target.files[0]},()=>{
        console.log(this.state);
      })
  }
  onSubmitHandler = (e) =>{
    const formData = new FormData();
    formData.append('image',this.state.image);
    formData.append('email',this.state.email);
    formData.append('name',this.state.name);
    formData.append('college',this.state.college);
    formData.append('branch',this.state.branch);
    formData.append('year',this.state.year);
    formData.append('password',this.state.password);
    const url = 'https://prepzone.herokuapp.com/create';
    axios.post(url,
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      ).then(response=>{
       if (!response.data.errmsg) {
        console.log('successful signup')
        console.log(response.data);
        this.props.history.push({
          pathname: '/login',
          state: { detail: response.data }
        });
      } else {
        console.log('username already taken')
      }
    }).catch(error => {
      console.log('signup error: ')
      console.log(error)
    });
  }

  render() {
    return (
      <Form className="major">
          <h1 className="title commHeader">Sign up</h1>
          
          <Form.Group controlId="image" className="commHeader">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control as="input" type="file"  onChange={this.onChangeHandlerFile} placeholder="Enter Name" />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label className="commHeader">Email address</Form.Label>
            <Form.Control className="commHeader" type="email" onChange={this.onChangeHandler} placeholder="Enter email" />
            <Form.Text className="text-muted" className="commHeader">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label className="commHeader">Name</Form.Label>
            <Form.Control type="text"  onChange={this.onChangeHandler} className="commHeader" placeholder="Enter Name" />
          </Form.Group>  
          
          <Form.Group controlId="college">
            <Form.Label className="commHeader">College</Form.Label>
            <Form.Control as="select" onChange={this.onChangeHandler} className="commHeader">
              <option value="">Choose...</option>
              <option value="SJCE">SJCE</option>
              <option value="NIE">NIE</option>
              <option value="VVCE">VVCE</option>
              <option value="Others">Others</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="branch">
            <Form.Label className="commHeader">Branch</Form.Label>
            <Form.Control as="select" onChange={this.onChangeHandler} className="commHeader">
              <option value="">Choose...</option>
              <option value="CSE">CSE</option>
              <option value="ISE">ISE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
            </Form.Control>
          </Form.Group>


           <Form.Group controlId="year">
            <Form.Label className="commHeader">Year</Form.Label>
            <Form.Control as="select" onChange={this.onChangeHandler} className="commHeader">
              <option value="">Choose...</option>
              <option value="1">First</option>
              <option value="2">Second</option>
              <option value="3">Third</option>
              <option value="4">Fourth</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label className="commHeader">Password</Form.Label>
            <Form.Control className="commHeader" type="password" placeholder="Password" onChange={this.onChangeHandler} />
          </Form.Group>
          <Button variant="primary"  className="commHeader" onClick ={this.onSubmitHandler}>
            Submit
         </Button>
     </Form>
    );
  }
}

export default Signup;
