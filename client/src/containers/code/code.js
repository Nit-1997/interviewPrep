import React, { Component } from 'react';
import './code.css';
import axios from '../../axios';
import {Form,Button,Jumbotron,Col,Container,Row,Image,Dropdown,Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import Code from '../../components/code/code';

class Base extends Component {
  constructor() {
    super();
    this.state = {
        testCases:[{i:'3\n1 2 3',o:'6'},{i:'4\n1 2 3 4',o:'10'},{i:'1\n5',o:'5'},{i:'',o:''},{i:'2\n1 2',o:'3'},{i:'2\n90 100',o:'190'}],
        sampleCases:[{i:'3\n1 2 3',o:'6'},{i:'4\n1 2 3 4',o:'10'}],
        title:'Find Sum',
        description:'input n numbers and evaluate their sum and print it.Complete the simpleArraySum function in the editor below.It must return the sum of the array elements as an integer.simpleArraySum has the following parameter(s):',
        inputFormat:'The first line contains an integer n denoting the size of the array.\nThe second line contains  n space-separated integers representing the array elements.',
        constraints:'n>0 , arr[i]<=1000',
        outputFormat:'Print the sum of the array elements as a single integer.',
        sampleExample:{i:'3\n1 2 3',o:'6',explain:'sum of 1+2+3 = 6 hence 6 is the answer.'}
   }
  }

  render() {
    return (
       <div>
          <Code
            {...this.props}
            testCases = {this.state.testCases}
            sampleCases = {this.state.sampleCases}
            title = {this.state.title}
            description = {this.state.description}
            sampleExample= {this.state.sampleExample}
            inputFormat = {this.state.inputFormat}
            outputFormat={this.state.outputFormat}
            constraints={this.state.constraints}
         />
       </div>
    );
  }
}

export default withRouter(Base);
