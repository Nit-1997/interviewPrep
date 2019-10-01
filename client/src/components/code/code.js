import React, { Component } from 'react';
import './code.css';
import axios from '../../axios';
import {Form,Button,Jumbotron,Col,Container,Row,Image,Dropdown,Spinner} from 'react-bootstrap';
import brace from 'brace';
import AceEditor from 'react-ace';
import {withRouter} from 'react-router-dom';
import SampleTestCases from '../sampleTestcase/sampleTestCase';
import CustomTestCases from '../customTestcase/customTestCase';
import TestCases from '../testcase/testCase';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/theme/monokai';
import fullScreen from '../../assets/fullScreen.png';
import reset from '../../assets/reset.jpeg';
import Fullscreen from "react-full-screen";
import Cookies from 'universal-cookie';


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
        id:10,
        isFull: false,
        editorHeight:'600px',
        customControl:false,
        customInput:'',
        isCustomResult:false,
        isSubmit:false
   }
  }

  onChangeHandler = (e) => {
    this.setState({code:e,isResult:false,isCustomResult:false,isSubmit:false},()=>{
        console.log(this.state.code);
    });
  }

  onChangeHandlerCustom = (e) =>{
    this.setState({[e.target.id]:e.target.value},()=>{
        console.log(this.state);
     })
  }
  
  goFull = () => {
    let val = this.state.isFull;
        if(val){
          val = !val;
          this.setState({ isFull: val,editorHeight:'600px' });
        }else{
          val = !val;
          this.setState({ isFull: val,editorHeight:'1080px' });
        }
  }

  languageHandler = (e)=>{
      this.setState({[e.target.id]:e.target.value,isSubmit:false,isResult:false,isCustomResult:false,customControl:false});
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

  resetHandler = (e)=>{
     this.setState({isResult:false,isCustomResult:false,customControl:false,isSubmit:false});
      let c = '#include<stdio.h>\n\nint main(){\n\n return 0;\n}';
      let java = 'public class Main{\n public static void main(String[] args) {\n  //Write your code here \n  }\n}'
      let cpp  = '#include<iostream>\nusing namespace std;\n\nint main(){\n\n}';
      let python = '## Read input as specified in the question.\n## Print output as specified in the question.';
      let js = "//Read input as specified in the question.\n// Print output as specified in the question. "
      switch(this.state.language){
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
       testCases:this.props.testCases,
       quesId:this.props.id,
       username:this.props.user.username
    }
    this.setState({clicked:true});
    let response = await axios.post('/submitCode',formData);
     this.setState({response:response.data,isSubmit:true,isResult:false,isCustomResult:false,customControl:false,clicked:false},()=>{
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
    for(let i=0;i<data.length;i++){
       if(data[i].stderr !== ""){
          data[i].stdout = data[i].stderr;
       }
    }
     this.setState({response:data,isResult:true,isSubmit:false,isCustomResult:false,customControl:false,clicked:false},()=>{
          console.log(this.state.response);
     });
  }catch(error){
    console.log(error);
  }
}

customRequestHandler =async(e)=>{
 try{
    let formData = {
       code:this.state.code,
       language:this.state.language,
       customCase:this.state.customInput,
       correctCode:this.props.correctCode
    }
    this.setState({clicked:true});
    let response = await axios.post('/compileCodeCustom',formData);
    let data = response.data;
    if(data[0].stderr !== ""){
          data[0].stdout = data[0].stderr;
    }
     this.setState({response:data,isCustomResult:true,isSubmit:false,isResult:false,clicked:false,customControl:false},()=>{
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

onCustomHandler = (e) =>{
     this.setState({customControl:true,isResult:false,isCustomResult:false,isSubmit:false});
}

  render() {
    console.log(this.props);
    let sampleAnsComp;
    if(this.state.isResult){
       // window.scrollTo(0,1000);
       sampleAnsComp = (
           <SampleTestCases
             sampleExample = {this.props.sampleCases}
             response = {this.state.response}
            />
        );
    }else{
      sampleAnsComp = (
          <Row>

          </Row>
      );
    }
  let customInputComp;
  if(this.state.isCustomResult){
       customInputComp = (
            <CustomTestCases
               testCase = {this.state.response[0]}
            />
        );
    }else{
      customInputComp = (
          <Row>

          </Row>
      );
    }
  let customControl;
  if(this.state.customControl){
       customControl = (
           <div>
         <Jumbotron className="commHeader resultComp">
            <p className="commHeader contentCodex">Custom Input</p>
          <Row style={{'justify-content':'inherit'}}>
             <Form>
              <Form.Group controlId="customInput" className="commHeader">
                <Form.Control as="textarea" onChange={this.onChangeHandlerCustom} placeholder="Enter your custom input" />
              </Form.Group> 
            </Form>
          </Row>
            submit the code to test against other test cases<br/><br/>
            <Button  onClick={this.customRequestHandler}>
                      Compile
            </Button>
         </Jumbotron>
        </div>
        );
    }else{
      customControl = (
          <Row>

          </Row>
      );
    }
   let resultComp;
    if(this.state.isSubmit){
       resultComp = (
            <TestCases
               testCases = {this.state.response.testCases}
               score = {this.state.response.score}
            />
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
         <div> 
           
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
                    <h4 className="contentCode">Difficulty :- <strong style={{'text-transform': 'uppercase','color':this.props.color}}>{this.props.difficulty}</strong></h4>
                    <br/>
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
                       {this.props.sampleExample[0].i}                      
                    </p>
                    </Jumbotron>
                    <h4 className="contentCode">Sample Output:-</h4>
                    <Jumbotron id="box1">
                    <p> 
                       {this.props.sampleExample[0].o}
                    </p>
                    </Jumbotron>
                    <h4 className="contentCode">Explanation:-</h4>
                    <Jumbotron id="box1">
                    <p> 
                       {this.props.sampleExample[0].explain}
                    </p>
                    </Jumbotron>
                    <h4 className="contentCode">Sample Input:-</h4>
                    <Jumbotron id="box1">
                    <p> 
                       {this.props.sampleExample[1].i}                      
                    </p>
                    </Jumbotron>
                    <h4 className="contentCode">Sample Output:-</h4>
                    <Jumbotron id="box1">
                    <p> 
                       {this.props.sampleExample[1].o}
                    </p>
                    </Jumbotron>
                    <h4 className="contentCode">Explanation:-</h4>
                    <Jumbotron id="box1">
                    <p> 
                       {this.props.sampleExample[1].explain}
                    </p>
                    </Jumbotron>

                </div>
                </Jumbotron>
              </Col>
              <Col xs={12} md={6} className="rightSide">
              {sampleAnsComp}
              {customInputComp}
              {customControl}
              {resultComp}
                {spin}
                <br/>
       <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({isFull})}
        >  
                <Row> 
                  <Col xs={6} md={6} style={{'background':'#4a545e'}}>
                      <Form.Group controlId="language" className="langMid">
                        <Form.Control as="select" onChange={this.languageHandler} className="commHeader langsel">
                          <option value="">Choose language</option>
                          <option value="c">C</option>
                          <option value="c++">C++</option>
                          {/*<option value="java">Java</option>*/}
                          <option value="python">Python</option>
                          <option value="javascript">Javascript(Node.js)</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col xs={6} md={6} style={{'background':'#4a545e'}} className="rightDock">
                      <Image src={reset} title="Reset Code" onClick = {this.resetHandler} className="fullScreen" fluid/>
                      <Image src={fullScreen} title="Full Screen Mode" onClick={this.goFull} className="fullScreen" fluid/>
                    </Col>
                 </Row>
              <div>
                <AceEditor
                  placeholder="write code here"
                  style={{ width: 'inherit',height:this.state.editorHeight}}
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
             </Fullscreen>
              <div className="langMid">
                <Button  onClick={this.onCompileHandler}>
                      Compile
                </Button>
                <Button  onClick={this.onCustomHandler}>
                      Custom Input 
                </Button>
                <Button  onClick={this.onSubmitHandler}>
                      Submit
                </Button>
              </div>
              </Col>
          </Row>
          <br/>
       </div>
    );
  }
}


export default (Code);