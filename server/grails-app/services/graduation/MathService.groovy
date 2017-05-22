package graduation

import graduation.constants.ScriptConstants
import graduation.models.Calculations
import grails.transaction.Transactional

@Transactional
class MathService {

    def reformationService
    def coefficientService

    Map<String, ?> calculate(Calculations calculations) {
        DataFile dataFile = DataFile.get(calculations.getFileId())
        if (dataFile == null) {
            throw new NullPointerException()
        }
        List<DayValue> data = DayValue.findAllByFile(dataFile)
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
        Map<String, ?> demandsMap = [:]
        calculations.demands.forEach({ it ->
            String functionName = it.toLowerCase()
            if (ScriptConstants.availableFunction.contains(functionName)) {
                demandsMap.put(functionName, PythonRunService.sendToMathServer(sample, functionName))
            }
        })
        return [
                sample      : sample,
                coefficients: generalCoefficients,
                demands     : demandsMap
        ]
    }
}
