import React from 'react';
import { MenuItem, NavDropdown, NavItem } from 'react-bootstrap';
import { uploadFile, getFiles } from '../redux/reducers/files';
import { logout } from '../redux/reducers/user';

export default class UserMenu extends React.Component {

  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.doUploadFile = this.doUploadFile.bind(this);
    this.reloadData = this.reloadData.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  selectFile() {
    this.inputElement.click()
  }

  doUploadFile(event) {
    const file = event.target.files[0];
    this.props.dispatchAction(uploadFile(file));
  }

  reloadData() {
    this.props.dispatchAction(getFiles());
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.dispatchAction(logout());
  }

  render() {
    return(
      <div>
        <NavDropdown eventKey={1} title="Menu" id="menu-dropdown">
          <MenuItem eventKey={1.1} onClick={this.selectFile}>
            Upload file
          </MenuItem>
          <MenuItem onClick={this.reloadData}>Refresh file list</MenuItem>
        </NavDropdown>
        <NavItem eventKey={2} onClick={this.logoutUser}>Log out</NavItem>
        <input
          onChange={this.doUploadFile}
          style={{display: 'none'}}
          type="file"
          ref={input => this.inputElement = input}
        />
      </div>
    )
  }

}
