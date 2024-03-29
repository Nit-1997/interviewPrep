import React,{ Component } from "react";
import  { Redirect } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {Form,Button,Spinner} from 'react-bootstrap';
import axios, { post } from 'axios';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Create extends Component {
  constructor() {
    super();
    this.state = {
        title:'',
        image:'',
        details:''
   }
  }
  
  onChangeHandler = (e) => {
      this.setState({[e.target.id]:e.target.value},()=>{
        console.log(this.state);
      })
  }

  onChangeHandlerFile = (e) =>{
    this.setState({image:e.target.files[0]},()=>{
        console.log(this.props);
      })
  }
  
  onSubmitHandler = async (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('image',this.state.image);
    formData.append('title',this.state.title);
    formData.append('details',this.state.details);
    this.props.addCourse(formData);
  }

  async componentDidUpdate(){
    if(localStorage.getItem('addedCourse')){
      if(this.props.courses){
        this.props.history.push({
              pathname: '/courses'
        });
      }
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
                          <input onChange={this.onChangeHandler} type="text" id="title" className="form-control" placeholder="Enter Course Title" required autofocus/>
                          <label for="title">Course Title</label>
                        </div>
   

                       <div className="form-label-group">
                            <input className="form-control" onChange={this.onChangeHandlerFile} type="file" id="image" name="image" accept="image/*" required/>
                            <label for="image">Upload Image</label>
                       </div>
                      
                        <div className="form-label-group">
                           <textarea placeholder="Course Details" style={{'height':'200px'}}  onChange={this.onChangeHandler} type="textarea" id="details" className="form-control extraquestion" required autofocus/>
                           
                       </div>
                      
                        <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Add Course</button>          
        </form>
      );
     }
    return (
       <div className="container-fluid">
          <div className="row no-gutter">
            <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
            <div className="col-md-8 col-lg-6">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-lg-8 mx-auto">
                      <h3 className="login-heading mb-4">Add Course</h3>
                        {baseComp}
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
    addCourse: (formData)=>dispatch(actions.addCourses(formData)),
    fetchCourses:()=>dispatch(actions.fetchCourses())
  }
}
const mapStateToProps = state =>{
  console.log(state);
  return{
    addedCourse:state.course.addedCourse,
    loading:state.course.loading,
    courses:state.course.courses
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Create));

