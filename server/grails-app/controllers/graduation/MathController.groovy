package graduation

import graduation.models.Calculations
import grails.plugin.springsecurity.annotation.Secured

class MathController {

    static responseFormats = ['json', 'xml']

    def mathService

    @Secured(value = ['ROLE_USER', 'ROLE_ADMIN'])
    def doCalculations(Calculations calculations) {
        respond mathService.calculate(calculations)
    }

    @Secured(value = ['ROLE_USER', 'ROLE_ADMIN'])
    def calculateArima() {
        def json = request.JSON
        Long fileId = json.get('fileId') as Long
        Map<String, Integer> params = json.get('params') as Map<String, Integer>
        respond mathService.calculateArima(fileId, params)
    }
}
