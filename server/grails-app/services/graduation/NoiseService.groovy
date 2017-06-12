package graduation

import grails.transaction.Transactional

@Transactional
class NoiseService {

    def pythonRunService
    def correlationService

    def countNoiseFunction(List<Double> valueForecast, List<Double> degreeForecast, List<DayValue> sample) {
        List<Double> covValue = correlationService.autoCovariance(valueForecast, valueForecast)
        List<Double> covDegree = correlationService.autoCovariance(degreeForecast, degreeForecast)
        List<Double> covValueDegree = correlationService.autoCovariance(valueForecast, degreeForecast)
        Double sValue = Math.sqrt(Math.abs(covValue.get(0)))
        Double sDegree = Math.sqrt(Math.abs(covDegree.get(0)))
        List<Double> crossCorrelation = correlationService.countCrossCorrelation(covValueDegree, sValue, sDegree)
        List<Double> signalList = countSignalFunction(crossCorrelation, sValue, sDegree)
        List<Double> noiseList = countNoise(valueForecast, degreeForecast, signalList)
        List<Double> acfNoise = pythonRunService.sendToMathServer(noiseList, 'acf') as List<Double>
        List<Double> pacfNoise = pythonRunService.sendToMathServer(noiseList, 'pacf') as List<Double>
        def body = [
                noise: sample*.getValue(),
                ar   : 3,
                ma   : 2,
                isR   : false
        ]
        List<Double> noiseForecast = pythonRunService.sendToMathServer(body, 'countArima') as List<Double>
        return [[signal: signalList, noise: noiseList, acfNoise: acfNoise, pacfNoise: pacfNoise], noiseForecast]
    }

    List<Double> countSignalFunction(List<Double> crossCorrelation, Double sA, Double sB) {
        List<Double> signalList = []
        crossCorrelation.each {
            signalList.add(it * (sB / sA))
        }
        return signalList
    }

    List<Double> countNoise(List<Double> valueForecast, List<Double> degreeForecast, List<Double> crossCorelation) {
        List<Double> noiseList = []
        degreeForecast.eachWithIndex { it, idx ->
            int iter = ((idx + 1) < 6) ? idx + 1 : 6
            Double sum = valueForecast.subList(0, iter).reverse().inject(0) { result, x ->
                Double step = result + x * crossCorelation.get(idx)
                idx--
                return step
            } as Double
            noiseList.add(it - sum)
        }
        return noiseList
    }
}
