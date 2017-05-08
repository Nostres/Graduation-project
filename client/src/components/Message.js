import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { closeModal } from '../redux/reducers/message';

const messages = {
  'danger': 'Error!',
  'warning': 'Warning!',
  'success': 'Success!',
  'info': 'Information',
  'primary': 'Information',
  default: 'default'
};

export default class Message extends React.Component {

  constructor(props) {
    super(props);
    this.closeMessage = this.closeMessage.bind(this);
  }

  closeMessage() {
    this.props.dispatchAction(closeModal());
  }


  render() {
    const { show, message, type } = this.props.message;

    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>{messages[type]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert bsStyle={type}>{message}</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.closeMessage}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  
}
