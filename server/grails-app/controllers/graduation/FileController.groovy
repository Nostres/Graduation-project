package graduation

import grails.core.GrailsApplication
import grails.plugin.springsecurity.annotation.Secured
import grails.plugins.GrailsPluginManager
import grails.plugins.PluginManagerAware
import org.hibernate.service.spi.ServiceException

class FileController implements PluginManagerAware {

    GrailsApplication grailsApplication
    GrailsPluginManager pluginManager
    FileService fileService

    def springSecurityService

    static responseFormats = ['json', 'xml']

    @Secured(value = ['ROLE_USER', 'ROLE_ADMIN'], httpMethod = 'GET')
    def index() {
        User user = springSecurityService.isLoggedIn() ? springSecurityService.loadCurrentUser() : null
        [files: fileService.getFiles(user)]
    }

    @Secured(value = ['ROLE_USER', 'ROLE_ADMIN'], httpMethod = 'DELETE')
    def delete() {
        Long id = request.JSON['id'] as Long
        fileService.deleteFile(id)
        render(view: 'successOperation', model: [message: 'File deleted successful!'])
    }

    @Secured(value = ['ROLE_USER', 'ROLE_ADMIN'], httpMethod = 'POST')
    def upload() throws ServiceException {
        User user = springSecurityService.isLoggedIn() ? springSecurityService.loadCurrentUser() : null
        fileService.addDataFromStream(user, request)
        render(view: 'successOperation', model: [message: 'File uploaded successful!'])
    }

    def handleServiceException(ServiceException e) {
        def map = [message: e.message]
        response.status = 500
        render (view: 'serviceException', model: map)
    }
}
