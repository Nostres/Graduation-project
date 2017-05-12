import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import grailsLogo from '../images/grails-cupsonly-logo-white.svg';

import UserMenu from './UserMenu';

export default class AppNav extends React.Component {
  render() {
    return (
      <Navbar style={{backgroundColor: '#4D8618', backgroundImage: 'none', borderRadius: 0}}>
        <Navbar.Header>
          <Navbar.Brand>
            <i className="fa grails-icon">
              <img src={grailsLogo} alt="Grails"/>
            </i>
            Grails
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
          <Nav pullRight>
            {
              this.props.loggedIn &&
              <UserMenu
                dispatchAction={this.props.dispatchAction}
                files={this.props.files}
              />
            }
          </Nav>
      </Navbar>
    );
  }
}
