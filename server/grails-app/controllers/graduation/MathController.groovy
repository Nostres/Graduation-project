package graduation

import graduation.models.Calculations

class MathController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [doCalculations: 'POST']

    def mathService

    def doCalculations(Calculations calculations) {
        respond mathService.calculate(calculations)
    }
}
