import React, { Component } from 'react';
import axios from '../../axios';
import {Form,Button,Jumbotron,Col,Container,Row,Image,Dropdown,Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import Code from '../code/code';
import Cookies from 'universal-cookie';
import QuesCard from '../../components/quesCard/quesCard';


class QuestionList extends Component {
  constructor() {
    super();
    this.state = {
        questions:[],
        solvedQuestionsId:[],
        easyQues:[],
        mediumQues:[],
        hardQues:[],
        allQues:[]
   }
  }

 
  async componentDidMount(){
  const cookies = new Cookies();
  const username = cookies.get('username'); 
  await axios.post('/getSolved',{username:username})
    .then(response => {
      this.setState({solvedQuestionsId:response.data},()=>{
        console.log(this.state);
      });
    })
    .catch(error => {
         console.log(error);
    });
  await axios.get('/getQuestion')
    .then(response => {
      this.setState({questions:response.data},()=>{
        console.log(this.state);
      });
    })
    .catch(error => {
         console.log(error);
    });
    let allQues = [...this.state.questions];
    let easyQues = [];
    let hardQues = [];
    let mediumQues = [];
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
    for(let i=0;i<this.state.solvedQuestionsId.length;i++){
      for(let j=0;j<allQues.length;j++){
        if(allQues[j]._id === this.state.solvedQuestionsId[i].id){
          allQues[j].solved = true;
          allQues[j].quesColor = 'green';
        }
      }
    }
    this.setState({questions:allQues,easyQues:easyQues,mediumQues:mediumQues,hardQues:hardQues,allQues:allQues},()=>{
      console.log(this.state);
    });
  }



  // componentDidUpdate(){
  //     if(this.state.isLoggedIn !== this.props.loggedIn){
  //        this.setState({isLoggedIn:this.props.loggedIn},()=>{
  //          console.log(this.state);
  //       });
  //     }
  // }
 
  difficultySorter = (e) =>{
     if(e.target.value === "easy"){ 
       let easy = [...this.state.easyQues];
       this.setState({questions:easy})
     }else if(e.target.value === "medium"){
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
    if(this.props.loggedIn){
      baseComponent=(
          this.state.questions.map(question =>(
             <QuesCard question={question}/>
          ))
      );
    }else{
       baseComponent=(
                <div className="col-lg-12 text-center">
                  <h2 className="section-heading text-uppercase">404 planet not found!!!</h2>
                </div>
       );
    }
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
            <div className="row">
              {baseComponent}
            </div>
          </div>
        </section>
    );
  }
}

export default withRouter(QuestionList);
