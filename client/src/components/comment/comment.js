import React,{Component} from "react";
import './comment.css';
import {Form,Button,Jumbotron} from 'react-bootstrap';
import axios from '../../axios';
import {withRouter} from 'react-router-dom';
import Rating from 'react-rating';
import starEmpty from '../../assets/star-empty.png';
import starFull from '../../assets/star-full.png';

class Comment extends Component {
 constructor() {
    super();
    this.state = {
        content:''
   }
  }

  onChange = (e) => {
      this.setState({[e.target.id]:e.target.value},()=>{
        console.log(this.state);
      })
  }

  onSubmitHandler = (e) =>{
    const formData = {
       content:this.state.content
    }
    axios.post('/addComment',formData)
            .then(response => {
                    this.props.history.push({
                        pathname: '/addcomment',
                        state: { detail: response.data }
                    });       
            }).catch(error => {
                console.log(error); 
            })
  }

  ratingHandler = (rate)=>{
     console.log(rate);
  }

  render() {
    return (
      <div className="xoxor">
	     <Jumbotron>
		  <h3 className="commHeader">Add Comment</h3>
		   <Form>
		     <Form.Group controlId="rating">
	            <Form.Label className="commHeader">Rating</Form.Label>
	            <br/>
	            <Rating    
	               emptySymbol={<img src={starEmpty} className="icon baby" />}
                   fullSymbol={<img src={starFull} className="icon baby" />}
                   onChange={this.ratingHandler}
                 />
	          </Form.Group>
	         <Form.Group controlId="content">
                <Form.Label className="commHeader">Content</Form.Label>
	            <Form.Control className="commHeader" as="textarea" onChange={this.onChangeHandler} placeholder="Enter comment content" />
	         </Form.Group>
	          <Button variant="primary" onClick ={this.onSubmitHandler} className="commHeader">
	            Add Comment
	         </Button>
	     </Form>
		</Jumbotron>
     </div>
  );
  }
}

export default withRouter(Comment);
