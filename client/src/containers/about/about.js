import React, { Component } from 'react';
import './about.css';
import {Form,Button,Jumbotron,Col,Container,Row,Image} from 'react-bootstrap';
import ceo from '../../assets/ceo.jpg';

class App extends Component {
 state = {
  };
  render() {
    return (
       <div className="about">
           <Container>
                 <Image className="ceo" src={ceo} roundedCircle thumbnail fluid/>
                  <Container>
                    <h3 className="commHeader ceoName">Nitin Bhat</h3>
                    <p className="commHeader designation">CEO,Founder,Product engineer</p>
                  </Container>
                  <Container>
                     <p className="commHeader ceoDesc">
                      Nitin is a talented software engineer currently working at Cisco Systems.He has taken an initiative of helping students crack their dream jobs by mentoring them throughout their preparations with the help of his free online courses which are available on prepZone where each course is prepared by taking campus placements into consideration ,hand-picked video tutorials are choosen.Professionals who have cracked FANG companies are consulted to give students a comprehensive idea about placement.Our Team hopes this portal helps you get your dream job.
                     </p>
                  </Container> 
           </Container>
       </div>
    );
  }
}

export default App;
