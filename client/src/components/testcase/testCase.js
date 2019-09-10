import React,{Component} from "react";
import {Form,Button,Jumbotron,Col,Container,Row,Image,Dropdown,Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import SingleFinalTest from '../singleFinalTest/singleFinalTest'; 


class TestCase extends Component {
 constructor() {
    super();
    this.state = {
        cases:null
   }
  }
 componentDidMount(){
    
 }

  componentDidUpdate(){

  }

  render() {
    let baseComponent=(
          this.props.testCases.map(testCase =>(
               <SingleFinalTest  color = {testCase.color} verdict={testCase.verdict}/>
          ))
    );
    return (
      <div>
         <Jumbotron className="commHeader resultComp">
            <p className="commHeader contentCodex">Score:- <strong>{this.props.score}</strong></p>
          <Row>
           {baseComponent}
          </Row>
         </Jumbotron>
      </div>
  );
  }
}

export default withRouter(TestCase);