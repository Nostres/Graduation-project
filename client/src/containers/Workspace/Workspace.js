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
    if(!this.props.isLoaded) {
      return null;
    }

    const { chart, sample, coeffs, demandsACF, demandsPACF, sample1, coeffs1, demandsACF1, demandsPACF1 } = this.props;
    const series = [];
    const series1 = [];

    // if(chart) {
    //   const data = chart.toJS().map(i => [i.date, i.value]);
    //   series.push(buildSeria('Data 1', 'spline', data, '#ff5050'));
    // }

    if(sample) {
      const result = [];
      if (sample) {
        sample.toJS().forEach((k, i) => result.push([chart.getIn([`${i}`, 'date']), k]));
      }
      series.push(buildSeria('Result', 'spline', result, '#000000'));
      // series.push(buildSeria('Result', 'spline', sample.toJS(), '#434333'));
    }

      if(sample1) {
          const result = [];
          if (sample1) {
              sample1.toJS().forEach((k, i) => result.push([chart.getIn([`${i}`, 'date']), k]));
          }
          series1.push(buildSeria('Result', 'spline', result, '#b80300'));
          // series.push(buildSeria('Result', 'spline', sample.toJS(), '#434333'));
      }

    return (
      <div className="workspace" id="workspace">
        <div className="main-chart-panel" style={{display: 'flex', overflow: 'hidden'}}>
          <div className="main-chart-holder">
          <Chart
            series={series}
            yAxis={{ title: { text: 'Value'}}}
            xAxis={{ title: { text: 'Date' }, type: 'datetime'}}
            title={{ text: 'Day values'}}
          />
          </div>
          <CoeffTable data={coeffs}/>
        </div>

        <div className="main-chart-panel" style={{display: 'flex', overflow: 'hidden'}}>
          <div className="main-chart-holder">
            <Chart
                series={series1}
                yAxis={{ title: { text: 'Value'}}}
                xAxis={{ title: { text: 'Date' }, type: 'datetime'}}
                title={{ text: 'Degree values'}}
            />
          </div>
          <CoeffTable data={coeffs1}/>
        </div>

        { (demandsACF || demandsPACF ) &&
          <div className="main-chart-panel" style={{display:'flex', align: 'center'}}>
            {
              demandsACF &&
              <div className="acf-pacf-chart-panel">
                <Chart
                  series={[buildSeria('Result', 'spline', demandsACF.toJS(), '#00aadd')]}
                  title={{text: 'Autocorrelation'}}
                />
              </div>
            }
            {
              demandsPACF &&
              <div className="acf-pacf-chart-panel">
                <Chart
                  series={[buildSeria('Result', 'column', demandsPACF.toJS(), '#0000ff')]}
                  title={{text: 'Partial autocorrelation'}}
                />
              </div>
            }
          </div>
        }

        <Controls dispatchAction={this.props.dispatchAction}/>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    active: state.charts.get('active'),
    chart: state.charts.getIn(['data', `${state.charts.get('active')}`]),
    sample: state.charts.getIn(['valueList', `${state.charts.get('active')}`, 'sample']),
    sample1: state.charts.getIn(['degreeList', `${state.charts.get('active')}`, 'sample']),
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