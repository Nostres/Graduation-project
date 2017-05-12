import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import './login.css'

class Login extends React.Component {

  render() {
    return (
      <div className="login-menu">
        <Tabs defaultActiveKey={1} id="login-tabs">
          <Tab eventKey={1} title="Login">
            <LoginForm dispatchAction={this.props.dispatchAction}/>
          </Tab>
          <Tab eventKey={2} title="Register">
            <RegisterForm dispatchAction={this.props.dispatchAction}/>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // data: state.charts.get('data')
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    dispatchAction: dispatch
  }
};

export default connect(mapStateToProps, mapActionsToProps)(Login)