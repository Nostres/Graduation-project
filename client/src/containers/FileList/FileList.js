import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import trash from './trash-icon.png';
import './fileList.css';

import { deleteFile } from '../../redux/reducers/files';

const Trash = (props) => (
  <span>
    <span className="remove-button" onClick={props.onDeleteFile}>
      <img src={trash} alt="Grails"/>
    </span>
  </span>
);

const TableRow = (num, rec, deleteFile) => (
  <tr key={num}>
    <td>{num + 1}</td>
    <td>
      <Link to={`files/${rec.get('id')}`}>{rec.get('name')}</Link>
      <Trash onDeleteFile={() => deleteFile(rec.get('id'))}/>
    </td>
    <td>{rec.get('description')}</td>
    <td>{new Date(rec.get('created')).toDateString()}</td>
    <td>{new Date(rec.get('updated')).toDateString()}</td>
  </tr>
);


const transformFiles = (files, deleteFile) => {
  if (!files) {
    return null;
  }
  const result = [];
  files.forEach((item, i) => {
    result.push(TableRow(i, item, deleteFile))
  });
  return result;
};


class FileList extends React.Component {

  constructor(props) {
    super(props);
    this.deleteFile = this.deleteFile.bind(this);
  }

  deleteFile(id) {
    this.props.dispatchAction(deleteFile(id))
  }

  render() {
    return(
      <div className="filelist-table">
        <h1>File list</h1>
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
          {transformFiles(this.props.files, this.deleteFile)}
          </tbody>
        </Table>
      </div>
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