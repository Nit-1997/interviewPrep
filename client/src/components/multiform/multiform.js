import React,{ Component } from "react";
import  { Redirect,withRouter} from 'react-router-dom'
import {Form,Button,Toast,Pagination,Modal,Spinner} from 'react-bootstrap';
import ErrorImg from '../../assets/error.png';
import axios from 'axios';
import './multiform.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class MultiForm extends Component {
  constructor() {
    super();
    this.state = {
       step:1,
       sampleInput1:'',
       sampleOutput1:'',
       sampleInput2:'',
       sampleOutput2:'',
       testCaseInput1:'',
       testCaseInput2:'',
       testCaseInput3:'',
       testCaseInput4:'',
       testCaseInput5:'',
       testCaseInput6:'',
       testCaseOutput1:'',
       testCaseOutput2:'',
       testCaseOutput3:'',
       testCaseOutput4:'',
       testCaseOutput5:'',
       testCaseOutput6:'',
       sampleExampleInput1:'',
       sampleExampleOutput1:'',
       sampleExampleExplain1:'',
       sampleExampleExplain2:'',
       sampleExampleInput2:'',
       sampleExampleOutput2:'',
       inputFormat:'',
       outputFormat:'',
       constraints:'',
       title:'',
       description:'',
       cppSolution:'',
       javaSolution:'',
       pythonSolution:'',
       jsSolution:'',
       cSolution:'',
       a1:true,
       a2:false,
       a3:false,
       a4:false,
       a5:false,
       disableSubmit:false,
       show:false,
       color:'',
       difficulty:'',
       tags:'',
       isDifficulty:true
    }
  }
  
  onChangeHandler = (e) => {
      this.setState({[e.target.id]:e.target.value},()=>{
        console.log(this.state);
      })
  }

 
 validate = () =>{
      if(this.state.sampleInput1 === ''){
         this.setState({disableSubmit:true})
      }
      if(this.state.sampleOutput1 === ''){
         this.setState({disableSubmit:true})
      }       
      if(this.state.sampleInput2 === ''){
         this.setState({disableSubmit:true})
      }
      if(this.state.sampleOutput2 === ''){
         this.setState({disableSubmit:true})
      }
      if(this.state.testCaseInput1 === ''){
         this.setState({disableSubmit:true})
      }
      if(this.state.testCaseInput2 === ''){
         this.setState({disableSubmit:true})
      }
      if(this.state.testCaseInput3 === ''){
         this.setState({disableSubmit:true})
      }
      if(this.state.testCaseInput4 === ''){
         this.setState({disableSubmit:true})
      }
      if(this.state.testCaseInput5 === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.testCaseInput6 === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.testCaseOutput1 === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.testCaseOutput2 === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.testCaseOutput3 === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.testCaseOutput4 === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.testCaseOutput5 === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.testCaseOutput6 === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.sampleExampleInput1 === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.sampleExampleOutput1 === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.sampleExampleExplain1 === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.sampleExampleExplain2 === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.sampleExampleInput2 === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.sampleExampleOutput2 === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.inputFormat === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.outputFormat === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.constraints === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.title === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.description === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.cppSolution === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.javaSolution === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.pythonSolution === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.jsSolution === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.cSolution === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.tags === ''){
         this.setState({disableSubmit:true});
      }
      if(this.state.difficulty === ''){
         this.setState({disableSubmit:true});
      }
 }

  onSubmitHandler = async (e) =>{
     e.preventDefault();
     await this.validate();
     if(this.state.disableSubmit){
       this.setState({show:true});
     }else{
        console.log('validation success');
        let color;
        if(this.state.difficulty === "easy"){
          color = "green";
        }
        if(this.state.difficulty === "medium"){
          color = "orange";
        }
        if(this.state.difficulty === "hard"){
          color = "red";
        }
        let tags = this.state.tags.split(' ');
        let final = [];
        for(let i=0;i<tags.length;i++){
           let obj = {
              tag : tags[i]
           }
           final.push(obj);
        }

        let question ={
          title:this.state.title,
          description:this.state.description,
          inputFormat:this.state.inputFormat,
          outputFormat:this.state.outputFormat,
          constraints:this.state.constraints,
          sampleExample:[
                           {
                             i:this.state.sampleExampleInput1,
                             o:this.state.sampleExampleOutput1,
                             explain:this.state.sampleExampleExplain1,
                           },
                           {
                             i:this.state.sampleExampleInput2,
                             o:this.state.sampleExampleOutput2,
                             explain:this.state.sampleExampleExplain2,
                           }
                        ],
           testCases  : [
                           {
                             i:this.state.testCaseInput1,
                             o:this.state.testCaseOutput1,
                           },
                           {
                             i:this.state.testCaseInput2,
                             o:this.state.testCaseOutput2,
                           },
                           {
                             i:this.state.testCaseInput3,
                             o:this.state.testCaseOutput3,
                           },
                           {
                             i:this.state.testCaseInput4,
                             o:this.state.testCaseOutput4,
                           },
                           {
                             i:this.state.testCaseInput5,
                             o:this.state.testCaseOutput5,
                           },
                           {
                             i:this.state.testCaseInput6,
                             o:this.state.testCaseOutput6,
                           }
                        ],
          sampleCases  : [
                           {
                             i:this.state.sampleInput1,
                             o:this.state.sampleOutput1,
                           },
                           {
                             i:this.state.sampleInput2,
                             o:this.state.sampleOutput2,
                           }
                        ],
          correctCode  : [{ cpp: this.state.cppSolution,
                           java: this.state.javaSolution,
                           python: this.state.pythonSolution,
                           node: this.state.jsSolution,
                           c: this.state.cSolution
                         }],
          color        : color,
          tags         : final,
          difficulty   : this.state.difficulty
        }
        console.log(question);
        this.props.addQuestions(question,this.props.username);
     }
  }
 
  async componentDidUpdate(){
    if(localStorage.getItem('addedQuestion')){
      if(this.props.questions){
        this.props.history.push({
              pathname: '/questions'
        });
      }
    }
  }

  handleClose = () => {
        this.setState({show:false,disableSubmit:false});
  }
 
  stepHandler = (e) =>{
     if(e==1){
        this.setState({a1:true,a2:false,a3:false,a4:false,a5:false});
     }
     if(e==2){
        this.setState({a1:false,a2:true,a3:false,a4:false,a5:false});
     }
     if(e==3){
        this.setState({a1:false,a2:false,a3:true,a4:false,a5:false});
     }
     if(e==4){
        this.setState({a1:false,a2:false,a3:false,a4:true,a5:false});
     }
     if(e==5){
        this.setState({a1:false,a2:false,a3:false,a4:false,a5:true});
     }
     this.setState({step:e},()=>{
        console.log(this.state.step);
     });
  }

  onDifficultyHandler = (e)=>{
     if(e.target.value === "easy"){
        this.setState({isDifficulty:false,isEasy:true,isMedium:false,isHard:false});
     }
     else if(e.target.value === "medium"){
        this.setState({isDifficulty:false,isEasy:false,isMedium:true,isHard:false});
     }
     else if(e.target.value === "hard"){
       this.setState({isDifficulty:false,isEasy:false,isMedium:false,isHard:true});
     }else{
       this.setState({isDifficulty:true,isEasy:false,isMedium:false,isHard:false});
     }
     this.setState({[e.target.id]:e.target.value},()=>{
        console.log(this.state);
      })
  }


  render() {
    let basecomp;
    if(this.state.step === 1){
          //problem details
          basecomp = (
                  <div>
                      <div className="form-label-group">
                           <textarea placeholder="Enter the title of the problem" value={this.state.title} onChange={this.onChangeHandler} type="textarea" id="title" className="form-control extraquestion" required autofocus/>
                      </div>
                      <div className="form-label-group">
                           <textarea placeholder="Enter Problem Statement" value={this.state.description} onChange={this.onChangeHandler} type="textarea" id="description" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                           <textarea placeholder="Input Format" value={this.state.inputFormat} onChange={this.onChangeHandler} type="textarea" id="inputFormat" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                           <textarea placeholder="Output Format" value={this.state.outputFormat} onChange={this.onChangeHandler} type="textarea" id="outputFormat" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                           <textarea placeholder="Constraints" value={this.state.constraints} onChange={this.onChangeHandler} type="textarea" id="constraints" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-group">
                          <select onChange={this.onDifficultyHandler} id="difficulty" className="form-control extra" required autofocus>
                              <option disabled selected={this.state.isDifficulty}>Difficulty</option>
                              <option value="easy" selected = {this.state.isEasy}>Easy</option>
                              <option value="medium" selected = {this.state.isMedium}>Medium</option>
                              <option value="hard" selected = {this.state.isHard}>Hard</option>
                          </select>
                        </div>
                       <div className="form-label-group">
                           <textarea placeholder="tags" value={this.state.tags} onChange={this.onChangeHandler} type="textarea" id="tags" className="form-control extraquestion" required autofocus/>
                       </div>                                
                   </div>    
                  )
    }else if(this.state.step === 2){
          basecomp = (
                    <div>
                      <div className="form-label-group">
                            <textarea placeholder="Sample Example Input 1" value={this.state.sampleExampleInput1} onChange={this.onChangeHandler} type="textarea" id="sampleExampleInput1" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                            <textarea placeholder="Sample Example Output 1" value={this.state.sampleExampleOutput1} onChange={this.onChangeHandler} type="textarea" id="sampleExampleOutput1" className="form-control extraquestion" required autofocus/>
                       </div> 
                       <div className="form-label-group">
                            <textarea placeholder="Sample Example Explaination 1" value={this.state.sampleExampleExplain1} onChange={this.onChangeHandler} type="textarea" id="sampleExampleExplain1" className="form-control extraquestion" required autofocus/>
                       </div> 
                       <div className="form-label-group">
                            <textarea placeholder="Sample Example Input 2" value={this.state.sampleExampleInput2} onChange={this.onChangeHandler} type="textarea" id="sampleExampleInput2" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                            <textarea placeholder="Sample Example Output 2" value={this.state.sampleExampleOutput2} onChange={this.onChangeHandler} type="textarea" id="sampleExampleOutput2" className="form-control extraquestion" required autofocus/>
                       </div> 
                       <div className="form-label-group">
                            <textarea placeholder="Sample Example Explaination 2" value={this.state.sampleExampleExplain2} onChange={this.onChangeHandler} type="textarea" id="sampleExampleExplain2" className="form-control extraquestion" required autofocus/>
                       </div>             
                     </div>  
                       
                  )
    }else if(this.state.step === 3){
          basecomp = (
                     <div>
                      <div className="form-label-group">
                            <textarea placeholder="Sample Test Case Input 1" value={this.state.sampleInput1} onChange={this.onChangeHandler} type="textarea" id="sampleInput1" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                            <textarea placeholder="Sample Test Case Output 1" value={this.state.sampleOutput1} onChange={this.onChangeHandler} type="textarea" id="sampleOutput1" className="form-control extraquestion" required autofocus/>
                       </div> 
                       <div className="form-label-group">
                            <textarea placeholder="Sample Test Case Input 2" value={this.state.sampleInput2} onChange={this.onChangeHandler} type="textarea" id="sampleInput2" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                            <textarea placeholder="Sample Test Case Output 2" value={this.state.sampleOutput2} onChange={this.onChangeHandler} type="textarea" id="sampleOutput2" className="form-control extraquestion" required autofocus/>
                       </div> 
                     </div>  
                  )
    }else if(this.state.step === 4){
          basecomp = (
                   <div>
                      <div className="form-label-group">
                            <textarea placeholder="Test Case Input 1" value={this.state.testCaseInput1} onChange={this.onChangeHandler} type="textarea" id="testCaseInput1" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                            <textarea placeholder="Test Case Output 1" value={this.state.testCaseOutput1} onChange={this.onChangeHandler} type="textarea" id="testCaseOutput1" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                            <textarea placeholder="Test Case Input 2" value={this.state.testCaseInput2} onChange={this.onChangeHandler} type="textarea" id="testCaseInput2" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                            <textarea placeholder="Test Case Output 2" value={this.state.testCaseOutput2} onChange={this.onChangeHandler} type="textarea" id="testCaseOutput2" className="form-control extraquestion" required autofocus/>
                       </div> 
                       <div className="form-label-group">
                            <textarea placeholder="Test Case Input 3" value={this.state.testCaseInput3} onChange={this.onChangeHandler} type="textarea" id="testCaseInput3" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                            <textarea placeholder="Test Case Output 3" value={this.state.testCaseOutput3} onChange={this.onChangeHandler} type="textarea" id="testCaseOutput3" className="form-control extraquestion" required autofocus/>
                       </div> 
                       <div className="form-label-group">
                            <textarea placeholder="Test Case Input 4" value={this.state.testCaseInput4} onChange={this.onChangeHandler} type="textarea" id="testCaseInput4" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                            <textarea placeholder="Test Case Output 4" value={this.state.testCaseOutput4} onChange={this.onChangeHandler} type="textarea" id="testCaseOutput4" className="form-control extraquestion" required autofocus/>
                       </div> 
                       <div className="form-label-group">
                            <textarea placeholder="Test Case Input 5" value={this.state.testCaseInput5} onChange={this.onChangeHandler} type="textarea" id="testCaseInput5" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                            <textarea placeholder="Test Case Output 5" value={this.state.testCaseOutput5} onChange={this.onChangeHandler} type="textarea" id="testCaseOutput5" className="form-control extraquestion" required autofocus/>
                       </div> 
                       <div className="form-label-group">
                            <textarea placeholder="Test Case Input 6" value={this.state.testCaseInput6} onChange={this.onChangeHandler} type="textarea" id="testCaseInput6" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                            <textarea placeholder="Test Case Output 6" value={this.state.testCaseOutput6} onChange={this.onChangeHandler} type="textarea" id="testCaseOutput6" className="form-control extraquestion" required autofocus/>
                       </div>  
                   </div>    
                  )
    }else if(this.state.step === 5){
          basecomp = (
                   <div>
                      <div className="form-label-group">
                           <textarea placeholder="Solution in C" style={{'height':'500px'}} value={this.state.cSolution} onChange={this.onChangeHandler} type="textarea" id="cSolution" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                           <textarea placeholder="Solution in C++" style={{'height':'500px'}} value={this.state.cppSolution} onChange={this.onChangeHandler} type="textarea" id="cppSolution" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                           <textarea placeholder="Solution in Java" style={{'height':'500px'}} value={this.state.javaSolution} onChange={this.onChangeHandler} type="textarea" id="javaSolution" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                           <textarea placeholder="Solution in Python" style={{'height':'500px'}} value={this.state.pythonSolution} onChange={this.onChangeHandler} type="textarea" id="pythonSolution" className="form-control extraquestion" required autofocus/>
                       </div>
                       <div className="form-label-group">
                           <textarea placeholder="Solution in JavaScript" style={{'height':'500px'}} value={this.state.jsSolution} onChange={this.onChangeHandler} type="textarea" id="jsSolution" className="form-control extraquestion" required autofocus/>
                       </div>
                      
                        <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Submit</button>
                    </div>   
                  )
    }

    let finalComp;
    if(this.props.loading){
       finalComp = (
           <div style={{'text-align':'center'}}>
                   <Spinner  style={{'height':'100px','width':'100px'}} animation="border"/>         
           </div>
       );
    }else{
      finalComp = (
          <div>
            {basecomp}
          </div>
      );
    }
    
    return (
      <div>
          <Modal className="commHeader" show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title style={{'color':'red'}}>Mandatory Fields Empty!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>You have not filled all the fields in the form first fill all the fields then try submiting again.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
       
         <Pagination>
            <Pagination.Item active={this.state.a1} onClick={() => this.stepHandler(1)}>
               Problem details
            </Pagination.Item>
            <Pagination.Item active={this.state.a2} onClick={() => this.stepHandler(2)} >
               Sample Examples
            </Pagination.Item>
             <Pagination.Item active={this.state.a3} onClick={() => this.stepHandler(3)}>
               Sample Test Cases
            </Pagination.Item>
            <Pagination.Item active={this.state.a4} onClick={() => this.stepHandler(4)}>
               Test Cases 
            </Pagination.Item>
            <Pagination.Item active={this.state.a5} onClick={() => this.stepHandler(5)}>
               Solution in different languages 
            </Pagination.Item>
         </Pagination> 
         <form onSubmit={this.onSubmitHandler}> 
            {finalComp}            
         </form>
     </div>
    );
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    addQuestions: (formData,username)=>dispatch(actions.addQuestions(formData,username))
  }
}
const mapStateToProps = state =>{
  console.log(state);
  return{
    loading:state.ques.loading,
    questions:state.ques.questions,
    username :state.auth.user.username
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(MultiForm));