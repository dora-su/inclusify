import HeaderLink from './HeaderLink';
import { Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import "./header.css"
import logo from './logo.png';
const Header = () => {
    return (
       <Navbar variant="light" className="custom-nav" sticky="top" expand="lg">
           <LinkContainer to="/">
           <Navbar.Brand><img className="logo-img" src={logo}/></Navbar.Brand>
           </LinkContainer>
           <Navbar.Toggle aria-controls="basic-navbar-nav"/>
           <Navbar.Collapse id="basic-navbar-nav"s>
           <Nav className="ml-auto">

               <LinkContainer to="/app">
                   <Nav.Link>App</Nav.Link>
               </LinkContainer>
           </Nav>
           </Navbar.Collapse>
       </Navbar>
    );
  };
  
  export default Header;