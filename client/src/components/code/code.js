import React, { Component } from 'react';
import './code.css';
import axios from '../../axios';
import {Form,Button,Jumbotron,Col,Container,Row,Image,Dropdown,Spinner} from 'react-bootstrap';
import brace from 'brace';
import AceEditor from 'react-ace';
import {withRouter} from 'react-router-dom';

 
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/theme/monokai';


class Code extends Component {
  constructor() {
    super();
    this.state = {
        code:'#include<iostream>\nusing namespace std;\n\nint main(){\n\n}',
        token:'',
        language:'c++',
        isResult:false,
        response:null,
        clicked:false,
        codeHigh:'java',
        id:10
   }
  }

  onChangeHandler = (e) => {
    this.setState({code:e,isResult:false},()=>{
        console.log(this.state.code);
    });
  }

  languageHandler = (e)=>{
      this.setState({[e.target.id]:e.target.value,isResult:false});
      let c = '#include<stdio.h>\n\nint main(){\n\n return 0;\n}';
      let java = 'public class Main{\n public static void main(String[] args) {\n  //Write your code here \n  }\n}'
      let cpp  = '#include<iostream>\nusing namespace std;\n\nint main(){\n\n}';
      let python = '## Read input as specified in the question.\n## Print output as specified in the question.';
      let js = "//Read input as specified in the question.\n// Print output as specified in the question. "
      switch(e.target.value){
         case 'c' : this.setState({code:c,id:4,codeHigh:'java'},()=>{
                       console.log(this.state.code);
                    });
                    break;
         case 'java' : this.setState({code:java,id:26,codeHigh:'java'},()=>{
                           console.log(this.state.code);
                        });
                        break;
         case 'python' : this.setState({code:python,id:34,codeHigh:'python'},()=>{
                           console.log(this.state.code);
                        });
                        break;
         case 'c++' :  this.setState({code:cpp,id:10,codeHigh:'java'},()=>{
                           console.log(this.state.code);
                        });
                        break;
         case 'javascript' :  this.setState({code:js,id:29,codeHigh:'javascript'},()=>{
                           console.log(this.state.code);
                        });
                        break;
          default :  this.setState({code:cpp,id:10,codeHigh:'java'},()=>{
                           console.log(this.state.code);
                        });
                        break;
      }
  }

  onSubmitHandler = async (e) =>{
    try{
    let formData = {
       code:this.state.code,
       language:this.state.language,
       testCases:this.props.testCases
    }
    this.setState({clicked:true});
    let response = await axios.post('/submitCode',formData);
    let data = response.data;
     this.setState({response:data,isResult:true,clicked:false},()=>{
          console.log(this.state.response);
     });
  }catch(error){
    console.log(error);
  }
}

 onCompileHandler = async (e) =>{
    try{
    let formData = {
       code:this.state.code,
       language:this.state.language,
       sampleCases:this.props.sampleCases
    }
    this.setState({clicked:true});
    let response = await axios.post('/compileCode',formData);
    let data = response.data;
     this.setState({response:data,isResult:true,clicked:false},()=>{
          console.log(this.state.response);
     });
  }catch(error){
    console.log(error);
  }
}

componentDidMount(){

}

componentDidUpdate(){
  
}

  render() {
    console.log(this.props);
    let sampleAnsComp;
    if(this.state.isResult){
       // window.scrollTo(0,1000);
       sampleAnsComp = (
        <Jumbotron className="commHeader resultComp">
            <p className="commHeader contentCodex">Sample Test Cases</p>
            <Row>
            
            <Col xs={12} md={6} className="sampleResultsBox">
               <h3>Accepted</h3>
                <div className="sampleResults1 commHeader">
                    <p className="sampleCaseBox">
                       Input:-<br/>
                       {this.props.sampleExample.i}<br/>
                       Your output:-<br/>
                       6<br/>
                       Expected Output:-<br/>
                       6<br/>
                    </p>
                </div>
            </Col>
            <Col xs={12} md={6} className="sampleResultsBox">
               <h3>Accepted</h3>  
                <div className="sampleResults1 commHeader">
                    <p className="sampleCaseBox">
                       Input:-<br/>
                       {this.props.sampleExample.i}<br/>
                       Your output:-<br/>
                       6<br/>
                       Expected Output:-<br/>
                       6<br/>
                    </p>
                </div>
            </Col>
          </Row>
            submit the code to test against other test cases<br/><br/>
            <Button  onClick={this.onSubmitHandler}>
                      submit
                </Button>
         </Jumbotron>
        );
    }else{
      sampleAnsComp = (
          <Row>

          </Row>
      );
    }
   let resultComp;
    if(this.state.isResult){
       // window.scrollTo(0,1000);
       resultComp = (
           <Jumbotron className="commHeader resultComp">
            <p className="commHeader contentCodexScore">100 pts</p>
            <Row>
            <Col xs={12} md={6} className="finalResultsBox">
                <div className="finalResults">
                   
                </div>
            </Col>
            <Col xs={12} md={6} className="finalResultsBox">
                <div className="finalResults">
                   
                </div>
            </Col>
            <Col xs={12} md={6} className="finalResultsBox">
                <div className="finalResults">
                   
                </div>
            </Col>
            <Col xs={12} md={6} className="finalResultsBox">
                <div className="finalResults">
                   
                </div>
            </Col>
            <Col xs={12} md={6} className="finalResultsBox">
                <div className="finalResults">
                   
                </div>
            </Col>
            <Col xs={12} md={6} className="finalResultsBox">
                <div className="sampleResults1">
                   
                </div>
            </Col>
          </Row>
          </Jumbotron>
        );
    }else{
      resultComp = (
          <Row>

          </Row>
      );
    }
    let spin;
    if(this.state.clicked){
      spin = (
         <div className="langMid"> 
           <Spinner animation="border" />
         </div>
      );
    }else{
       spin = (
         <div className="langMid"> 
           
         </div>
      );
    }
    let input = (
      <div>

      </div>
    );
    return (
       <div className="coder">
          <Row>
              <Col xs={12} md={6}>
                <Jumbotron id="excite">
                 <div className="commHeader langMiders">
                   <h2 className="probStat">{this.props.title}</h2>
                    <p>
                      {this.props.description}
                    </p>
                    <h4 className="contentCode">Input Format:-</h4>
                    <p>
                      {this.props.inputFormat}
                    </p>
                    <h4 className="contentCode">Output Format:-</h4>
                    <p>
                      {this.props.outputFormat}
                    </p>
                    <h4 className="contentCode">Constraints</h4>
                    <p>
                      {this.props.constraints}
                    </p>
                    <h4 className="contentCode">Sample Input:-</h4>
                    <Jumbotron id="box1">
                    <p> 
                       {this.props.sampleExample.i}                      
                    </p>
                    </Jumbotron>
                    <h4 className="contentCode">Sample Output:-</h4>
                    <Jumbotron id="box2">
                    <p> 
                       {this.props.sampleExample.o}
                    </p>
                    </Jumbotron>
                    <h4 className="contentCode">Explanation:-</h4>
                    <Jumbotron id="box3">
                    <p> 
                       {this.props.sampleExample.explain}
                    </p>
                    </Jumbotron>
                </div>
                </Jumbotron>
              </Col>
              <Col xs={12} md={6} className="rightSide">
                  <Form.Group controlId="language" className="langMid">
                    <Form.Control as="select" onChange={this.languageHandler} className="commHeader langsel">
                      <option value="">Choose language</option>
                      <option value="c">C</option>
                      <option value="c++">C++</option>
                      <option value="java">Java</option>
                      <option value="python">Python</option>
                      <option value="javascript">Javascript(Node.js)</option>
                    </Form.Control>
                  </Form.Group>
                 <br/>
                  {sampleAnsComp}
              <div>
                {spin}
                <AceEditor
                  placeholder="write code here"
                  style={{ width: 'inherit',height:'600px'}}
                  mode={this.state.codeHigh}
                  theme="monokai"
                  name="ace"
                  textareaId="code"
                  onChange={this.onChangeHandler}
                  fontSize={25}
                  showPrintMargin={true}
                  showGutter={true}
                  highlightActiveLine={true}
                  value={this.state.code}
                  setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 3,
                  }}/>
              </div>
              <div className="langMid">
                <Button  onClick={this.onCompileHandler}>
                      compile
                </Button>
                
                <Button  onClick={this.onSubmitHandler}>
                      submit
                </Button>
              </div>
              </Col>
          </Row>
       </div>
    );
  }
}

export default withRouter(Code);
