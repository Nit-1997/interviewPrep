import React,{Component} from "react";
import {Form,Button,Jumbotron,Col,Container,Row,Image,Dropdown,Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
// import starFull from '../../assets/star-full.png';
import SingleTest from '../singleTest/singleTest'; 


class CustomTestCase extends Component {
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
               <SingleTest testCase = {this.props.testCase} color = {this.props.testCase.color} verdict={this.props.testCase.verdict}/>
     );
    return (
      <div>
         <Jumbotron className="commHeader resultComp">
            <p className="commHeader contentCodex">Custom Test Case</p>
          <Row style={{'justify-content':'inherit'}}>
           {baseComponent}
          </Row>
            submit the code to test against other test cases<br/><br/>
         </Jumbotron>
      </div>
  );
  }
}

export default withRouter(CustomTestCase);