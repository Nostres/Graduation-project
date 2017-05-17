import React from 'react';

import './workspace.css';

const dataMap = [
  { title: 'Size', field: 'size' },
  { title: 'Average value', field: 'averageValue' },
  { title: 'Variance', field: 'variance' },
  { title: 'Deviation', field: 'deviation' },
  { title: 'Asymmetry', field: 'asymmetry' },
  { title: 'Excess', field: 'excess' }
];

const buildTableRows = (data) => {
  const result = [];
  dataMap.forEach((i,k) => {
    result.push(
      <tr key={k}>
        <td className="coef-table-key">{i.title}</td>
        <td className="coef-table-value">{data.get(`${i.field}`)}</td>
      </tr>)
  });
  return result;
};

export default class CoeffTable extends React.Component {
  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    return (
      <div className="chart-coefs-panel">
        <h1 style={{textAlign: 'center'}}>Coefficients</h1>
        <hr/>
        <table style={{height: '200px'}}>
          <tbody>
            {buildTableRows(data)}
          </tbody>
        </table>
      </div>
    )
  }
}
