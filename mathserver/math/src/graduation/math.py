import pandas as pd
import numpy as np
from statsmodels.tsa.stattools import acf, pacf
from flask import Flask, json, Response, request

app = Flask(__name__)


def calc_acf(data):
    sample = pd.Series(map(float, data[0]))
    pct = sample.pct_change().dropna()
    return acf(pct, nlags=50)


def calc_pacf(data):
    sample = pd.Series(map(float, data[0]))
    pct = sample.pct_change().dropna()
    return pacf(pct, nlags=50, method='ols')


def calc_ccf(data):
    sample1 = pd.Series(map(float, data[0]))
    sample2 = pd.Series(map(float, data[1]))
    pct1 = sample1.pct_change().dropna()
    pct2 = sample2.pct_change().dropna()
    return np.correlate(pct1, pct2, 'full')


def fourmulas(formula):
    return {
        'acf': calc_acf,
        'pacf': calc_pacf,
        'ccf': calc_ccf
    }[formula]


@app.route("/calc/<formula>", methods=['POST'])
def calc(formula):
    data = request.json
    res = np.around(fourmulas(formula)(data), decimals=5).tolist()
    json_res = json.dumps(res)
    resp = Response(json_res, status=200, mimetype='application/json')
    return resp


if __name__ == "__main__":
    app.run()
