import React from 'react';
import Chart from '../../components/Chart/Chart';
import Controls from '../../components/Controls/Controls';
import { fromJS } from 'immutable'
import { connect } from 'react-redux';

import CoeffTable from './CoeffTable';

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
}

function generateSeries(chart, type, resultColor, forecastColor) {
    const series = [];
    let result = [];
    let resultForecast = [];
    chart.toJSON().forEach( function(it) {
        result.push([new Date(it.date).getTime(), it[type]]);
        if (it[`${type}Forecast`]) {
            resultForecast.push([new Date(it.date).getTime(), it[`${type}Forecast`]]);
        }
    });
    series.push(buildSeria('sample', 'spline', result, resultColor));
    series.push(buildSeria('forecast', 'spline', resultForecast, forecastColor));
    return series
}


class Workspace extends React.Component {

    render() {

        if (!this.props.isLoaded) {
            return null;
        }

        const {chart, coeffsValue, ACFValue, PACFValue, coeffsDegree, ACFDegree, PACFDegree} = this.props;

        const seriesValue = chart ? generateSeries(chart, 'value', '#000000', '#0008B8'): [];
        const seriesDegree = chart ? generateSeries(chart, 'degree', '#FF0028', '#0008B8') : [];
        const asymmetry = coeffsValue ? Math.abs(coeffsValue.get('asymmetry')) : 0;
        const asymmetry1 = coeffsDegree ? Math.abs(coeffsDegree.get('asymmetry')) : 0;

        return (
            <div className="workspace" id="workspace">
              <div className="main-chart-panel" style={{display: 'flex', overflow: 'hidden'}}>
                <div className="main-chart-holder">
                  <Chart
                      series={seriesValue}
                      yAxis={{title: {text: 'Value'}}}
                      xAxis={{title: {text: 'Date'}, type: 'datetime'}}
                      title={{text: 'Day values'}}
                  />
                </div>
                <CoeffTable data={coeffsValue}/>
              </div>

              <div className="main-chart-panel" style={{display: 'flex', overflow: 'hidden'}}>
                <div className="main-chart-holder">
                  <Chart
                      series={seriesDegree}
                      yAxis={{title: {text: 'Value'}}}
                      xAxis={{title: {text: 'Date'}, type: 'datetime'}}
                      title={{text: 'Degree values'}}
                  />
                </div>
                <CoeffTable data={coeffsDegree}/>
              </div>

                { (ACFValue || PACFValue ) &&
                <div className="main-chart-panel" style={{display: 'flex', align: 'center'}}>
                    {
                        ACFValue &&
                        <div className="acf-pacf-chart-panel">
                          <Chart
                              series={[buildSeria('Result', 'spline', ACFValue.toJS(), '#00aadd')]}
                              title={{text: 'Autocorrelation'}}
                              yAxis={{
                                  plotBands: [{
                                      from: -asymmetry,
                                      to: asymmetry,
                                      color: 'rgba(68, 170, 213, 0.1)',
                                      label: {
                                          text: 'asymmetry',
                                          style: {color: '#606060'}
                                      }
                                  }]
                              }
                              }
                          />
                        </div>
                    }
                    {
                        PACFValue &&
                        <div className="acf-pacf-chart-panel">
                          <Chart
                              series={[buildSeria('Result', 'column', PACFValue.toJS(), '#0000ff')]}
                              title={{text: 'Partial autocorrelation'}}
                              yAxis={{
                                  plotBands: [{
                                      from: -asymmetry,
                                      to: asymmetry,
                                      color: 'rgba(68, 170, 213, 0.1)',
                                      label: {
                                          text: 'asymmetry',
                                          style: {color: '#606060'}
                                      }
                                  }]
                              }
                              }
                          />
                        </div>
                    }
                </div>
                }

                { (ACFDegree || PACFDegree ) &&
                <div className="main-chart-panel" style={{display: 'flex', align: 'center'}}>
                    {
                        ACFDegree &&
                        <div className="acf-pacf-chart-panel">
                          <Chart
                              series={[buildSeria('Result', 'spline', ACFDegree.toJS(), '#00aadd')]}
                              title={{text: 'Autocorrelation for Deegre'}}
                              yAxis={{
                                  plotBands: [{
                                      from: -asymmetry1,
                                      to: asymmetry1,
                                      color: 'rgba(68, 170, 213, 0.1)',
                                      label: {
                                          text: 'asymmetry',
                                          style: {color: '#606060'}
                                      }
                                  }]
                              }
                              }
                          />
                        </div>
                    }
                    {
                        PACFDegree &&
                        <div className="acf-pacf-chart-panel">
                          <Chart
                              series={[buildSeria('Result', 'column', PACFDegree.toJS(), '#0000ff')]}
                              title={{text: 'Partial autocorrelation for Deegre'}}
                              yAxis={{
                                  plotBands: [{
                                      from: -asymmetry1,
                                      to: asymmetry1,
                                      color: 'rgba(68, 170, 213, 0.1)',
                                      label: {
                                          text: 'asymmetry',
                                          style: {color: '#606060'}
                                      }
                                  }]
                              }
                              }
                          />
                        </div>
                    }
                </div>
                }

              <Controls dispatchAction={this.props.dispatchAction} data={chart}/>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    active: state.charts.get('active'),
    chart: state.charts.getIn(['data', `${state.charts.get('active')}`]),
    isLoaded: state.charts.get('isLoaded'),
    ACFValue: state.charts.getIn(['valueList', `${state.charts.get('active')}`, 'demands', 'acf']),
    ACFDegree: state.charts.getIn(['degreeList', `${state.charts.get('active')}`, 'demands', 'acf']),
    PACFValue: state.charts.getIn(['valueList', `${state.charts.get('active')}`, 'demands', 'pacf']),
    PACFDegree: state.charts.getIn(['degreeList', `${state.charts.get('active')}`, 'demands', 'pacf']),
    coeffsValue: state.charts.getIn(['valueList', `${state.charts.get('active')}`, 'coefficients']),
    coeffsDegree: state.charts.getIn(['degreeList', `${state.charts.get('active')}`, 'coefficients'])
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    dispatchAction: dispatch
  }
};

export default connect(mapStateToProps, mapActionsToProps)(Workspace)