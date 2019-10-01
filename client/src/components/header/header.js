import React,{Component} from 'react';
import logo from '../../assets/logo.png';
import {NavLink} from 'react-router-dom';
import './header.css';
import { Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import axios from '../../axios';
import Cookies from 'universal-cookie';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Header extends Component {
       constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount(){
       
    }

    componentDidUpdate(){
        
    }
    
    logout = (event)=>{
      event.preventDefault();
      if(this.props.loggedIn){
          this.props.onLogout();
      }
    }

    
    render() {
      let rightDrawer;
      if(this.props.loggedIn){
            rightDrawer= ( 
                  <Nav> 
                      <Nav.Link eventKey="1">
                             <Image className="proPic" 
                                    src={this.props.user.image} 
                                    roundedCircle 
                                    fluid
                              />
                      </Nav.Link>
                      <Nav.Link eventKey="1">
                            <button className="btn" style={{'color':'white'}} onClick={this.logout}>Logout</button>
                       </Nav.Link>
                </Nav>
              );            
      }else{
          rightDrawer= (
              <Nav> 
                <Nav.Link eventKey="1">
                 <NavLink 
                     to='/login'
                  >
                         Login
                  </NavLink>
                 </Nav.Link>
                <Nav.Link eventKey="1">
                  <NavLink 
                     to='/signup'
                  >
                         Signup
                  </NavLink>
               </Nav.Link>
              </Nav> 
         );
      }

      let leftDrawer;
      if(this.props.loggedIn){
         if(this.props.user.username === "ntnbhat9@gmail.com"){
             leftDrawer = ( 
                   <Nav className="mr-auto"> 
                      <Nav.Link  eventKey="1">
                       <NavLink 
                           to='/team'
                        >
                               Team
                        </NavLink>
                       </Nav.Link>
                      <Nav.Link eventKey="1">
                        <NavLink 
                           to='/courses'
                        >
                              Courses 
                        </NavLink>
                     </Nav.Link>
                     <Nav.Link eventKey="1">
                        <NavLink 
                           to='/createCourse'
                        >
                              Add Course
                        </NavLink>
                     </Nav.Link>
                   <Nav.Link eventKey="1">
                        <NavLink 
                           to='/addQuestion'
                        >
                              Add Question
                        </NavLink>
                     </Nav.Link>
                     <Nav.Link eventKey="1">
                  <NavLink 
                     to='/questions'
                  >
                         Code
                  </NavLink>
               </Nav.Link>
                    </Nav>  
              );
         }else{
             leftDrawer = ( 
                   <Nav className="mr-auto"> 
                      <Nav.Link eventKey="1">
                       <NavLink 
                           to='/team'
                        >
                               Team
                        </NavLink>
                       </Nav.Link>
                      <Nav.Link eventKey="1">
                        <NavLink 
                           to='/courses'
                        >
                              Courses 
                        </NavLink>
                     </Nav.Link>
               <Nav.Link eventKey="1">
                  <NavLink 
                     to='/questions'
                  >
                         Code
                  </NavLink>
               </Nav.Link>
                    </Nav>  
              );
         }            
      }else{
          leftDrawer = (
                  <Nav className="mr-auto"> 
                        <Nav.Link eventKey="1">
                         <NavLink 
                             to='/team'
                          >
                                 Team
                          </NavLink>
                         </Nav.Link>
                        <Nav.Link eventKey="1">
                                Courses 
                       </Nav.Link>
                <Nav.Link eventKey="1">
                         Code
               </Nav.Link>
                    </Nav> 
         );
      }

      let flasher;
      let text = 'login to view courses and solve coding problems';  
      if(!this.props.loggedIn){
         flasher = (
           <Alert variant="danger" className="commHeader">
            <p>{text}</p>
           </Alert>
         );
      }
      
  return(
     <div>
      <Navbar  collapseOnSelect expand="lg" className="commHeader textVal" fixed="top" bg="dark" variant="dark">
       <NavLink 
                 to='/'
        >
        <Navbar.Brand>
          <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top "
          />
            {'PrepZone'}
          </Navbar.Brand>
        </NavLink> 
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
             {leftDrawer}
             {rightDrawer}
             
          </Navbar.Collapse>
       </Navbar>
       <br/>
       {flasher}
      </div> 
  ) 
}
};

const mapDispatchToProps = dispatch =>{
  console.log('dispatch');
  console.log(dispatch);
  return{
    onLogout: ()=>dispatch(actions.logout())
  }
}

export default connect(null,mapDispatchToProps)(Header);

