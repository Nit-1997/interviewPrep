import React,{Component} from 'react';
import logo from '../../assets/logo.png';
import {NavLink} from 'react-router-dom';
import './header.css';
import { Alert,Button,Navbar,Nav,NavDropdown,Col,Container,Row,Image} from 'react-bootstrap';
import axios from '../../axios';

class Header extends Component {
       constructor() {
        super();
        this.state = {
           user:null,
           image:'' 
        }
        this.logout = this.logout.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentDidMount(){
       if(this.props.loggedIn){
        let formData = {
            username:this.props.email
        }
        axios.post('/getUserInfo',formData)
        .then(response => {
          this.setState({user:response.data},()=>{
             console.log(this.state);
          });       
       });
      }
    }

    componentDidUpdate(){
      if(this.props.loggedIn && this.state.user === null){
        let formData = {
            username:this.props.email
        }
        axios.post('/getUserInfo',formData)
        .then(response => {
          let image = '';
          this.setState({user:response.data},()=>{
             image = this.state.user[0].image;
          });
          this.setState({image:image},()=>{
              console.log(this.state.image)
          });       
       });
      }
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
                      <Nav.Link eventKey="1">
                             <Image className="proPic" 
                                    src={this.state.image} 
                                    roundedCircle 
                                    fluid
                              />
                      </Nav.Link>
                      <Nav.Link eventKey="1">
                            <Button onClick={this.logout}>Logout</Button>
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
         if(this.props.email === "ntnbhat9@gmail.com"){
             leftDrawer = ( 
                   <Nav className="mr-auto"> 
                      <Nav.Link  eventKey="1">
                       <NavLink 
                           to='/about'
                        >
                               About
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
                              Add 
                        </NavLink>
                     </Nav.Link>
                     <Nav.Link eventKey="1">
                  <NavLink 
                     to='/code'
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
                           to='/about'
                        >
                               About
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
                     to='/code'
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
                             to='/about'
                          >
                                 About
                          </NavLink>
                         </Nav.Link>
                        <Nav.Link eventKey="1">
                                Courses 
                       </Nav.Link>
                <Nav.Link eventKey="1">
                  <NavLink 
                     to='/code'
                  >
                         Code
                  </NavLink>
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
      <Navbar collapseOnSelect expand="lg" className="commHeader" fixed="top" bg="primary" variant="dark">
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