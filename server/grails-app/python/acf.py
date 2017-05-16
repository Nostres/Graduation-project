# #!/usr/bin/python
import sys
import pandas as pd
import numpy as np

from statsmodels.tsa.stattools import acf, pacf

arg = sys.argv[1][1:-1].split(',')
sample = pd.Series(map(float, arg))
pct = sample.pct_change().dropna()
acf = acf(pct, nlags=50)

print np.around(acf, decimals=5).tolist()
