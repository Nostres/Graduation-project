# #!/usr/bin/python
import pandas as pd
import numpy as np
import sys
from statsmodels.tsa.stattools import acf, pacf

arg = sys.argv[1][1:-1].split(',')
sample = pd.Series(map(float, arg))
pct = sample.pct_change().dropna()
acf = acf(pct, nlags=50)
pacf = pacf(pct, nlags=50, method='ols')

print np.around(acf, decimals=5).tolist()
print np.around(pacf, decimals=5).tolist()
