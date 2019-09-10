import React,{Component} from "react";
import {Form,Button,Jumbotron,Col,Container,Row,Image,Dropdown,Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';


class Test extends Component {
 constructor() {
    super();
    this.state = {
      
   }
  }
 componentDidMount(){
    
 }

  componentDidUpdate(){

  }

  render() {
    return (
            <Col xs={12} md={6} className="sampleResultsBox">
                <div style={{'background': '#FFFFFF'}}className="sampleResults1 commHeader">
                    <p className="sampleCaseBox">
                       <h3  style={{'color': this.props.color}}>{this.props.verdict}</h3>
                    </p>
                </div>
            </Col>
  );
  }
}

export default withRouter(Test);