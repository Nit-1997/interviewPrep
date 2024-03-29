import React,{Component} from 'react';
import { Card,Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {Route,Switch} from 'react-router-dom';
import YouTube from 'react-youtube';
// import './youtube.css';

class Youtuber extends Component{
   state = {
     playerObj:null
   }
  videoStateChange (event) {
    const player = event.target;
    console.log(player.getCurrentTime());
  }

  componentWillUnmount () {
    const {playerObj} = this.state;
  }


  render(){
    const opts = {
      height: '100%',
      width: '100%'
    }   
     return(
           <YouTube
              videoId={this.props.id}
              opts={opts}
              onStateChange={this.videoStateChange}
              className="yt-fluid"
            />
     );
  }   
}
   


export default withRouter(Youtuber);