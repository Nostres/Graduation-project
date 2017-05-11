package graduation

import graduation.constants.CoefficientConstants
import graduation.models.Calculations
import grails.transaction.Transactional

@Transactional
class MathService {

    def reformationService
    def coefficientService

    Map<String, ?> calculate(Calculations calculations) {
        List<DayValue> data = DayValue.findAllByFileName(calculations.getFilename())
        Map<String, ?> response = [:]
        calculations.goalList.forEach({ it ->
            response.put(it + "List", calculationFlow(calculations, data*."get${it.capitalize()}"() as List))
        })
        return response
    }

    Map<String, ?> calculationFlow(Calculations calculations, List sample) {
        if (calculations.getConversion() != null) {
            sample = reformationService.reformat(calculations.getConversion(), sample)
        }
        Map<String, Double> generalCoefficients = coefficientService.countGeneralCoefficient(sample)
        Map<String, ?> demandsMap = countDemands(generalCoefficients, sample)

        return [
                sample      : sample,
                coefficients: generalCoefficients,
                demandsMap  : demandsMap
        ]
    }

    Map<String, ?> countDemands(Map<String, Double> coefficients, List<Double> sample) {
        List<Double> autoCovarianceList = CorrelationService.autoCovariance(sample, coefficients.get(CoefficientConstants.AVERAGE_VALUE))
        List<Double> autoCorrelationList = CorrelationService.autoCorrelation(autoCovarianceList, coefficients.get(CoefficientConstants.DEVIATION))
        List<Double> partialAutoCorrelationList = CorrelationService.partialAutoCorrelation(autoCorrelationList)
        return [
                autoCorrelation       : autoCorrelationList,
                partialAutoCorrelation: partialAutoCorrelationList
        ]
    }
}
