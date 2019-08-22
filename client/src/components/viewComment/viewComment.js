import React,{Component} from "react";
import './viewComment.css';
import {Form,Button,Jumbotron,Col,Container,Row,Image} from 'react-bootstrap';
import axios from '../../axios';
import {withRouter} from 'react-router-dom';
import starFull from '../../assets/star-full.png';

class ViewComment extends Component {
 
  render() {
    return (
      <div className="xoxoro">
  	     <Jumbotron className="userlist">
      		  <h3 className="commHeader">Comment List</h3>
            <Container className="containerx">
                   <Row>
                     <Col sm={4}>
                        <Image className="avatar" src={starFull} roundedCircle thumbnail fluid/>
                         <h4 className="reviewHead">nitin</h4>
                     </Col>
                     <Col sm={8}>
                      <Container className="content" className="reviewBody">
                          <img src={starFull} className="icon babyz" />
                          <img src={starFull} className="icon babyz" />
                          <img src={starFull} className="icon babyz" />
                          <img src={starFull} className="icon babyz" />
                          <img src={starFull} className="icon babyz" />
                          <br/>
                          <p>
                           The Col lets you specify column widths across 5 breakpoint sizes (xs, sm, md, large, and xl). For every breakpoint, you can specify the amount of columns to span, or set the prop to  for auto layout widths.
                          </p>
                          <br/>
                          <Button variant="warning">Edit</Button>
                          <Button variant="danger">Delete</Button>
                       </Container>
                     </Col>
                  </Row>
                   <br/>
            </Container>
            <Container className="containerx">
                   <Row>
                     <Col sm={4}>
                        <Image className="avatar" src={starFull} roundedCircle thumbnail fluid/>
                         <h4 className="reviewHead">nitin</h4>
                     </Col>
                     <Col sm={8}>
                      <Container className="content" className="reviewBody">
                          <img src={starFull} className="icon babyz" />
                          <img src={starFull} className="icon babyz" />
                          <img src={starFull} className="icon babyz" />
                          <img src={starFull} className="icon babyz" />
                          <img src={starFull} className="icon babyz" />
                          <br/>
                          <p>
                           The Col lets you specify column widths across 5 breakpoint sizes (xs, sm, md, large, and xl). For every breakpoint, you can specify the amount of columns to span, or set the prop to  for auto layout widths.
                          </p>
                          <br/>
                          <Button variant="warning">Edit</Button>
                          <Button variant="danger">Delete</Button>
                       </Container>
                     </Col>
                  </Row>
                   <br/>
            </Container>


      		</Jumbotron>
     </div>
  );
  }
}

export default withRouter(ViewComment);

