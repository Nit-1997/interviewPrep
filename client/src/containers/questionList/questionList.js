import React, { Component } from 'react';
import axios from '../../axios';
import {Form,Button,Jumbotron,Col,Container,Row,Image,Dropdown,Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import Code from '../code/code';
import Cookies from 'universal-cookie';
import QuesCard from '../../components/quesCard/quesCard';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import HashMap from '../../utils/hashmaps';

class QuestionList extends Component {
  constructor() {
    super();
    this.state = {
        questions:[],
        easyQues:[],
        mediumQues:[],
        hardQues:[],
        allQues:[],
        loading:false
   }
  }

 
 componentDidMount(){
    if(this.props.loggedIn){
         console.log('comp did mount');
         let quesData = JSON.parse(localStorage.getItem('quesData'));
         if(localStorage.getItem('addedQuestion')){
            localStorage.removeItem('addedQuestion')
         }
         console.log(quesData);
         if(quesData){
                let allQues = [...quesData.allQuestions];
                this.setState({questions:allQues});
                let easyQues = [];
                let hardQues = [];
                let mediumQues = [];
                const hashMap = new HashMap();
              for(let j=0;j<allQues.length;j++){
                  allQues[j].solved = false;
                  allQues[j].quesColor = 'red';
                }
                for(let j=0;j<allQues.length;j++){
                  if(allQues[j].difficulty === "easy"){
                    easyQues.push(allQues[j]);
                  }
                  if(allQues[j].difficulty === "medium"){
                    mediumQues.push(allQues[j]); 
                  }
                  if(allQues[j].difficulty === "hard"){
                    hardQues.push(allQues[j]);
                  }
                }  
                for(let i=0;i<quesData.solvedQuestions.length;i++){
                  hashMap.set(quesData.solvedQuestions[i].id,quesData.solvedQuestions[i].id);
                }
                for(let j=0;j<allQues.length;j++){
                  if(hashMap.has(allQues[j]._id)){
                    allQues[j].solved = true;
                    allQues[j].quesColor = 'green';
                  }
                  if(localStorage.getItem(allQues[j]._id)){
                    allQues[j].solved = true;
                    allQues[j].quesColor = 'green'; 
                  }
                }
                 this.setState({questions:allQues,easyQues:easyQues,mediumQues:mediumQues,hardQues:hardQues,allQues:allQues},()=>{
                  console.log(this.state);
                });
         }  
    }  
  }



  componentDidUpdate(){
    if(this.state.questions.length === 0&&this.state.easyQues.length === 0&&this.state.mediumQues.length === 0&&this.state.hardQues.length === 0){
       console.log('comp did update');
         let quesData = JSON.parse(localStorage.getItem('quesData'));
         console.log(quesData);
         if(quesData){
                 let allQues = [...quesData.allQuestions];
                this.setState({questions:allQues});
                let easyQues = [];
                let hardQues = [];
                let mediumQues = [];
                const hashMap = new HashMap();
              for(let j=0;j<allQues.length;j++){
                  allQues[j].solved = false;
                  allQues[j].quesColor = 'red';
                }
                for(let j=0;j<allQues.length;j++){
                  if(allQues[j].difficulty === "easy"){
                    easyQues.push(allQues[j]);
                  }
                  if(allQues[j].difficulty === "medium"){
                    mediumQues.push(allQues[j]); 
                  }
                  if(allQues[j].difficulty === "hard"){
                    hardQues.push(allQues[j]);
                  }
                }  
                for(let i=0;i<quesData.solvedQuestions.length;i++){
                  hashMap.set(quesData.solvedQuestions[i].id,quesData.solvedQuestions[i].id);
                }
                for(let j=0;j<allQues.length;j++){
                  if(hashMap.has(allQues[j]._id)){
                    allQues[j].solved = true;
                    allQues[j].quesColor = 'green';
                  }
                  if(localStorage.getItem(allQues[j]._id)){
                    allQues[j].solved = true;
                    allQues[j].quesColor = 'green'; 
                  }
                }
                this.setState({questions:allQues,easyQues:easyQues,mediumQues:mediumQues,hardQues:hardQues,allQues:allQues},()=>{
                  console.log(this.state);
                });
         }  
    }
  }
 
  difficultySorter = (e) =>{
     if(e.target.value === "easy"){ 
       let easy = [...this.state.easyQues];
       this.setState({questions:easy})
     }else if(e.target.value === "medium"){
      console.log('medium clicked');
       let medium = [...this.state.mediumQues];
       this.setState({questions:medium})
     }else if(e.target.value === "hard"){
       let hard = [...this.state.hardQues];
       this.setState({questions:hard})
     }else{
       let all = [...this.state.allQues];
       this.setState({questions:all})
     }
  }
 

  render() {
    let baseComponent;
    if(this.state.questions.length === 0&&this.state.easyQues.length === 0&&this.state.mediumQues.length === 0&&this.state.hardQues.length === 0){
      baseComponent=(
          <div style={{'text-align':'center'}}>
                   <Spinner  style={{'height':'100px','width':'100px'}} animation="border"/>     
           </div>
      );
    } 
    let cards=(
          this.state.questions.map(question =>(
             <QuesCard question={question}/>
          ))
       );
    return (
        <section className="bg-light page-section" id="portfolio">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">List of Questions</h2>
                <h3 className="section-subheading text-muted"></h3>
                 <div className="form-group row">
                          <select onChange={this.difficultySorter} id="college" style={{'width':'190px'}} className="form-control extra col-xs-4" required autofocus>
                              <option disabled selected>Sort By Difficulty</option>
                              <option value="easy">Easy</option>
                              <option value="medium">Medium</option>
                              <option value="hard">Hard</option>
                              <option value="all">All</option>
                          </select>
                         {/*} <select onChange={this.difficultySorter} id="college" style={{'width':'190px'}} className="form-control extra col-xs-4" required autofocus>
                              <option disabled selected>Sort By Difficulty</option>
                              <option value="easy">Easy</option>
                              <option value="medium">Medium</option>
                              <option value="hard">Hard</option>
                          </select>*/}
                 </div>
                 <br/><br/>
              </div>
            </div>
           {baseComponent}
            <div className="row">
              {cards}
            </div>
          </div>
        </section>
    );
  }
}

// const mapDispatchToProps = dispatch =>{
//   return{
//     fetchQues: (username)=>dispatch(actions.fetchQuestions(username))
//   }
// }

const mapStateToProps = state =>{
    console.log(state)
    return{
      questions:state.ques.questions,
      solvedQuestions:state.ques.solvedQuestions
    }
}

export default connect(mapStateToProps)(withRouter(QuestionList));
