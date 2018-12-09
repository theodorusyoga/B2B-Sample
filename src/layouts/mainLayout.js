import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import {
  Navbar, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown,
  DropdownToggle, DropdownItem, DropdownMenu, Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { checkLogin } from '../actions/store';

class MainLayout extends React.Component {
  componentWillMount() {
    const { checkLogin } = this.props;
    this.setState({
      isOpen: false
    });
    checkLogin();
  }

  onToggleClick = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    const {
      children, isAuthenticated, username, goTo
    } = this.props;
    const { isOpen } = this.state;
    return (
      <div>
        <header className="custom-header">
          <Navbar color="light" light expand="md">
            <Link className="navbar-brand" href="/" to="/">
              <img src="/img/stoqo.png" alt="Stoqo" width="35" />
            </Link>
            <div className="shopping-cart text-right">
              <NavLink href="/">
                <FontAwesomeIcon icon={faShoppingCart} />
                          &nbsp;&nbsp;(0)
              </NavLink>
            </div>
            <button type="button" className="navbar-toggler" onClick={this.onToggleClick}>
              <FontAwesomeIcon icon={faBars} />
            </button>
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem className="close-nav-item">
                  <div
                    role="presentation"
                    onClick={this.onToggleClick}
                    className="close-btn text-right"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                </NavItem>
                {
                  isAuthenticated
                    ? (
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                          Hi,&nbsp;
                          {username}
                          !
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem>
                            <Link to="/logout" href="/logout">Log Out</Link>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    ) : (
                      <React.Fragment>
                        <NavItem>
                          <Button className="nav-btn" onClick={() => goTo('/login')}>Login</Button>
                        </NavItem>
                        <NavItem>
                          <Button className="nav-btn dark" onClick={() => goTo('/sign-up')}>Sign Up</Button>
                        </NavItem>
                      </React.Fragment>
                    )
                }

              </Nav>
            </Collapse>
          </Navbar>
          <Navbar expand="md" className="sub-nav-light text-right">
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Best Sellers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Explore</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Trending</NavLink>
              </NavItem>
              <NavItem className="divider">
                <NavLink href="/">Store</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Your Account</NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </header>
        <main className="main-container">
          {children}
        </main>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element
  ]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  checkLogin: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired
};

const mapStateToProps = ({ login }) => ({
  isAuthenticated: login.isAuthenticated,
  username: login.username
});

const mapDispatchToProps = dispatch => bindActionCreators({
  checkLogin,
  goTo: link => (dispatch) => { dispatch(push(link)); }
}, dispatch);

export default connect(
  mapStateToProps, mapDispatchToProps
)(MainLayout);
