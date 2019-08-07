import React,{ Component } from "react";
import './signup.css';
import  { Redirect } from 'react-router-dom'
import {Form,Button} from 'react-bootstrap';
import axios from '../../axios';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
        email:'',
        name:'',
        college:'',
        branch:'',
        year:'',
        password:''
   }
  }
  
  onChangeHandler = (e) => {
      this.setState({[e.target.id]:e.target.value},()=>{
        console.log(this.props);
      })
  }

  onSubmitHandler = (e) =>{
    const formData = {
       email:this.state.email,
       name:this.state.name,
       college:this.state.college,
       branch:this.state.branch,
       year:this.state.year,
       password:this.state.password
    }
    axios.post('/create',formData)
      .then(response => {
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
          <h1 className="title">Sign up</h1>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" onChange={this.onChangeHandler} placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"  onChange={this.onChangeHandler} placeholder="Enter Name" />
          </Form.Group>
           
          <Form.Group controlId="college">
            <Form.Label>College</Form.Label>
            <Form.Control as="select" onChange={this.onChangeHandler}>
              <option value="">Choose...</option>
              <option value="SJCE">SJCE</option>
              <option value="NIE">NIE</option>
              <option value="VVCE">VVCE</option>
              <option value="Others">Others</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="branch">
            <Form.Label>Branch</Form.Label>
            <Form.Control as="select" onChange={this.onChangeHandler}>
              <option value="">Choose...</option>
              <option value="CSE">CSE</option>
              <option value="ISE">ISE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
            </Form.Control>
          </Form.Group>


           <Form.Group controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Control as="select" onChange={this.onChangeHandler}>
              <option value="">Choose...</option>
              <option value="1">First</option>
              <option value="2">Second</option>
              <option value="3">Third</option>
              <option value="4">Fourth</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={this.onChangeHandler} />
          </Form.Group>
          <Button variant="primary"  onClick ={this.onSubmitHandler}>
            Submit
         </Button>
     </Form>
    );
  }
}

export default Signup;
