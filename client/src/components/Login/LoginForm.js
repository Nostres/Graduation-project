import React from 'react';
import {
  FormGroup,
  Form,
  FormControl,
  Col,
  ControlLabel,
  Button
} from 'react-bootstrap';

import { login } from '../../redux/reducers/user';

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const { username, password } = this;
    this.props.dispatchAction(login(username.value, password.value))
  }
  
  render() {
    return(
      <div className="form-content">
        <Form horizontal id="login-form">
          <FormGroup controlId="username-group">
            <Col componentClass={ControlLabel} sm={4}>Username</Col>
            <Col sm={7}>
              <FormControl
                type="text"
                placeholder="Username"
                inputRef={(c) => this.username = c}
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
        </Form>
        <hr/>
        <div className="form-footer">
          <Button className="button-submit" bsStyle="success" onClick={this.submit}>Log in</Button>
        </div>
      </div>
    )
  }

}