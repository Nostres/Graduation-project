package graduation

import graduation.constants.ScriptConstants
import graduation.models.Calculations
import grails.transaction.Transactional

@Transactional(readOnly = true)
class MathService {

    static final Integer Lag = 364

    def reformationService
    def coefficientService
    def fileService
    def noiseService

    @SuppressWarnings("ALL")
    List<DayValue> transformsSample(List<DayValue> date, Map<String, ?> response) {
        List<DayValue> data = []
        response.get('Value').get('sample').eachWithIndex { el, idx ->
            DayValue dayValue = date.get(idx)
            dayValue.setValue(el as Double)
            dayValue.setDegree(response.get('Degree').get('sample').get(idx) as Double)
            data.add(dayValue)
        }
        return data
    }


    Map<String, ?> calculateArima(Long fileId, Map<String, Integer> params) {
        List<DayValue> dataByFile = DayValue.findAllByFile(fileService.getFile(fileId))
        Integer size = dataByFile.size()
        Map<String, ?> body = [
                params    : params,
                valueList : dataByFile*.getValue().subList(Lag, size),
                degreeList: dataByFile*.getDegree().subList(Lag, size)
        ]
        def forecast = PythonRunService.sendToMathServer(body, 'arma')

        List<DayValue> response = []
        List<Double> valueForecast = forecast.get('valueForecast') as List<Double>
        List<Double> degreeForecast = forecast.get('degreeForecast') as List<Double>
        def (noiseData, noiseForecast) = noiseService.countNoiseFunction(valueForecast, degreeForecast, dataByFile)

        dataByFile.eachWithIndex { DayValue entry, int i ->
            if (i > Lag && i < (Lag + valueForecast.size())) {
                entry.valueForecast = valueForecast.get(i - Lag)
                entry.degreeForecast = degreeForecast.get(i - Lag)
                entry.noiseForecast = noiseForecast.get(i - Lag) as Double
            }
            response.add(entry)
        }
        return [
                fileId: fileId,
                data  : response,
                noiseData: noiseData
        ]
    }

    @SuppressWarnings("ALL")
    Map<String, ?> calculate(Calculations calculations) {
        List<DayValue> dataByFile = DayValue.findAllByFile(fileService.getFile(calculations.getFileId()))
        List<DayValue> dataByRequest = calculations.getSample()
        List<DayValue> data = dataByRequest ? dataByRequest : dataByFile
        Map<String, ?> response = [:]
        calculations.goalList.forEach({ it ->
            String type = it.capitalize()
            response.put(type, calculationFlow(calculations, data*."get${type}"()) as Object)
        })
        return [
                data      : transformsSample(data, response),
                valueList : response.get('Value'),
                degreeList: response.get('Degree'),
        ]
    }

    @SuppressWarnings("ALL")
    Map<String, ?> calculationFlow(Calculations calculations, List sample) {
        if (calculations.getConversion() != null) {
            sample = reformationService.reformat(calculations.getConversion(), sample)
        }
        Map<String, Double> generalCoefficients = coefficientService.countGeneralCoefficient(sample)
        Map<String, ?> demandsMap = [:]
        calculations.demands.forEach({ it ->
            String functionName = it.toLowerCase()
            if (ScriptConstants.availableFunction.contains(functionName)) {
                demandsMap.put(functionName, PythonRunService.sendToMathServer(sample, functionName) as Object)
            }
        })
        return [
                sample      : sample,
                coefficients: generalCoefficients,
                demands     : demandsMap
        ]
    }
}
