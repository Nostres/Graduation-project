package graduation

import grails.core.GrailsApplication
import grails.plugins.*
import org.hibernate.service.spi.ServiceException
import grails.plugin.springsecurity.annotation.Secured

class ApplicationController implements PluginManagerAware {

    GrailsApplication grailsApplication
    GrailsPluginManager pluginManager
    ChartService chartService

    @Secured(['IS_AUTHENTICATED_ANONYMOUSLY'])
    def index() {
        [grailsApplication: grailsApplication, pluginManager: pluginManager]
    }

    def handleServiceException(ServiceException e) {
        def map = [message: e.message]
        response.status = 500
        render (view: 'serviceException', model: map)
    }
}
