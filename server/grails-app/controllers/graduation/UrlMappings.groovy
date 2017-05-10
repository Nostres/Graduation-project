package graduation

import org.hibernate.service.spi.ServiceException

class UrlMappings {

    static mappings = {
//        "/$controller/$action?/$id?(.$format)?"{
//            constraints {
//                // apply constraints here
//            }
//        }
        get "/getAll"(controller: 'application', action: 'getAll')
        get "/clearAll"(controller: 'application', action: 'clearAll')
        post "/add"(controller: 'application', action: 'add')
        post "/upload"(controller: 'application', action: 'upload')
        post "/doCalculations"(controller: 'math', action: 'doCalculations', parseRequest: true)

        "/"(controller: 'application', action: 'index')
        "500"(controller: 'application', action: 'handleServiceException', exception: ServiceException)
        "404"(view: '/notFound')
    }
}
