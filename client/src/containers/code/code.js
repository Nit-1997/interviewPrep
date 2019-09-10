import React, { Component } from 'react';
import './code.css';
import axios from '../../axios';
import {Form,Button,Jumbotron,Col,Container,Row,Image,Dropdown,Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import Code from '../../components/code/code';

class Base extends Component {
  constructor() {
    super();
    this.state = {
        testCases:[{i:'3\n1 2 3',o:'6'},{i:'4\n1 2 3 4',o:'10'},{i:'1\n5',o:'5'},{i:'',o:''},{i:'2\n1 2',o:'3'},{i:'2\n90 100',o:'190'}],
        sampleCases:[{i:'3\n1 2 3',o:'6'},{i:'4\n1 2 3 4',o:'10'}],
        title:'Find Sum',
        description:'input n numbers and evaluate their sum and print it.Complete the simpleArraySum function in the editor below.It must return the sum of the array elements as an integer.simpleArraySum has the following parameter(s):',
        inputFormat:'The first line contains an integer n denoting the size of the array.\nThe second line contains  n space-separated integers representing the array elements.',
        constraints:'n>0 , arr[i]<=1000',
        outputFormat:'Print the sum of the array elements as a single integer.',
        sampleExample:{i:'3\n1 2 3',o:'6',explain:'sum of 1+2+3 = 6 hence 6 is the answer.'},
        correctCode:{cpp:'#include<iostream>\nusing namespace std;\n\nint main(){\n  int n;\n  cin>>n;\n  int sum =0;\n  for(int i=0;i<n;i++){\n     int x;\n     cin>>x;\n     sum+=x;\n  }\n  cout<<sum;\n  return 0;\n}',
                     java:'import java.util.Scanner;\n\npublic class Main{\n public static void main(String[] args) {\n    Scanner input = new Scanner(System.in);\n    int n = input.nextInt();\n    int sum = 0;\n    for(int i=0;i<n;i++){\n        int x = input.nextInt();\n        sum+=x;\n    }\n    System.out.print(sum);\n  }\n}',
                     node:'process.stdin.resume();\nprocess.stdin.setEncoding(\'ascii\');\n\nvar input_stdin = "";\nvar input_stdin_array = "";\nvar input_currentline = 0;\n\nprocess.stdin.on(\'data\', function (data) {\n    input_stdin += data;\n});\n\nprocess.stdin.on(\'end\', function () {\n    input_stdin_array = input_stdin.split("\\n");\n    main();    \n});\n\nfunction readLine() {\n    return input_stdin_array[input_currentline++];\n}\n\n/////////////// ignore above this line ////////////////////\n\nfunction main() {\n    var number_of_elements = parseInt(readLine());\n    array = readLine().split(\' \');\n    array = array.map(Number);\n    var sum_of_array = 0;\n    for(var i = 0 ; i < number_of_elements ; i++){\n        sum_of_array += array[i];\n    }\n    console.log(sum_of_array);\n}\n',
                     c:'#include<stdio.h>\n\nint main(){\n int n,i,sum=0;\n scanf("%d",&n);\n for(i=0;i<n;i++){\n   scanf("%d",&arr[i]);\n   sum += arr[i];\n }\n printf("%d",sum);\n return 0;\n}',
                    }
   }
  }

  render() {
    return (
       <div>
          <Code
            {...this.props}
            testCases = {this.state.testCases}
            sampleCases = {this.state.sampleCases}
            title = {this.state.title}
            description = {this.state.description}
            sampleExample= {this.state.sampleExample}
            inputFormat = {this.state.inputFormat}
            outputFormat={this.state.outputFormat}
            constraints={this.state.constraints}
            correctCode={this.state.correctCode}
         />
       </div>
    );
  }
}

export default withRouter(Base);
