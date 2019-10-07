import React,{ Component } from "react";
import  { Redirect,withRouter } from 'react-router-dom';
import {Form,Button,Spinner} from 'react-bootstrap';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';


class UpdateCourse extends Component {
  constructor() {
    super();
    this.state = {
        title:'',
        image:'',
        details:'',
        course:null
   }
  }

  componentDidMount(){
    if(this.props.loggedIn){
        let courseDetails = this.props.location.state.detail;
        this.setState({course:courseDetails,title:courseDetails.title,image:courseDetails.image,details:courseDetails.details},()=>{
           console.log(this.state);
        });
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

  async componentDidUpdate(){
    if(localStorage.getItem('updatedCourse')){
      if(this.props.courses){
        this.props.history.push({
              pathname: '/courses'
        });
      }
    }
  }

  onSubmitHandler = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('image',this.state.image);
    formData.append('_id',this.state.course._id);
    formData.append('title',this.state.title);
    formData.append('details',this.state.details);
    this.props.editCourse(formData);
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
                          <input value={this.state.title} onChange={this.onChangeHandler} type="text" id="title" className="form-control" placeholder="Enter Course Title" required autofocus/>
                          <label for="title">Course Title</label>
                        </div>
   

                       <div className="form-label-group">
                            <input className="form-control" onChange={this.onChangeHandlerFile} type="file" id="image" name="image" accept="image/*" required/>
                            <label for="image">Upload Image</label>
                       </div>
                      
                        <div className="form-label-group">
                           <textarea value={this.state.details} placeholder="Course Details" style={{'height':'200px'}}  onChange={this.onChangeHandler} type="textarea" id="details" className="form-control extraquestion" required autofocus/>
                           
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
                      <h3 className="login-heading mb-4">Edit Course</h3>
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
    editCourse: (formData)=>dispatch(actions.updateCourse(formData)),
  }
}
const mapStateToProps = state =>{
  console.log(state);
  return{
    loading:state.course.loading,
    courses:state.course.courses
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UpdateCourse));

