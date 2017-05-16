package graduation

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

class DayValueController {

    DayValueService dayValueService
    def springSecurityService

    static responseFormats = ['json', 'xml']

    @Secured(value = ['ROLE_USER', 'ROLE_ADMIN'], httpMethod = 'GET')
    def index(Long id) {
        [dayValues: dayValueService.getAll(id)]
    }
}
