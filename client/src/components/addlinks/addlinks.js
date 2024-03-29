import React,{ Component } from "react";
import  {Redirect,withRouter} from 'react-router-dom';
import {Form,Button,Spinner} from 'react-bootstrap';
import axios from '../../axios';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class AddLinks extends Component {
   state = {
        course:null,
        link:'',
        title:'',
        type:''
   }
  
 componentDidMount(){
    if(this.props.loggedIn){
        let courseDetails = this.props.location.state.detail;
        this.setState({course:courseDetails},()=>{
           console.log(this.state);
        });
    }
  }

  async componentDidUpdate(){
    if(localStorage.getItem('addedCourseContent')){
      if(this.props.courses){
        this.props.history.push({
              pathname: '/courses'
        });
      }
    }
  }

  onChangeHandler = (e) => {
      this.setState({[e.target.id]:e.target.value},()=>{
        console.log(this.state);
      })
  }

  onSubmitHandler = (e) =>{
      e.preventDefault();
      const formData = {
       link:this.state.link,
       title:this.state.title,
       course:this.state.course,
       type:this.state.type
    }
    this.props.addCoursesContent(formData);
  
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
                          <input onChange={this.onChangeHandler} type="text" id="title" className="form-control" placeholder="Enter Link Title" required autofocus/>
                          <label for="title">Title</label>
                        </div>
 
                         <div className="form-group">
                          <select onChange={this.onChangeHandler} id="type" className="form-control extra" required autofocus>
                               <option disabled selected>Select Type</option>
                               <option value="video">video</option>
                               <option value="document">document</option>
                          </select>
                        </div>

                         <div className="form-label-group">
                          <input onChange={this.onChangeHandler} type="text" id="link" className="form-control" placeholder="Enter Link" required autofocus/>
                          <label for="link">Link</label>
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
                      <h3 className="login-heading mb-4">Add Links</h3>
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
    addCoursesContent: (formData)=>dispatch(actions.addCoursesContent(formData)),
  }
}
const mapStateToProps = state =>{
  console.log(state);
  return{
    loading:state.course.loading,
    courses:state.course.courses
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(AddLinks));



