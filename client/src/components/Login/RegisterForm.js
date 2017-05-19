import React from 'react';
import {
  FormGroup,
  Form,
  FormControl,
  Col,
  ControlLabel,
  Button
} from 'react-bootstrap';

import { registerAC } from '../../redux/reducers/user';
import { showMessageAC } from '../../redux/reducers/message';

export default class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const { username, password, password2 } = this;
    if (password !== password2) {
      this.props.dispatchAction(showMessageAC('Passwords not equals', 'warning'));
    }
    this.props.dispatchAction(registerAC(username.value, password.value));
  }

  render() {
    return(
      <div className="form-content">
        <Form horizontal id="login-form" onSubmit={this.submit}>
          <FormGroup controlId="username-group">
            <Col componentClass={ControlLabel} sm={4}>Username</Col>
            <Col sm={7}>
              <FormControl
                type="text"
                placeholder="Username"
                inputRef={(c) => { this.username = c; }}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="password-group">
            <Col componentClass={ControlLabel} sm={4}>Password</Col>
            <Col sm={7}>
              <FormControl
                type="password"
                placeholder="Password"
                inputRef={(c) => this.password = c}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="password-group">
            <Col componentClass={ControlLabel} sm={4}>Repeat password</Col>
            <Col sm={7}>
              <FormControl
                type="password"
                placeholder="Password"
                inputRef={(c) => this.password2 = c}
              />
            </Col>
          </FormGroup>
        </Form>
        <hr/>
        <div className="form-footer">
          <Button className="button-submit" bsStyle="primary" onClick={this.submit}>Register</Button>
        </div>
      </div>
    )
  }
}
