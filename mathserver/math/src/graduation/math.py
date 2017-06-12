import pandas as pd
import numpy as np
from statsmodels.tsa.stattools import acf, pacf
from statsmodels.tsa.arima_model import ARIMA
from flask import Flask, json, Response, request

app = Flask(__name__)


def cov(arg1, arg2):
    if len(arg1) != len(arg2):
        print('Error: Lengths of variables to be correlated must be equal')

    mean_x = np.mean(arg1)
    mean_y = np.mean(arg2)

    mu = []
    n = 0
    for _ in arg1:
        var_a = arg1[n] - mean_x
        mu.append(var_a)
        n = n + 1

    nu = []
    n = 0
    for _ in arg2:
        var_b = arg2[n] - mean_y
        nu.append(var_b)
        n = n + 1

    n = 0
    lst = []
    for _ in nu:
        var4 = nu[n] * mu[n]
        lst.append(var4)
        n = n + 1
    var5 = sum(lst)
    result = var5 / ((len(arg1)) - 1)
    return result


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


def calc_cov(data):
    sample = pd.Series(map(float, data))
    return cov(sample, sample)


def arma(sample, ar, ma, isR):
    X = sample
    size = len(sample)
    train = (X[365:size], X[378:size])[isR]
    history = [x for x in train]
    model = ARIMA(history, order=(int(ar), 0, int(ma)))
    model_fit = model.fit(disp=0)
    print(model_fit.summary())
    predictions = model_fit.predict()
    return np.around(predictions, decimals=5).tolist()


def calc_arma(body):
    params = body.get('params')
    return dict({
        'valueForecast': arma(body.get('valueList'), params.get('ARvalue'), params.get('MAvalue'), False),
        'degreeForecast': arma([float(i) for i in body.get('degreeList')], params.get('ARdegree'), params.get('MAdegree'), False),
    })


def formulas(formula, body):
    if formula == 'countArima':
        return arma([float(i) for i in body.get('noise')], body.get('ar'), body.get('ma'), body.get('isR'))
    else:
        return globals()["calc_" + formula](body)


@app.route("/calc/<formula>", methods=['POST'])
def calc(formula):
    body = request.json
    json_res = json.dumps(formulas(formula, body))
    return Response(json_res, status=200, mimetype='application/json')


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8081)
