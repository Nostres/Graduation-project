import React from 'react';
import { Navbar } from 'react-bootstrap';
import grailsLogo from '../images/grails-cupsonly-logo-white.svg';
import UserMenu from './UserMenu';

import './appNav.css';

export default class AppNav extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <i className="fa grails-icon">
              <img src={grailsLogo} alt="Grails"/>
            </i>
            Grails
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        {
          this.props.loggedIn &&
          <UserMenu
            dispatchAction={this.props.dispatchAction}
            files={this.props.files}
          />
        }
      </Navbar>
    );
  }
}
