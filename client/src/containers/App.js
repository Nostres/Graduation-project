import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppNav from '../components/AppNav';
import Workspace from './Workspace';
import Message from '../components/Message';

import { CLIENT_VERSION, REACT_VERSION } from '../config';

class App extends Component {
  render() {
    return (
      <div>
        <AppNav
          dispatchAction={this.props.dispatchAction}
          clientInfo={{CLIENT_VERSION, REACT_VERSION}}
        />
        <Workspace
          dispatchAction={this.props.dispatchAction}
          chartData={this.props.data}
        />
        <Message
          message={this.props.message.toJS()}
          dispatchAction={this.props.dispatchAction}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.charts.get('data'),
    message: state.message
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    dispatchAction: dispatch
  }
};

export default connect(mapStateToProps, mapActionsToProps)(App)
