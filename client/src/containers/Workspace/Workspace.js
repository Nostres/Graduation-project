import React from 'react';
import Chart from '../../components/Chart/Chart';
import Controls from '../../components/Controls/Controls';
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


class Workspace extends React.Component {

    render() {
        if (!this.props.isLoaded) {
            return null;
        }

        const {chart, coeffs, demandsACF, demandsPACF, coeffs1, demandsACF1, demandsPACF1} = this.props;
        const series = [];
        const series1 = [];
        const asymmetry = coeffs ? Math.abs(coeffs.get('asymmetry')) : 0;
        const asymmetry1 = coeffs1 ? Math.abs(coeffs1.get('asymmetry')) : 0;

        if (chart) {
            const values = chart.map(function(it){return [new Date(it.get('date')).getTime(), it.get('value')]}).toJSON();
            const degrees = chart.map(function(it){return [new Date(it.get('date')).getTime(), it.get('degree')]}).toJSON();
            series.push(buildSeria('Result', 'spline', values, '#000000'));
            series1.push(buildSeria('Result', 'spline', degrees, '#b80300'));
        }

        return (
            <div className="workspace" id="workspace">
              <div className="main-chart-panel" style={{display: 'flex', overflow: 'hidden'}}>
                <div className="main-chart-holder">
                  <Chart
                      series={series}
                      yAxis={{title: {text: 'Value'}}}
                      xAxis={{title: {text: 'Date'}, type: 'datetime'}}
                      title={{text: 'Day values'}}
                  />
                </div>
                <CoeffTable data={coeffs}/>
              </div>

              <div className="main-chart-panel" style={{display: 'flex', overflow: 'hidden'}}>
                <div className="main-chart-holder">
                  <Chart
                      series={series1}
                      yAxis={{title: {text: 'Value'}}}
                      xAxis={{title: {text: 'Date'}, type: 'datetime'}}
                      title={{text: 'Degree values'}}
                  />
                </div>
                <CoeffTable data={coeffs1}/>
              </div>

                { (demandsACF || demandsPACF ) &&
                <div className="main-chart-panel" style={{display: 'flex', align: 'center'}}>
                    {
                        demandsACF &&
                        <div className="acf-pacf-chart-panel">
                          <Chart
                              series={[buildSeria('Result', 'spline', demandsACF.toJS(), '#00aadd')]}
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
                        demandsPACF &&
                        <div className="acf-pacf-chart-panel">
                          <Chart
                              series={[buildSeria('Result', 'column', demandsPACF.toJS(), '#0000ff')]}
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

                { (demandsACF1 || demandsPACF1 ) &&
                <div className="main-chart-panel" style={{display: 'flex', align: 'center'}}>
                    {
                        demandsACF1 &&
                        <div className="acf-pacf-chart-panel">
                          <Chart
                              series={[buildSeria('Result', 'spline', demandsACF1.toJS(), '#00aadd')]}
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
                        demandsPACF1 &&
                        <div className="acf-pacf-chart-panel">
                          <Chart
                              series={[buildSeria('Result', 'column', demandsPACF1.toJS(), '#0000ff')]}
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
    demandsACF: state.charts.getIn(['valueList', `${state.charts.get('active')}`, 'demands', 'acf']),
    demandsACF1: state.charts.getIn(['degreeList', `${state.charts.get('active')}`, 'demands', 'acf']),
    demandsPACF: state.charts.getIn(['valueList', `${state.charts.get('active')}`, 'demands', 'pacf']),
    demandsPACF1: state.charts.getIn(['degreeList', `${state.charts.get('active')}`, 'demands', 'pacf']),
    coeffs: state.charts.getIn(['valueList', `${state.charts.get('active')}`, 'coefficients']),
    coeffs1: state.charts.getIn(['degreeList', `${state.charts.get('active')}`, 'coefficients'])
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    dispatchAction: dispatch
  }
};

export default connect(mapStateToProps, mapActionsToProps)(Workspace)