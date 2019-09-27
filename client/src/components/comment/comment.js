import React,{Component} from "react";
import './comment.css';
import {Form,Button,Jumbotron,Toast} from 'react-bootstrap';
import axios from '../../axios';
import {withRouter} from 'react-router-dom';
import Rating from 'react-rating';
import starEmpty from '../../assets/star-empty.png';
import starFull from '../../assets/star-full.png';
import * as toxicity from '@tensorflow-models/toxicity';
import toxic from '../../assets/toxic.png';



class Comment extends Component {
 constructor() {
    super();
    this.state = {
        content:'',
        rating:'0',
        show:false,
        showRating:false,
        showToxic:false
   }
  }

  onChangeHandler = (e) => {
      this.setState({[e.target.id]:e.target.value},()=>{
        console.log(this.state);
      })
  }

  onSubmitHandler = (e) =>{
    const formData = {
     content:this.state.content,
     rating:this.state.rating,
     username:this.props.username,
     course:this.props.course
   }

const threshold = 0.9;
toxicity.load(threshold).then(model => {
  const sentences = [];
  sentences[0] = formData.content;
  model.classify(sentences).then(predictions => {
     var toxic = predictions[6].results[0].match;
     if(toxic){
        this.setState({showToxic:true});
     }else{
       axios.post('/addComment',formData)
       .then(response => {
        console.log('comment added');
        this.setState({show:true});
        this.props.history.push({
          pathname: '/addcomment',
          state: { detail: response.data }
        });       
      }).catch(error => {
        console.log(error); 
      })
     }
  });
});
}

  ratingHandler = (rate)=>{
    this.setState({rating:rate,showRating:true},()=>{
        console.log(this.state);
      })
  }

  render() {
    return (
      <div className="xoxor">

       <Toast  onClose={() => this.setState({showToxic:false})}
        show={this.state.showToxic} delay={3000} autohide
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
          <Toast.Header>
              <img src={toxic} className="rounded mr-2 toastImg" alt="" />
              <strong className="mr-auto">Cool bro,Your comment is discarded</strong>
              <small>just now</small>
          </Toast.Header>

          <Toast.Body>
             Now improve your language :)
          </Toast.Body>
      </Toast>
  
          <Toast  onClose={() => this.setState({showRating:false})}
        show={this.state.showRating} delay={3000} autohide
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
          <Toast.Header>
              <img src={starFull} className="rounded mr-2 toastImg" alt="" />
              <strong className="mr-auto">{this.state.rating} Stars</strong>
              <small>just now</small>
          </Toast.Header>

          <Toast.Body>
             Rating of {this.state.rating} is registered.
          </Toast.Body>
      </Toast>

      <Toast
        onClose={() => this.setState({show:false})}
        show={this.state.show} delay={3000} autohide
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
          <Toast.Header>
              <img src="http://www.pngmart.com/files/3/Green-Tick-Transparent-PNG.png" className="rounded mr-2 toastImg" alt="" />
              <strong className="mr-auto">Success</strong>
              <small>just now</small>
          </Toast.Header>

          <Toast.Body>
             comment added successfuly.
          </Toast.Body>
      </Toast>
  
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
          <Form.Group controlId="content" className="commHeader">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" onChange={this.onChangeHandler} placeholder="Enter Comment" />
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
