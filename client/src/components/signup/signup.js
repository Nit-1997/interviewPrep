import React,{ Component } from "react";
import './signup.css';
import  { Redirect } from 'react-router-dom'
import {Form,Button,Toast,Spinner} from 'react-bootstrap';
import ErrorImg from '../../assets/error.png';
import axios from 'axios';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
        email:'',
        name:'',
        college:'',
        branch:'',
        year:'',
        password:'',
        confirm:'',
        image:'',
        show:false
   }
  }
  
  onChangeHandler = (e) => {
      this.setState({[e.target.id]:e.target.value},()=>{
        console.log(this.state);
      })
  }

  onChangeHandlerFile = (e) =>{
    this.setState({image:e.target.files[0]},()=>{
        console.log(this.state);
      })
  }

  onSubmitHandler = (e) =>{
     e.preventDefault();
    if(this.state.password === this.state.confirm){
        const formData = new FormData();
        formData.append('image',this.state.image);
        formData.append('email',this.state.email);
        formData.append('name',this.state.name);
        formData.append('college',this.state.college);
        formData.append('branch',this.state.branch);
        formData.append('year',this.state.year);
        formData.append('password',this.state.password);
        this.props.onSignup(formData,this.state.email,this.state.password);
        // this.props.history.push({
        //       pathname: '/'
        //  });
    }else{
      window.scrollTo(0, 0);
      this.setState({show:true},()=>{
        console.log(this.state.show);
      });  
    }
  }

  render() {
    let baseComp;
    if(this.props.loading){
       baseComp = (
          <div style={{'text-align':'center'}}>
                   <Spinner  style={{'height':'100px','width':'100px'}} animation="border"/>         
           </div>
        ) 
    }else{
      baseComp = (
        <form onSubmit={this.onSubmitHandler}>
                        
                        <div className="form-label-group">
                          <input onChange={this.onChangeHandler} type="email" id="email" className="form-control" placeholder="Email address" required autofocus/>
                          <label for="email">Email address</label>
                        </div>

                       <div className="form-label-group">
                            <input className="form-control" onChange={this.onChangeHandlerFile} type="file" id="image" name="image" accept="image/*" required/>
                            <label for="username">Upload Avatar</label>
                       </div>
                       
                        <div className="form-label-group">
                          <input onChange={this.onChangeHandler} type="text" id="name" className="form-control" placeholder="Enter name" required autofocus/>
                          <label for="name">Name</label>
                        </div>
                       
                         <div className="form-group">
                          <select onChange={this.onChangeHandler} id="college" className="form-control extra" required autofocus>
                              <option disabled selected>College</option>
                              <option value="SJCE">SJCE</option>
                              <option value="NIE">NIE</option>
                              <option value="VVCE">VVCE</option>
                              <option value="Others">Others</option>
                          </select>
                        </div>


                       <div className="form-group">
                          <select onChange={this.onChangeHandler} id="branch" className="form-control extra" required autofocus>
                              <option disabled selected>Select Branch</option>
                              <option value="CSE">CSE</option>
                              <option value="ISE">ISE</option>
                              <option value="ECE">ECE</option>
                              <option value="EEE">EEE</option>
                              <option value="EI">EI</option>
                              <option value="MECH">MECH</option>
                              <option value="IP">IP</option>
                              <option value="CIVIL">CIVIL</option>
                              <option value="CTM">CTM</option>
                              <option value="ENV">ENV</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <select onChange={this.onChangeHandler} id="year" className="form-control extra" required autofocus>
                              <option disabled selected>Year</option>
                              <option value="1">First Year</option>
                              <option value="2">Second Year</option>
                              <option value="3">Third Year</option>
                              <option value="4">Fourth Year</option>
                          </select>
                        </div>

                        <div className="form-label-group">
                          <input onChange={this.onChangeHandler} type="password" id="password" className="form-control" placeholder="Password" required/>
                          <label for="password">Password</label>
                        </div>
                        <div className="form-label-group">
                          <input onChange={this.onChangeHandler} type="password" id="confirm" className="form-control" placeholder="Confirm Password" required/>
                          <label for="confirm">Confirm Password</label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign Up</button>          
                      </form>
      )
    }
    return (
      <div className="commHeader">
         <Toast
        onClose={() => this.setState({show:false})}
        show={this.state.show} delay={4000} autohide
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
          <Toast.Header>
              <img src={ErrorImg} className="rounded mr-2 toastImg" alt="" />
              <strong className="mr-auto">Password Mistmatch</strong>
              <small>just now</small>
          </Toast.Header>

          <Toast.Body>
             Passwords don't match
          </Toast.Body>
      </Toast>


      <div className="container-fluid">
          <div className="row no-gutter">
            <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
            <div className="col-md-8 col-lg-6">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-lg-8 mx-auto">
                      <h3 className="login-heading mb-4">Sign Up</h3>
                        {baseComp}
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

const mapDispatchToProps = dispatch =>{
  return{
    onSignup:(formData,username,password) => dispatch(actions.signup(formData,username,password))
  }
}

const mapStateToProps = state =>{
    return{
     loading:state.auth.loading,
     error:state.auth.error,
     user:state.auth.user
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Signup);
