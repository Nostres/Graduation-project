package graduation

import graduation.models.Calculations
import grails.transaction.Transactional

@Transactional
class MathService {

    def reformationService
    def correlationService
    def coefficientService

    Map<String, ?> calculate(Calculations calculations) {
        List<DayValue> data = DayValue.findAllByFileName(calculations.getFilename())
        Map<String, ?> response = [:]
        calculations.goalList.forEach({ it ->
            response.put(it + "List",calculationFlow(calculations, data*."get${it.capitalize()}"() as List))
        })
        return response
    }

    Map<String, ?> calculationFlow(Calculations calculations, List sample) {
        Map<String, ?> calculationResult = [:]
        if (calculations.getConversion() != null) {
            sample = reformationService.reformat(calculations.getConversion(), sample)
        }
        calculationResult.put('sample', sample)

        Map<String, ?> generalCoefficients = coefficientService.countGeneralCoefficient(sample)

        return calculationResult
    }
}
