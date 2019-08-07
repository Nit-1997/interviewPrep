import React,{Component} from "react";
import './login.css';
import {Form,Button} from 'react-bootstrap';
import axios from '../../axios';

class Login extends Component {
 constructor() {
    super();
    this.state = {
        username:'',
        password:''
   }
  }

  onChange = (e) => {
      this.setState({[e.target.id]:e.target.value},()=>{
        console.log(this.state);
      })
  }

  onSubmitHandler = (e) =>{
    const formData = {
       username:this.state.username,
       password:this.state.password
    }
    axios.post('/login',formData)
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    });
                    this.props.history.push({
                        pathname: '/',
                        state: { detail: response.data }
                    });       
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
  }

  render() {
    return (
      <Form className="major">
          <h1 className="title">Login</h1>
          <Form.Group controlId="username">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={this.onChange}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={this.onChange} />
          </Form.Group>
          <Button variant="primary" onClick ={this.onSubmitHandler}>
            Login
         </Button>
     </Form>
  );
  }
}

export default Login;
