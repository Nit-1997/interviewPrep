import React, { Component } from 'react';
import axios from '../../axios';
import {Form,Button,Jumbotron,Col,Container,Row,Image,Dropdown,Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import Code from '../code/code';
import Cookies from 'universal-cookie';


class quesCard extends Component {
  constructor() {
    super();
    this.state = {
        
   }
  }

  questionHandler = (question) => {
      console.log(question);
      this.props.history.push({
              pathname: '/code',
              state: { detail:question }
          });
  }

  render() {
    return (
         <div style={{'color':this.props.question.quesColor}} className="col-md-4 col-sm-6 portfolio-item" onClick={() => this.questionHandler(this.props.question)}>
                <div className="portfolio-caption quesCarder">
                  <h4>{this.props.question.title}</h4>
                </div>
         </div>
    );
  }
}

export default withRouter(quesCard);
