package graduation

import graduation.constants.ScriptConstants
import graduation.models.Calculations
import grails.transaction.Transactional

@Transactional
class MathService {

    def reformationService
    def coefficientService
    def fileService

    @Transactional(readOnly = true)
    List<DayValue> transformsSample(List<DayValue> date, Map<String, ?> response) {
        List<DayValue> data = []
        response.get('Value').get('sample').eachWithIndex{ el, idx ->
            DayValue dayValue = date.get(idx)
            dayValue.setValue(el as Double)
            dayValue.setDegree(response.get('Degree').get('sample').get(idx) as Double)
            data.add(dayValue)
        }
        return data
    }


    @Transactional(readOnly = true)
    List<DayValue> calculateArima(Long fileId, Map<String, Integer> params) {
        List<DayValue> dataByFile = DayValue.findAllByFile(fileService.getFile(fileId))
        Map<String, ?> body = [
                params: params,
                valueList: dataByFile*.getValue().subList(0,729),
                degreeList: dataByFile*.getDegree().subList(0,729)
        ]
        def forecast = PythonRunService.sendToMathServer(body, 'arma')
        List<DayValue> response = []
        dataByFile.eachWithIndex{ DayValue entry, int i ->
            if (i > 364 && i < 728) {
                entry.valueForecast = forecast.get('valueForecast').get(i - 364) as Double
                entry.degreeForecast = forecast.get('degreeForecast').get(i - 364) as Double
            }
            response.add(entry)
        }
        return dataByFile
    }

    @Transactional(readOnly = true)
    Map<String, ?> calculate(Calculations calculations) {
        List<DayValue> dataByFile = DayValue.findAllByFile(fileService.getFile(calculations.getFileId()))
        List<DayValue> dataByRequest = calculations.getSample()
        List<DayValue> data = dataByRequest ? dataByRequest : dataByFile
        Map<String, ?> response = [:]
        calculations.goalList.forEach({ it ->
            String type = it.capitalize()
            response.put(type, calculationFlow(calculations, data*."get${type}"()))
        })
        return [
                data: transformsSample(data, response),
                valueList: response.get('Value'),
                degreeList: response.get('Degree'),
        ]
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
