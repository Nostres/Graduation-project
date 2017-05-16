import React from 'react';
import Chart from '../../components/Chart/Chart';
import Controls from '../../components/Controls/Controls';
import { connect } from 'react-redux';

import './workspace.css';


function buildSeria(name, type, data, color) {
  return {
    name: name,
    type: type,
    data: data,
    lineWidth: 1.5,
    marker: {
      radius: 2
    },
    color: color,
    tooltip: {
      valueDecimals: 2
    }
  }
  // {
  //   name: 'Data 2',
  //   // type: 'spline',
  //   data: data2,
  //   color: '#0000ff',
  //   lineWidth: 4,
  //   marker: {
  //     radius: 7
  //   },
  //   tooltip: {
  //     valueDecimals: 2
  //   }
  // }
}



class Workspace extends React.Component {

  render() {
    if(!this.props.isLoaded) {
      return null;
    }

    const { chart, sample } = this.props;
    const data = chart ? chart.toJS().map(i => [i.date, i.value]) : [];

    const result = [];
    if (sample) {
      chart.toJS().forEach((data, i) => result.push([data.date, sample.get(`${i}`)]))
    }

    const seria1 = buildSeria('Data 1', 'spline', data, '#ff5050');
    const seria2 = buildSeria('Result', 'spline', result, '#0000ff');

    return (
      <div className="workspace">
        <div className="main-chart-panel">
          <Chart series={[seria1, seria2]}/>
          <Controls dispatchAction={this.props.dispatchAction} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    active: state.charts.get('active'),
    chart: state.charts.getIn(['data', `${state.charts.get('active')}`]),
    sample: state.charts.getIn(['valueList', `${state.charts.get('active')}`, 'sample']),
    isLoaded: state.charts.get('isLoaded')
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    dispatchAction: dispatch
  }
};

export default connect(mapStateToProps, mapActionsToProps)(Workspace)