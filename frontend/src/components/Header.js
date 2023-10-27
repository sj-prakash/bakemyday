import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Header = ({ showImage }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;


  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar expand="lg" bg="black" variant="dark" collapseOnSelect sticky="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Bakemyday</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-links">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown className="logout" title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer className="logout" to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showImage && <img style={{ margin: '0' , width:'100%'}} src="/images/bakery_bread_maker.png" />}
    </header>
  );
};

export default Header;
