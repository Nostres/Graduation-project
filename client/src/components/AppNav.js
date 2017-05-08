import React from 'react';
import { Navbar, Nav, MenuItem, NavDropdown } from 'react-bootstrap';
import { uploadFile, clearAllData, getData } from '../redux/reducers/charts';
import grailsLogo from '../images/grails-cupsonly-logo-white.svg';

export default class AppNav extends React.Component {

  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.doUploadFile = this.doUploadFile.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.reloadData = this.reloadData.bind(this);
  }

  selectFile() {
    this.inputElement.click()
  }

  deleteData() {
    this.props.dispatchAction(clearAllData())
  }

  doUploadFile(event) {
    const file = event.target.files[0];
    this.props.dispatchAction(uploadFile(file));
  }

  reloadData() {
    this.props.dispatchAction(getData());
  }

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
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown eventKey={1} title="Menu" id="menu-dropdown">
              <MenuItem eventKey={1.1} onClick={this.selectFile}>
                Upload file
              </MenuItem>
              <MenuItem onClick={this.reloadData}>Reload chart data</MenuItem>
              <MenuItem onClick={this.deleteData}>Delete chart data</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
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


