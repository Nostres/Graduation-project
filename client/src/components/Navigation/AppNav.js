import React from 'react';
import { Navbar } from 'react-bootstrap';
import grailsLogo from '../../images/grails-cupsonly-logo-white.svg';
import UserMenu from './UserMenu';
import { uploadFile } from '../../redux/reducers/files';
import './appNav.css';

export default class AppNav extends React.Component {

  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.doUploadFile = this.doUploadFile.bind(this);
  }

  selectFile() {
    this.inputElement.click()
  }

  doUploadFile() {
    const file = this.inputElement.files[0];
    this.props.dispatchAction(uploadFile(file));
    this.inputElement.value = "";
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
        {
          this.props.loggedIn &&
          <UserMenu
            dispatchAction={this.props.dispatchAction}
            files={this.props.files}
            router={this.props.router}
            onUploadFile={this.selectFile}
          />
        }
        <input
          onChange={this.doUploadFile}
          style={{display: 'none'}}
          type="file"
          ref={input => this.inputElement = input}
        />
      </Navbar>
    );
  }
}
