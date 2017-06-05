import pandas as pd
import numpy as np
from statsmodels.tsa.stattools import acf, pacf
from statsmodels.tsa.arima_model import ARIMA
from flask import Flask, json, Response, request

app = Flask(__name__)


def calc_acf(data):
    sample = pd.Series(map(float, data))
    acfResult = acf(sample, fft=False, nlags=50)
    return np.around(acfResult, decimals=5).tolist()


def calc_pacf(data):
    sample = pd.Series(map(float, data))
    pacfResult = pacf(sample, nlags=50)
    return np.around(pacfResult, decimals=5).tolist()


def calc_ccf(data):
    sample1 = pd.Series(map(float, data[0]))
    sample2 = pd.Series(map(float, data[1]))
    return np.correlate(sample1, sample2, 'full')


def arma(sample, ar, ma):
    X = sample
    size = int(365)
    train, test = X[0:size], X[size:len(X)]
    history = [x for x in train]
    model = ARIMA(history, order=(int(ar), 0, int(ma)))
    model_fit = model.fit(disp=0)
    predictions = model_fit.predict()
    return np.around(predictions, decimals=5).tolist()


def calc_arma(body):
    params = body.get('params')
    return dict({
        'valueForecast': arma(body.get('valueList'), params.get('ARvalue'), params.get('MAvalue')),
        'degreeForecast': arma([float(i) for i in body.get('degreeList')], params.get('ARdegree'), params.get('MAdegree')),
    })


def formulas(formula, body):
    return globals()["calc_" + formula](body)


@app.route("/calc/<formula>", methods=['POST'])
def calc(formula):
    body = request.json
    json_res = json.dumps(formulas(formula, body))
    return Response(json_res, status=200, mimetype='application/json')


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8081)
