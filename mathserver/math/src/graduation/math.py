import pandas as pd
import numpy as np
from statsmodels.tsa.stattools import acf, pacf

from flask import Flask, json, Response, request
app = Flask(__name__)


def calc_acf(pct):
    pacfres = pacf(pct, nlags=50, method='ols')
    return np.around(pacfres, decimals=5).tolist()


def calc_pacf(pct):
    pacfres = pacf(pct, nlags=50, method='ols')
    return np.around(pacfres, decimals=5).tolist()


def fourmulas(formula):
    return {
        'acf': calc_acf,
        'pacf': calc_pacf
    }[formula]



@app.route("/calc/<formula>", methods=['POST'])
def calc(formula):
    sample = pd.Series(map(float, request.json))
    pct = sample.pct_change().dropna()

    res = fourmulas(formula)(pct)

    json_res = json.dumps(res)
    resp = Response(json_res, status=200, mimetype='application/json')
    return resp


if __name__ == "__main__":
    app.run()
