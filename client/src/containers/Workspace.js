import React from 'react';
import Chart from '../components/Chart';
import { connect } from 'react-redux';

class Workspace extends React.Component {

  render() {
    const chart = this.props.data ? this.props.data.toJS() : undefined;

    return (
      <div>
        <Chart data={chart}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.charts.get('data')
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    dispatchAction: dispatch
  }
};

export default connect(mapStateToProps, mapActionsToProps)(Workspace)