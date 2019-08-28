import React,{Component} from "react";
import {Form,Button,Jumbotron,Toast} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import starFull from '../../assets/star-full.png';

class Stars extends Component {
 constructor() {
    super();
    this.state = {
        number:null
   }
  }
 componentDidMount(){
    var num = this.props.number;
    var number = parseInt(num, 10);
    this.setState({number:number});
 }

  render() {
    return (
      <div>
         { Array(this.state.number).fill(<img src={starFull} className="icon babyz" />) }
      </div>
  );
  }
}

export default withRouter(Stars);