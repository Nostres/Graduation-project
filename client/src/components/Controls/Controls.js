import React from 'react';
import { Button, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import { calculateAC } from '../../redux/reducers/charts';

import 'react-select/dist/react-select.css';
import './controls.css'

const demands = [
  {value: 'acf', label: 'Autocorrelation function'},
  {value: 'pacf', label: 'Partial autocorrelation function'},
  {value: 'ccf', label: 'Cross-correlation function'}
];

const formulas = [
  {value: 'S', label: 'Seasonal'},
  {value: 'O', label: 'OffSeason'}
];

const formulaToConversionMap = (s, d) => {
  return {
    'S': { formula: 'Seasonal', data: { 'S': s, 'D': d } },
    'O': { formula: 'OffSeason', data: { 'D': d } }
  }
};

export default class Controls extends React.Component {

  constructor(props) {
    super(props);
    this.state = { demandsValues : [], formulaValue: formulas[0] };
    this.calculate = this.calculate.bind(this);
    this.handleDemandsChange = this.handleDemandsChange.bind(this);
    this.handleFormulaChange = this.handleFormulaChange.bind(this);
  }

  handleFormulaChange(value) {
    this.setState({ ...this.state, formulaValue: value })
  }

  handleDemandsChange(value) {
    this.setState({ ...this.state, demandsValues: value })
  }

  calculate() {
    const demands = this.state.demandsValues.map((i) => {return i.value});
    const prd = this.periodInput.value;
    const cnt = this.countInput.value;
    const formula = formulaToConversionMap(prd, cnt)[this.state.formulaValue.value];
    this.props.dispatchAction(calculateAC(demands, formula));
  }

  render() {
    return (
      <div className="control-panel">
        <div className="control-item" style={{width: '40%'}}>
          <label htmlFor="demands-select">Demands</label>
          <Select
            id="demands-select"
            name="demands"
            options={demands}
            multi={true}
            value={this.state.demandsValues}
            onChange={this.handleDemandsChange}
            searchable={false}
          />
        </div>
        <div className="control-item" style={{width: '15%'}}>
          <label htmlFor="formula-select">Formula</label>
          <Select
            id="formula-select"
            name="formulas"
            options={formulas}
            value={this.state.formulaValue}
            onChange={this.handleFormulaChange}
            clearable={false}
          />
        </div>
        <div className="control-item-input" style={{width: '15%'}}>
          <label htmlFor="period-input">Period</label>
          <FormControl
            id="period-input"
            disabled={this.state.formulaValue.value === 'O'}
            inputRef={(c) => this.periodInput = c}
            type="number"
          />
        </div>
        <div className="control-item-input" style={{width: '15%'}}>
          <label htmlFor="period-count-input">Count</label>
          <FormControl
            id="period-count-input"
            inputRef={(c) => this.countInput = c}
            type="number"
          />
        </div>
        <div className="control-button">
          <Button
            bsStyle="success"
            onClick={this.calculate}
          >
            Calculate
          </Button>
        </div>
      </div>
    )
  }
}