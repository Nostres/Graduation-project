import React from 'react';
import { MenuItem, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { getFiles } from '../../redux/reducers/files';
import { logout } from '../../redux/reducers/user';

export default class UserMenu extends React.Component {

  constructor(props) {
    super(props);
    this.reloadData = this.reloadData.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.backToList = this.backToList.bind(this);
    this.showFileSelectDialog = this.showFileSelectDialog.bind(this);
  }

  reloadData() {
    this.props.dispatchAction(getFiles());
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.dispatchAction(logout());
  }

  backToList(e) {
    e.preventDefault();
    this.props.router.push('/files');
  }

  showFileSelectDialog() {
    this.props.onUploadFile();
  }

  render() {
    return(
      <Nav pullRight>
        {
          this.props.router.params.id !== undefined &&
          <NavItem eventKey={3} onClick={this.backToList}>
            Return to files list
          </NavItem>
        }
        <NavDropdown eventKey={1} title="Menu" id="menu-dropdown">
          <MenuItem eventKey={1.1} onClick={this.showFileSelectDialog}>
            Upload file
          </MenuItem>
          <MenuItem eventKey={1.2} onClick={this.reloadData}>Refresh file list</MenuItem>
        </NavDropdown>
        <NavItem eventKey={2} onClick={this.logoutUser}>Log out</NavItem>
      </Nav>
    )
  }
}
