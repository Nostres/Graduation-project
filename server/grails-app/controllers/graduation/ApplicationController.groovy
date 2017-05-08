package graduation

import grails.core.GrailsApplication
import grails.plugins.*

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

    def upload() {
        chartService.addDataFromStream(request)
        [dayValues: chartService.getData()]
    }
}
