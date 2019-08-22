import React,{Component} from 'react';
import logo from '../../assets/logo.png';
import {NavLink} from 'react-router-dom';
import './header.css';
import { Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import axios from '../../axios';

class Header extends Component {
       constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/logout').then(response => {
          console.log(response.data)
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
          }
        }).catch(error => {
            console.log('Logout error')
        })
      }

    render() {
      let rightDrawer;
      if(this.props.loggedIn){
            rightDrawer= ( 
                  <Nav> 
                      <Nav.Link >
                            <Button onClick={this.logout}>Logout</Button>
                       </Nav.Link>
                </Nav>
              );            
      }else{
          rightDrawer= (
              <Nav> 
                <Nav.Link >
                 <NavLink 
                     to='/login'
                  >
                         Login
                  </NavLink>
                 </Nav.Link>
                <Nav.Link>
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
         if(this.props.email === "ntnbhat9@gmail.com"){
             leftDrawer = ( 
                   <Nav className="mr-auto"> 
                      <Nav.Link >
                       <NavLink 
                           to='/about'
                        >
                               About
                        </NavLink>
                       </Nav.Link>
                      <Nav.Link>
                        <NavLink 
                           to='/courses'
                        >
                              Courses 
                        </NavLink>
                     </Nav.Link>
                     <Nav.Link>
                        <NavLink 
                           to='/createCourse'
                        >
                              Add 
                        </NavLink>
                     </Nav.Link>
                    </Nav>  
              );
         }else{
             leftDrawer = ( 
                   <Nav className="mr-auto"> 
                      <Nav.Link >
                       <NavLink 
                           to='/about'
                        >
                               About
                        </NavLink>
                       </Nav.Link>
                      <Nav.Link>
                        <NavLink 
                           to='/courses'
                        >
                              Courses 
                        </NavLink>
                     </Nav.Link>
                    </Nav>  
              );
         }            
      }else{
          leftDrawer = (
                  <Nav className="mr-auto"> 
                        <Nav.Link >
                         <NavLink 
                             to='/about'
                          >
                                 About
                          </NavLink>
                         </Nav.Link>
                        <Nav.Link>
                                Courses 
                       </Nav.Link>
                    </Nav> 
         );
      }

      let flasher;
      let text = 'login to view courses';  
      if(!this.props.loggedIn){
         flasher = (
           <Alert variant="danger" className="commHeader">
            <p>{text}</p>
           </Alert>
         );
      }
      
  return(
     <div>
      <Navbar className="commHeader" fixed="top" collapseOnSelect expand="lg" bg="primary" variant="dark">
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


export default Header;