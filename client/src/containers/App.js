import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppNav from '../components/AppNav';
import Message from '../components/Message';

import { CLIENT_VERSION, REACT_VERSION } from '../config';

class App extends Component {
  render() {
    return (
      <div>
        <AppNav
          dispatchAction={this.props.dispatchAction}
          clientInfo={{CLIENT_VERSION, REACT_VERSION}}
          loggedIn={this.props.isLoggedIn}
          files={this.props.files}
        />
        {this.props.children}
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
    files: state.files.get('data'),
    isLoggedIn: state.user.get('loggedIn'),
    message: state.message,
    state: state
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    dispatchAction: dispatch
  }
};

export default connect(mapStateToProps, mapActionsToProps)(App)
