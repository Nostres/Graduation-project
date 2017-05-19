import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import grailsLogo from '../../images/grails-cupsonly-logo-white.svg';
import { logoutAC } from '../../redux/reducers/user';

import './appNav.css';

export default class AppNav extends React.Component {

  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.backToList = this.backToList.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.dispatchAction(logoutAC());
  }

  backToList(e) {
    e.preventDefault();
    this.props.router.push('/files');
  }

  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <i className="fa grails-icon">
              <img src={grailsLogo} alt="Grails"/>
            </i>
            Grails
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
        {
          this.props.loggedIn &&
          <Nav pullRight>
            {
              this.props.router.params.id !== undefined &&
              <NavItem eventKey={1} onClick={this.backToList}>
                Return to files list
              </NavItem>
            }
            <NavItem eventKey={2} onClick={this.logoutUser}>Log out</NavItem>
          </Nav>
        }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
