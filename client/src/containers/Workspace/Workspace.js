import React from 'react';
import Chart from '../../components/Chart/Chart';
import { connect } from 'react-redux';

class Workspace extends React.Component {

  render() {
    if(!this.props.charts.get('isLoaded')) {
      return null;
    }
    const active = this.props.params.id;
    const chart = this.props.charts.getIn(['data', `${active}`]);
    const data = chart ? chart.toJS().map(i => [i.date, i.value]) : [];

    return (
      <div>
        <Chart data={data}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    charts: state.charts
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    dispatchAction: dispatch
  }
};

export default connect(mapStateToProps, mapActionsToProps)(Workspace)