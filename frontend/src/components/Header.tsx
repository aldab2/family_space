import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaUserCircle } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { clearCredentials } from '../slices/authSlice';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import logoImage from '../logo.png';
import { RootState } from '../store'; // Assuming you have a type for your Redux state

const Header: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.authReducer.userInfo);
  const [logoutApiCall, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(clearCredentials());
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                src={logoImage}
                style={{ maxWidth: '70px', maxHeight: '70px' }}
                className="d-inline-block img-fluid"
                alt="Logo"
              />{' '}
              Family Space
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <NavDropdown title={<><FaUserCircle /> {userInfo.userName} </>} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>
                        <FaUser /> Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      <FaSignOutAlt /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register-family'>
                    <Nav.Link>
                      <FaSignOutAlt /> Create Family
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
