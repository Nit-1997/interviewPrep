import React,{Component} from "react";
import {Form,Button,Jumbotron,Col,Container,Row,Image,Dropdown,Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';


class SampleTest extends Component {
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
               <h3  style={{'color': this.props.color}}>{this.props.verdict}</h3>
                <div style={{'background': '#FFFFFF'}}className="sampleResults1 commHeader">
                    <p className="sampleCaseBox">
                       <strong>Input:-</strong><br/>
                       <Jumbotron id="box2">
                         {this.props.testCase.i}<br/>
                       </Jumbotron>
                       <strong>Your output:-</strong><br/>
                       <Jumbotron id="box2">
                          {this.props.testCase.stdout}<br/>
                       </Jumbotron>
                       <strong>Expected Output:-</strong><br/>
                       <Jumbotron id="box2">
                        {this.props.testCase.eo}<br/>
                       </Jumbotron> 
                    </p>
                </div>
            </Col>
  );
  }
}

export default withRouter(SampleTest);