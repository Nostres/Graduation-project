import React from 'react';
import {Button, FormControl} from 'react-bootstrap';
import Select from 'react-select';
import _ from 'underscore';
import {calculateAC, calculateArima} from '../../redux/reducers/charts';

import 'react-select/dist/react-select.css';
import './controls.css'

const demands = [
    {value: 'acf', label: 'Autocorrelation function'},
    {value: 'pacf', label: 'Partial autocorrelation function'},
    {value: 'ccf', label: 'Cross-correlation function'},
    {value: 'arma', label: 'Autoregressive–moving-average model'},
];


const formulas = [
    {value: 'S', label: 'Seasonal'},
    {value: 'O', label: 'OffSeason'}
];

const formulaToConversionMap = (s, d) => {
    return {
        'S': {formula: 'Seasonal', data: {'S': s, 'D': d}},
        'O': {formula: 'OffSeason', data: {'D': d}}
    }
};

export default class Controls extends React.Component {

    constructor(props) {
        super(props);
        this.state = {demandsValues: [], formulaValue: formulas[0], goalList: []};
        this.calculate = this.calculate.bind(this);
        this.calculateArima = this.calculateArima.bind(this);
        this.handleDemandsChange = this.handleDemandsChange.bind(this);
        this.handleFormulaChange = this.handleFormulaChange.bind(this);
    }

    handleFormulaChange(value) {
        this.setState({...this.state, formulaValue: value})
    }

    handleDemandsChange(value) {
        this.setState({...this.state, demandsValues: value})
    }

    calculateArima() {
        const params = {
            MAvalue: this.MAvalue.value,
            ARvalue: this.ARvalue.value,
            MAdegree: this.MAdegree.value,
            ARdegree: this.ARdegree.value,
        };
        this.props.dispatchAction(calculateArima(params, this.props.data))

    }

    calculate() {
        const demands = this.state.demandsValues.map((i) => {
            return i.value
        });
        const prd = this.periodInput.value;
        const cnt = this.countInput.value;
        const formula = formulaToConversionMap(prd, cnt)[this.state.formulaValue.value];
        this.props.dispatchAction(calculateAC(demands, formula, this.props.data));
    }

    render() {

        const isArima = _.find(this.state.demandsValues, function (o) {
            return o.value && o.value !== 'arma';
        });

        return (
            <div className="control-panel">
                <div className="control-item" style={{width: '25%'}}>
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
                <div className="control-item" style={{width: '10%'}}>
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
                <div className="control-item-input" style={{width: '5%'}}>
                    <label htmlFor="period-input">Period</label>
                    <FormControl
                        id="period-input"
                        disabled={this.state.formulaValue.value === 'O'}
                        inputRef={(c) => this.periodInput = c}
                        type="number"
                    />
                </div>
                <div className="control-item-input" style={{width: '5%'}}>
                    <label htmlFor="period-count-input">Count</label>
                    <FormControl
                        id="period-count-input"
                        inputRef={(c) => this.countInput = c}
                        type="number"
                    />
                </div>
                <div className="control-item-input" style={{width: '5%'}}>
                    <label htmlFor="ar-value-input">AR value</label>
                    <FormControl
                        id="ar-value-input"
                        disabled={isArima}
                        inputRef={(c) => this.ARvalue = c}
                        type="number"
                    />
                </div>
                <div className="control-item-input" style={{width: '5%'}}>
                    <label htmlFor="ma-value-input">MA value</label>
                    <FormControl
                        id="ma-value-input"
                        disabled={isArima}
                        inputRef={(c) => this.MAvalue = c}
                        type="number"
                    />
                </div>
                <div className="control-item-input" style={{width: '5%'}}>
                    <label htmlFor="ar-degree-input">AR degree</label>
                    <FormControl
                        id="ar-degree-input"
                        disabled={isArima}
                        inputRef={(c) => this.ARdegree = c}
                        type="number"
                    />
                </div>
                <div className="control-item-input" style={{width: '5%'}}>
                    <label htmlFor="ma-degree-input">MA degree</label>
                    <FormControl
                        id="ma-degree-input"
                        disabled={isArima}
                        inputRef={(c) => this.MAdegree = c}
                        type="number"
                    />
                </div>
                <div className="control-button">
                    <Button
                        bsStyle="success"
                        onClick={!isArima ? this.calculateArima : this.calculate}
                    >
                        Calculate
                    </Button>
                </div>
            </div>
        )
    }
}