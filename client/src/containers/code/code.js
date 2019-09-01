import React, { Component } from 'react';
import './code.css';
import axios from '../../axios';
import {Form,Button,Jumbotron,Col,Container,Row,Image} from 'react-bootstrap';

class Code extends Component {
  constructor() {
    super();
    this.state = {
        code:''
   }
  }

  onChangeHandler = (e) => {
      this.setState({[e.target.id]:e.target.value},()=>{
        console.log(this.state);
      })
  }

  onSubmitHandler = (e) =>{
    const formData = {
     code:this.state.code,
   }
     axios.post('/compileCode',formData)
       .then(response => {
         console.log(response.data);  
      }).catch(error => {
        console.log(error); 
      });
}

  render() {
    return (
       <div className="coder">
           <Form>
              <Form.Group controlId="code" className="commHeader">
                  <Form.Label>Content</Form.Label>
                  <Form.Control as="textarea" className="editor" onChange={this.onChangeHandler} placeholder="Enter Code" />
              </Form.Group>
            <Button variant="primary" onClick ={this.onSubmitHandler} className="commHeader">
             Compile
           </Button>
           </Form> 

       </div>
    );
  }
}

export default Code;
