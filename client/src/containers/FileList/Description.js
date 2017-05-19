import React from 'react';

export default class Description extends React.Component {

  constructor(props) {
    super(props);
    this.editModeClick = this.editModeClick.bind(this);
    this.saveClick = this.saveClick.bind(this);
    this.state = {
      editMode: false,
    }
  }

  componentDidUpdate() {
    if(this.state.editMode) {
      this.editableInput.focus();
    }
  }

  editModeClick() {
    this.setState({ editMode: true});
  }

  saveClick() {
    this.setState({ editMode: false });
    if(this.props.onSave) {
      this.props.onSave(this.editableInput.value);
    }
  }

  render() {
    return (
      <div>
        <input
          defaultValue={this.props.text}
          disabled={!this.state.editMode}
          style={{border: 'none', background: 'inherit', width: 'calc(100% - 24px)'}}
          ref={(c) => { this.editableInput = c; }}
        />
        <i
          className={`glyphicon ${this.state.editMode ? 'glyphicon-floppy-disk':'glyphicon-pencil'} as-button`}
          onClick={this.state.editMode ? this.saveClick : this.editModeClick}
        />
      </div>
    )
  }

}
