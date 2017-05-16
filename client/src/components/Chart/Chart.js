import React from 'react';
import ReactHighcharts from 'react-highcharts';

const buildConfig = (data) => {
  return {
    chart: {
      zoomType: 'x'
    },
    rangeSelector: {
      selected: 1
    },
    title: {
      text: "Chart"
    },
    subtitle: {
      text: 'Diploma'
    },
    yAxis: {
      title: {
        text: 'Value'
      }
    },
    xAxis: {
      title: {
        text: 'Date'
      },
      type: 'datetime'
    },
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
    const { series } = this.props;
    return (
      <div className="chart-panel">
        <ReactHighcharts config={buildConfig(series)} ref="chart"/>
      </div>
    )
  }
}
