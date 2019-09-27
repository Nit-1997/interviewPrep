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

   }
  }

   componentDidMount(){

  }

  render() {
    let baseComp;
    if(this.props.loggedIn){
      console.log(this.props)
     baseComp =(
           <Code
            {...this.props}
            testCases = {this.props.location.state.detail.testCases}
            sampleCases = {this.props.location.state.detail.sampleCases}
            title = {this.props.location.state.detail.title}
            description = {this.props.location.state.detail.description}
            sampleExample= {this.props.location.state.detail.sampleExample}
            inputFormat = {this.props.location.state.detail.inputFormat}
            outputFormat={this.props.location.state.detail.outputFormat}
            constraints={this.props.location.state.detail.constraints}
            correctCode={this.props.location.state.detail.correctCode}
            id={this.props.location.state.detail._id}
            difficulty={this.props.location.state.detail.difficulty}
            color={this.props.location.state.detail.color}
         />
       )
       }else{
         baseComp = (
            <div className="col-lg-12 text-center">
                  <h2 className="section-heading text-uppercase">404 planet not found!!!</h2>
           </div>
          )
       }
    return (
       <div>
          {baseComp}
       </div>
    );
  }
}

export default withRouter(Base);
