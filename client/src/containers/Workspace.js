import React from 'react';
import Chart from '../components/Chart';

export default class Workspace extends React.Component {

  render() {
    const chart = this.props.chartData ? this.props.chartData.toJS() : undefined;

    return (
      <div>
        <Chart data={chart}/>
      </div>
    )
  }
}
