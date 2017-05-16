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
    series: [
      {
        name: 'Data 1 Spline',
        type: 'spline',
        data: data,
        lineWidth: 1.5,
        marker: {
          radius: 2
        },
        color: '#ff5050',
        tooltip: {
          valueDecimals: 2
        }
      },
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

    ]
  }
};



export default class Chart extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <ReactHighcharts config={buildConfig(data)} ref="chart"/>
    )
  }
}
