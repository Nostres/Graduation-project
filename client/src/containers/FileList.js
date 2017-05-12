import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import './fileList.css';

const TableRow = (num, rec) => (
  <tr key={num}>
    <td>{num + 1}</td>
    <td>{rec.get('name')}</td>
    <td>{rec.get('description')}</td>
    <td>{new Date(rec.get('created')).toDateString()}</td>
    <td>{new Date(rec.get('updated')).toDateString()}</td>
  </tr>
);


const transformFiles = (files) => {
  if (!files) {
    return null;
  }
  const result = [];
  files.forEach((item, i) => {
    result.push(TableRow(i, item))
  });
  return result;
};


class FileList extends React.Component {
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
          {transformFiles(this.props.files)}
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