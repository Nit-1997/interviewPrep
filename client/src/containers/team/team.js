import React, { Component } from 'react';
import './about.css';
import {Form,Button,Jumbotron,Col,Container,Row,Image} from 'react-bootstrap';
import ceo from '../../assets/ceo.jpg';

class App extends Component {
 state = {
  };
  render() {
    return (
       <section className="bg-light page-section" id="team">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
                  <h3 className="section-subheading text-muted">We here at prepZone value quality of team than size :P</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <div className="team-member">
                  {/*
                    <img className="mx-auto rounded-circle" src="img/team/1.jpg" alt=""/>
                    <h4>Kay Garland</h4>
                    <p className="text-muted">Lead Designer</p>
                    <ul className="list-inline social-buttons">
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>*/}
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="team-member">
                    <img className="mx-auto rounded-circle" src={ceo} alt=""/>
                    <h4>Nitin Bhat</h4>
                    <p className="text-muted">CEO,Founder,Product engineer</p>
                    <ul className="list-inline social-buttons">
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="team-member">
                   {/* <img className="mx-auto rounded-circle" src="img/team/3.jpg" alt=""/>
                    <h4>Diana Pertersen</h4>
                    <p className="text-muted">Lead Developer</p>
                    <ul className="list-inline social-buttons">
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>*/}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8 mx-auto text-center">
                  <p className="large text-muted">Nitin is a talented software engineer currently working at Cisco Systems.He has taken an initiative of helping students crack their dream jobs by mentoring them throughout their preparations with the help of his free online courses which are available on prepZone where each course is prepared by taking campus placements into consideration ,hand-picked video tutorials are choosen.Professionals who have cracked FANG companies are consulted to give students a comprehensive idea about placement.Our Team hopes this portal helps you get your dream job.</p>
                </div>
              </div>
            </div>
      </section>
    );
  }
}

export default App;
