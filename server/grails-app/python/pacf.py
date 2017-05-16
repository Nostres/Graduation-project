# #!/usr/bin/python
import sys
import pandas as pd
import numpy as np

from statsmodels.tsa.stattools import acf, pacf

arg = sys.argv[1][1:-1].split(',')
sample = pd.Series(map(float, arg))
pct = sample.pct_change().dropna()
pacf = pacf(pct, nlags=50, method='ols')

print np.around(pacf, decimals=5).tolist()
