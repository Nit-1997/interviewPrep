import React,{ Component } from "react";
import  { Redirect } from 'react-router-dom'
import {Form,Button,Toast} from 'react-bootstrap';
import ErrorImg from '../../assets/error.png';
import axios from 'axios';
import './addquestion.css';
import MultiStepForm from '../multiform/multiform';

class AddQuestion extends Component {
  constructor() {
    super();
    this.state = {
        
   }
  }
  
  onChangeHandler = (e) => {
      this.setState({[e.target.id]:e.target.value},()=>{
        console.log(this.state);
      })
  }


  onSubmitHandler = (e) =>{
     e.preventDefault();
    
  }

  render() {
        let baseComponent;
          if(this.props.loggedIn){
            baseComponent=(
                 <MultiStepForm/>
            );
          }else{
             baseComponent=(
                      <div className="col-lg-12 text-center">
                        <h2 className="section-heading text-uppercase">404 planet not found!!!</h2>
                      </div>
             );
          }
    return (
      <div className="commHeader">     
          <div className="container-fluid">
              <div className="row no-gutter">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                <div className="col-md-8 col-lg-6">
                  <div className="login d-flex align-items-center py-5">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-9 col-lg-8 mx-auto">
                         <br/><br/>
                          <h3 className="login-heading mb-4">Add Question</h3>
                             {baseComponent}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           </div>
     </div>
    );
  }
}

export default AddQuestion;
