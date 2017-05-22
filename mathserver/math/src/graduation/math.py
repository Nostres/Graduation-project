import pandas as pd
import numpy as np
from statsmodels.tsa.stattools import acf, pacf
from flask import Flask, json, Response, request


app = Flask(__name__)


def calc_acf(pct):
    return acf(pct, nlags=50)


def calc_pacf(pct):
    return pacf(pct, nlags=50, method='ols')


def fourmulas(formula):
    return {
        'acf': calc_acf,
        'pacf': calc_pacf
    }[formula]


@app.route("/calc/<formula>", methods=['POST'])
def calc(formula):
    sample = pd.Series(map(float, request.json))
    pct = sample.pct_change().dropna()
    res = np.around(fourmulas(formula)(pct), decimals=5).tolist()
    json_res = json.dumps(res)
    resp = Response(json_res, status=200, mimetype='application/json')
    return resp


if __name__ == "__main__":
    app.run()
