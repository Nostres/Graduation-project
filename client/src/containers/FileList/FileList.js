import React from 'react';
import { Table, ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Description from './Description';
import Fader from '../../components/Fader/Fader';

import './fileList.css';

import {
  uploadFileAC,
  deleteFileAC,
  getFilesAC,
  updateDescription
} from '../../redux/reducers/files';

const Trash = (props) => (
  <span>
    <span className="glyphicon glyphicon-trash as-button" onClick={props.onDeleteFile}/>
  </span>
);

const TableRow = (num, rec, deleteFile, saveText) => (
  <tr key={num}>
    <td>{num + 1}</td>
    <td>
      <Link to={`files/${rec.get('id')}`}>{rec.get('name')}</Link>
      <Trash onDeleteFile={() => deleteFile(rec.get('id'))}/>
    </td>
    <td>
      <Description text={rec.get('description')} onSave={(text) => saveText(text, rec.get('id'))}/>
    </td>
    <td>{new Date(rec.get('created')).toDateString()}</td>
    <td>{new Date(rec.get('updated')).toDateString()}</td>
  </tr>
);

const transformFiles = (files, deleteFile, saveText) => {
  if (!files) {
    return null;
  }
  const result = [];
  files.forEach((item, i) => {
    result.push(TableRow(i, item, deleteFile, saveText))
  });
  return result;
};


class FileList extends React.Component {

  constructor(props) {
    super(props);
    this.deleteFile = this.deleteFile.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.reloadData = this.reloadData.bind(this);
    this.doUploadFile = this.doUploadFile.bind(this);
    this.saveDescription = this.saveDescription.bind(this);
  }

  deleteFile(id) {
    this.props.dispatchAction(deleteFileAC(id))
  }

  selectFile() {
    this.inputElement.click()
  }

  doUploadFile() {
    const file = this.inputElement.files[0];
    this.props.dispatchAction(uploadFileAC(file));
    this.inputElement.value = "";
  }

  reloadData() {
    this.props.dispatchAction(getFilesAC());
  }

  saveDescription(text, id) {
    this.props.dispatchAction(updateDescription(id, text))
  }

  render() {
    return(
      <Fader>
      <div className="filelist-table" key='filelist-table'>
        <div className="filelist-table-menu">
          <h1>File list</h1>
          <ButtonGroup justified>
            <Button href="#" onClick={this.reloadData}>Refresh list</Button>
            <Button href="#" onClick={this.selectFile}>Upload file</Button>
          </ButtonGroup>
        </div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th width="5%">№</th>
              <th width="20%">File name</th>
              <th width="45%">Description</th>
              <th width="10%">Created</th>
              <th width="10%">Updated</th>
            </tr>
          </thead>
          <tbody>
          {transformFiles(this.props.files, this.deleteFile, this.saveDescription)}
          </tbody>
        </Table>
        <input
          onChange={this.doUploadFile}
          style={{display: 'none'}}
          type="file"
          ref={input => this.inputElement = input}
        />
      </div>
      </Fader>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    files: state.files.get('data')
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    dispatchAction: dispatch
  }
};

export default connect(mapStateToProps, mapActionsToProps)(FileList)