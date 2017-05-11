package graduation

import grails.transaction.Transactional

@Transactional
class CorrelationService {

    static List<Double> autoCovariance(List<Double> sample, Double averageValue) {
        Long size = sample.size()
        List<Double> result = []
        sample.eachWithIndex { it, k ->
            Double ac = 0
            for (int t = 0; t < size - k - 1; t++) {
                ac += ((sample.get(t) - averageValue) * (sample.get(t + k) - averageValue))
            }
            result.add((ac / 730))
        }
        return result
    }

    static List<Double> autoCorrelation(List<Double> autoCovarianceList, Double deviance) {
        return autoCovarianceList.collect({ it / deviance })
    }

    static List<Double> partialAutoCorrelation(List<Double> sample) {
        Long size = sample.size()
        Double [][] PACL = new Double[size][size]

        //initial data
        PACL[0][0] = sample.get(0)
        PACL[1][1] = (sample.get(1) - Math.pow(sample.get(0), 2)) * (1 - Math.pow(sample.get(0), 2))
        PACL[1][0] = (PACL[0][0] - PACL[1][1] * PACL[0][0])

        for (int l = 2; l < size; l++) {

        }


        return []
    }
}
