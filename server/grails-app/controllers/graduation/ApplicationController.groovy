package graduation

import grails.core.GrailsApplication
import grails.plugins.*
import org.hibernate.service.spi.ServiceException

class ApplicationController implements PluginManagerAware {

    GrailsApplication grailsApplication
    GrailsPluginManager pluginManager
    ChartService chartService

    def index() {
        [grailsApplication: grailsApplication, pluginManager: pluginManager]
    }

    def clearAll() {
        chartService.clearAllData()
        respond([:], status: 200)
    }

    def add() {
        chartService.addValue(request.JSON['value'] as Double)
        respond([:], status: 200)
    }

    def getAll() {
        [dayValues: chartService.getData()]
    }

    def upload() throws ServiceException {
        chartService.addDataFromStream(request)
        def map = [dayValues: chartService.getData()]
        render (view: 'getAll', model: map)
    }

    def handleServiceException(ServiceException e) {
        def map = [message: e.message]
        response.status = 500
        render (view: 'serviceException', model: map)
    }
}
