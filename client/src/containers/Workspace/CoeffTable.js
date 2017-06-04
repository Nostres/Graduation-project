import React from 'react';

import './workspace.css';

const dataMap = [
  { title: 'Size', field: 'size', accuracy: 0 },
  { title: 'Average value', field: 'averageValue', accuracy: 2 },
  { title: 'Variance', field: 'variance', accuracy: 5 },
  { title: 'Deviation', field: 'deviation', accuracy: 5 },
  { title: 'Asymmetry', field: 'asymmetry', accuracy: 5 },
  { title: 'Excess', field: 'excess', accuracy: 5 }
];

const buildTableRows = (data) => {
  const result = [];
  dataMap.forEach((i,k) => {
    result.push(
      <tr key={k}>
        <td className="coef-table-key">{i.title}</td>
        <td className="coef-table-value">{parseFloat(data.get(`${i.field}`)).toFixed(i.accuracy)}</td>
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
