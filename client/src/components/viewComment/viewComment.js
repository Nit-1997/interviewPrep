import React,{Component} from "react";
import './viewComment.css';
import {Form,Button,Jumbotron,Col,Container,Row,Image} from 'react-bootstrap';
import axios from '../../axios';
import {withRouter} from 'react-router-dom';
import starFull from '../../assets/star-full.png';
import Stars from '../numStars/numStars';



class ViewComment extends Component {
   constructor() {
    super();
    this.state = {
        comments:[]
   }
  }
   componentDidMount(){
    let course = this.props.location.state.detail;
    const data = {
      course:course
    }
    console.log(data);
    axios.post('/getComments',data)
    .then(response => {
      this.setState({comments:response.data},()=>{
        console.log(this.state);
      });
    })
    .catch(error => {
     console.log(error);
   });
  }

  componentDidUpdate(){
   let course = this.props.location.state.detail;
    const data = {
      course:course
    }
    console.log(data);
    axios.post('/getComments',data)
    .then(response => {
      response.data.reverse();
      this.setState({comments:response.data},()=>{
        console.log(this.state);
      });
    })
    .catch(error => {
     console.log(error);
   });
  }
  render() {
   let  baseComponent=(
          this.state.comments.map(comment =>(
              <div>
                 <Container className="containerx">
                   <Row>
                     <Col sm={4}>
                        <Image className="avatar" src={comment.avatar} roundedCircle thumbnail fluid/>
                         <h4 className="reviewHead">{comment.name}</h4>
                     </Col>
                     <Col sm={8}>
                      <Container className="content" className="reviewBody">
                          <Stars number={comment.rating}/>
                          <br/>
                          <p>
                            {comment.content} 
                          </p>
                          <br/>
                          <Button variant="warning">Edit</Button>
                          <Button variant="danger">Delete</Button>
                       </Container>
                     </Col>
                  </Row>
                   <br/>
            </Container>
             </div>
          ))
      );
    return (
      <div className="xoxoro">
  	     <Jumbotron className="userlist">
      		  <h3 className="commHeader">Comment List</h3>
            {baseComponent}
      		</Jumbotron>
     </div>
  );
  }
}

export default withRouter(ViewComment);

