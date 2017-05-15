import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppNav from '../../components/Navigation/AppNav';
import Message from '../../components/MessageModal/Message';
import GlobalSpinner from '../../components/Spinner/GlobalSpinner';

import { CLIENT_VERSION, REACT_VERSION } from '../../config';

class App extends Component {
  render() {
    return (
      <div>
        <AppNav
          dispatchAction={this.props.dispatchAction}
          clientInfo={{CLIENT_VERSION, REACT_VERSION}}
          loggedIn={this.props.isLoggedIn}
          files={this.props.files}
          router={this.props.router}
        />
        <GlobalSpinner/>
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
    uploading: state.files.get('uploading'),
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
