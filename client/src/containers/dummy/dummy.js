import React,{Component} from "react";
import {withRouter} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';




class Dummy extends Component{
  constructor() {
    super();
    this.state = {
      classes :null
   }
  }
  
   componentDidMount(){

   }

 
  componentDidUpdate(){

  }
  render(){
    return (
    <React.Fragment>
        
    </React.Fragment>
  );
  }
}

export default withRouter(Dummy);

