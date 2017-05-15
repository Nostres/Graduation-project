import React from 'react';
import { connect } from 'react-redux';
import Spinner from './Spinner';

import './spinner.css'

class GlobalSpinner extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="spinner-bg">
        <div className="spinner-object">
          <Spinner/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    show: state.spinner.get('show')
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    dispatchAction: dispatch
  }
};

export default connect(mapStateToProps, mapActionsToProps)(GlobalSpinner)
