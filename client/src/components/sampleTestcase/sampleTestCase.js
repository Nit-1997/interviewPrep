import React,{Component} from "react";
import {Form,Button,Jumbotron,Col,Container,Row,Image,Dropdown,Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
// import starFull from '../../assets/star-full.png';
import SingleTest from '../singleTest/singleTest'; 
import './sampleTestCase.css';

class SampleTestCase extends Component {
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
          this.props.response.map(testCase =>(
               <SingleTest testCase = {testCase} color = {testCase.color} verdict={testCase.verdict}/>
          ))
    );
    return (
      <div>
         <Jumbotron className="commHeader resultComp">
            <p className="commHeader contentCodex">Sample Test Cases</p>
          <Row>
           {baseComponent}
          </Row>
            submit the code to test against other test cases<br/><br/>
         </Jumbotron>
      </div>
  );
  }
}

export default withRouter(SampleTestCase);