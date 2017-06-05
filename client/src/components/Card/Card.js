import React from 'react';
import Rnd from 'react-rnd';
import ReactHighcharts from 'react-highcharts';

import './card.css';

const defaultCardOptions = {
  x: 0,
  y: 0,
  width: 400,
  height: 'auto',
};

const cardOptions = {
  bounds: 'parent',
  minHeight: 200,
  height: '100%',
  minWidth: 200,
  resizeGrid: [25, 25],
  dragGrid: [25, 25],
  dragHandlerClassName: '.card-header',
  resizeHandlerClasses: '.card-footer',
  enableResizing: {
    bottom: false,
    bottomLeft: false,
    bottomRight: true,
    left: false,
    right: false,
    top: false,
    topLeft: false,
    topRight: false
  }
};

const buildConfig = (series, xAxis, yAxis, title, subtitle) => {
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
    series
  }
};

function buildSeria(name, type, data, color) {
  return {
    name: name,
    type: type,
    data: data,
    lineWidth: 1.5,
    marker: {
      radius: 2
    },
    color,
    tooltip: {
      valueDecimals: 2
    }
  }
}


export default class Card extends React.Component {
  constructor(props) {
    super(props);
    const series = [buildSeria('test', null, [4,5,3,2,2,5,7,8])];
    this.state = {
      cardConfig: buildConfig(series, null, null, 'New card')
    };
    this.cardResizeStopHandler = this.cardResizeStopHandler.bind(this);
  }

  cardResizeStopHandler() {
    this.setState({...this.state })
  }

  render() {

    return (
    <Rnd
      default={defaultCardOptions}
      {...cardOptions}
      onResizeStop={this.cardResizeStopHandler}
    >
      <div className="card no-selection">
        <div className="card-header">name</div>
        <div className="card-body">
          <ReactHighcharts
              config={this.state.cardConfig}
          />
        </div>
        <div className="card-footer">
          <svg viewBox="0 0 16 16" width={16}>
            <path d="M16,0 L16,16 L0,16" fill="#BBBBBB"/>
          </svg>
        </div>
      </div>
    </Rnd>
    )
  }
}