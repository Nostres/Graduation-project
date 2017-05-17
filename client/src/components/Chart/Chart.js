import React from 'react';
import ReactHighcharts from 'react-highcharts';

const buildConfig = (data, xAxis, yAxis, title, subtitle) => {
  return {
    chart: {
      zoomType: 'x'
    },
    rangeSelector: {
      selected: 1
    },
    title,
    subtitle,
    yAxis: yAxis,
    xAxis: xAxis,
    plotOptions: {
      line: {
        enableMouseTracking: false
      }
    },
    series: data
  }
};



export default class Chart extends React.Component {
  render() {
    const { series, xAxis, yAxis, title, subtitle } = this.props;
    return (
      <div>
        <ReactHighcharts config={buildConfig(series, xAxis, yAxis, title, subtitle)} ref="chart"/>
      </div>
    )
  }
}
