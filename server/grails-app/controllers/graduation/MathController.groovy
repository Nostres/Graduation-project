package graduation

import graduation.models.Calculations
import grails.plugin.springsecurity.annotation.Secured

class MathController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [doCalculations: 'POST']

    def mathService
    @Secured(value = ['ROLE_USER', 'ROLE_ADMIN'], httpMethod = 'POST')
    def doCalculations(Calculations calculations) {
        respond mathService.calculate(calculations)
    }
}
