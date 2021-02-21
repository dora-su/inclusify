import HeaderLink from './HeaderLink';
import { Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import "./header.css"

const Header = () => {
    return (
        <div class="hh">
       <Navbar variant="light" className="custom-nav" sticky="top" expand="lg">
           <LinkContainer to="/">
           <Navbar.Brand><img className="logo-img" src={"/logo-icon.png"}/></Navbar.Brand>
           </LinkContainer>
           <Navbar.Toggle aria-controls="basic-navbar-nav"/>
           <Navbar.Collapse id="basic-navbar-nav"s>
           <Nav className="ml-auto">
                
               <LinkContainer to="/app">
                   <Nav.Link><span className="try">Go to app
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
</svg>
                       </span></Nav.Link>
               </LinkContainer>
               <Nav.Link href="https://github.com/udyding/inclusify"><span className="code">Code</span></Nav.Link>
           </Nav>
           </Navbar.Collapse>
       </Navbar>
       </div>
    );
  };
  
  export default Header;