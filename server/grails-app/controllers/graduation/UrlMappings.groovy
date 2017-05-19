package graduation

import org.hibernate.service.spi.ServiceException

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        delete "/file/$id"(controller: 'file', parseRequest: true, action: 'delete')
        post "/file"(controller: 'file', action: 'upload')
        get "/file"(controller: 'file', action: 'index')
        get "/file/$id"(controller: 'dayValue', action: 'index', parseRequest: true)
        put "/file/$id"(controller: 'file', action: 'update')
        post "/math"(controller: 'math', action: 'doCalculations', parseRequest: true)

        "/"(controller: 'application', action:'index')
        "500"(controller: 'application', action: 'handleServiceException', exception: ServiceException)
        "404"(view: '/notFound')
    }
}
