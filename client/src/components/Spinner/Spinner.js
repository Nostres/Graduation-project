import React from 'react';

import './spinner.css'

export default class Spinner extends React.Component {
  render() {
    return (
      <div className="spinner">
        <div className="bounce1"/>
        <div className="bounce2"/>
        <div className="bounce3"/>
      </div>
    )
  }
}
