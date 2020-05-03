import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import history from '../utils/history';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Items List</Navbar.Brand>
        
        {isAuthenticated && (
          <Nav className="mr-auto">
            <Nav.Link onClick={() => history.push('/items')}>Items</Nav.Link>
            <Nav.Link onClick={() => history.push('/categories')}>Categories</Nav.Link>
          </Nav>
        )}
        
        <Form inline>
          {!isAuthenticated && (
            <Button onClick={() => loginWithRedirect({})} variant="outline-info">Log in</Button>
          )}

          {isAuthenticated && 
            <Button onClick={() => logout()} variant="outline-info">Log out</Button>
          }
        </Form>
      </Navbar>

      
      
    </>
  );
};

export default NavBar;