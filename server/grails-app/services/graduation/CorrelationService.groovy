package graduation

import grails.transaction.Transactional

@Transactional
class CorrelationService {

    private static List<Double> getAbscissa(def PACL, Integer size) {
        Double [][] multidimensionalArray = PACL
        List<Double> abscissa = []
        for (int i = 0; i < size; i++) {
            abscissa.add(multidimensionalArray[i][i])
        }
        return abscissa
    }

    private static Double countLL(List<Double> previousPACL, List<Double> sample, Integer l) {
        Double numeratorSum = 0
        for (int i = 0; i < l - 1; i++) {
            numeratorSum += previousPACL.get(i + 1) * sample.get(l - i)
        }
        Double denominatorSum = 0
        for (int i = 0; i < l - 1; i++) {
            denominatorSum += previousPACL.get(i + 1) * sample.get(i)
        }
        Double numerator = sample.get(l) - numeratorSum
        Double denominator = 1 - denominatorSum
        return numerator / denominator
    }

    private static Double countLJ(List<Double> previousPACL, List<Double> currentPACL, Integer l, Integer j) {
        return (previousPACL.get(j) - currentPACL.get(l) * previousPACL.get(l - j))
    }

    static List<Double> autoCovariance(List<Double> sample, Double averageValue) {
        Long size = sample.size()
        List<Double> result = []
        sample.eachWithIndex { it, k ->
            Double ac = 0
            for (int t = 0; t < size - k - 1; t++) {
                ac += ((sample.get(t) - averageValue) * (sample.get(t + k) - averageValue))
            }
            result.add((ac / size))
        }
        return result
    }

    static List<Double> autoCorrelation(List<Double> autoCovarianceList, Double deviance) {
        return autoCovarianceList.collect({ it / deviance })
    }

    @SuppressWarnings("All")
    static List<Double> partialAutoCorrelation(List<Double> sample) {
        Integer size = sample.size()
        Double[][] PACL = new Double[size][size]

        //initial data
        PACL[1][1] = sample.get(0)
        PACL[2][2] = (sample.get(1) - Math.pow(sample.get(0), 2)) * (1 - Math.pow(sample.get(0), 2))
        PACL[2][1] = (PACL[1][1] - PACL[2][2] * PACL[1][1])

        for (int l = 3; l < size; l++) {
            PACL[l][l] = countLL(PACL[l - 1] as List<Double>, sample, l as Integer)

            for (int j = l - 1; j > 0; j--) {
                PACL[l][j] = countLJ(PACL[l - 1] as List<Double>, PACL[l] as List<Double>, l, j)
            }
        }

        return getAbscissa(PACL, size)
    }

}
