package graduation

import grails.transaction.Transactional

@Transactional
class CorrelationService {

    def coefficientService

    List<Double> autoCovariance(List<Double> x, List<Double> y) {
        Double averageX = coefficientService.countAverageValue(x)
        Double averageY = coefficientService.countAverageValue(y)
        Long sizeX = x.size()
        Long sizeY = y.size()
        assert sizeX == sizeY
        List<Double> result = []
        x.eachWithIndex { it, k ->
            Double ac = 0
            for (int t = 0; t < sizeX - k - 1; t++) {
                ac += ((x.get(t) - averageX) * (y.get(t + k) - averageY))
            }
            result.add((ac / sizeX))
        }
        return result
    }

    List<Double> countCrossCorrelation(List<Double> sample, Double sA, Double sB) {
        List<Double> crossCorrelation = []
        sample.each {
            crossCorrelation.add(it/(sA*sB))
        }
        return crossCorrelation
    }
}
