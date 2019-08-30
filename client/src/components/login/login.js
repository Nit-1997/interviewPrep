import React,{Component} from "react";
import './login.css';
import {NavLink} from 'react-router-dom';
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
          <h1 className="title commHeader">Login</h1>
          <Form.Group controlId="username">
            <Form.Label className="commHeader">Email address</Form.Label>
            <Form.Control className="commHeader" type="email" placeholder="Enter email" onChange={this.onChange}/>
            <Form.Text className="text-muted" className="commHeader">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="commHeader">Password</Form.Label>
            <Form.Control className="commHeader" type="password" placeholder="Password" onChange={this.onChange} />
          </Form.Group>
          <Button variant="primary" className="commHeader" onClick ={this.onSubmitHandler}>
            Login
         </Button>
         <br/><br/>
         <NavLink 
                to='/forgetPass'
                className="commHeader linker"
         >
            Forgot Password?
        </NavLink>
     </Form>
  );
  }
}

export default Login;
