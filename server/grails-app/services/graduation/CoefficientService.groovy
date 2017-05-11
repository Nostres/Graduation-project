package graduation

import grails.transaction.Transactional

@Transactional
class CoefficientService {

    private static final Integer NUMBER_AFTER_DOT = 5

    Map<String, Double> countGeneralCoefficient(List<Double> sample) {

        Double averageValue = countAverageValue(sample)
        Double variance = countVariance(sample, averageValue).round(NUMBER_AFTER_DOT)
        Double deviation = countDeviation(variance).round(NUMBER_AFTER_DOT)
        Double asymmetry = countAsymmetry(sample, averageValue, deviation).round(NUMBER_AFTER_DOT)
        Double excess = countExcess(sample, averageValue, deviation).round(NUMBER_AFTER_DOT)

        return [
                size        : sample.size(),
                averageValue: averageValue,
                variance    : variance,
                deviation   : deviation,
                asymmetry   : asymmetry,
                excess      : excess
        ]
    }

    Double countAverageValue(List<Double> sample) {
        return sample.inject(0) { result, x -> result + x } / sample.size()
    }

    Double countVariance(List<Double> sample, Double averageValue) {
        return sample.inject(0) { result, x -> result + Math.pow(x - averageValue, 2) } / sample.size()
    }

    Double countDeviation(Double variance) {
        assert variance >= 0
        return Math.sqrt(variance)
    }

    Double countAsymmetry(List<Double> sample, Double averageValue, Double deviation) {
        Long size = sample.size()
        Double coefficient = 1 / (size - 3 - (2 / size))
        Double sum = sample.inject(0) { result, x -> result + Math.pow((x - averageValue) / deviation, 3) } as Double
        return coefficient.round(10) * sum.round(10)
    }

    Double countExcess(List<Double> sample, Double averageValue, Double deviation) {
        Long size = sample.size()
        Double coefficient1 = (size * (size + 1)) / ((size - 1) * (size - 2) * (size - 3))
        Double coefficient2 = (3 * Math.pow(size - 1, 2)) / ((size - 2) * (size - 3))
        Double sum = sample.inject(0) { result, x -> result + Math.pow((x - averageValue) / deviation, 4) } as Double
        return coefficient1 * sum - coefficient2
    }

}
