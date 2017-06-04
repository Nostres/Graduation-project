import pandas as pd
import numpy as np
from statsmodels.tsa.stattools import acf, pacf
from flask import Flask, json, Response, request

app = Flask(__name__)


def calc_acf(data):
    sample = pd.Series(map(float, data))
    acfResult = acf(sample, nlags=50)
    return np.around(acfResult, decimals=5).tolist()


def calc_pacf(data):
    sample = pd.Series(map(float, data))
    pacfResult = pacf(sample, nlags=50, method='ols')
    return np.around(pacfResult, decimals=5).tolist()


def calc_ccf(data):
    sample1 = pd.Series(map(float, data[0]))
    sample2 = pd.Series(map(float, data[1]))
    return np.correlate(sample1, sample2, 'full')


# def calc_arma(data):
#     size = int(len(data) * 0.66)
#     train, test = data[0:size], data[size:len(data)]
#     history = [x for x in train]
#     result = []
#     for t in range(len(test)):
#         model = ARIMA(history, order=(2, 2, 0))
#         model_fit = model.fit(start_params=[.1, .1, .1, .1], trend='nc', disp=0)
#         output = model_fit.forecast()
#         yhat = output[0]
#         result.append(yhat)
#     return result


def formulas(formula, data):
    return globals()["calc_" + formula](data)


@app.route("/calc/<formula>", methods=['POST'])
def calc(formula):
    data = request.json
    json_res = json.dumps(formulas(formula, data))
    return Response(json_res, status=200, mimetype='application/json')


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8081)
