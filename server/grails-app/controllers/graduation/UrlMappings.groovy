package graduation

import org.hibernate.service.spi.ServiceException

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }
//        get "/api/getAll"(controller: 'file', action: 'getAll')
//        get "/api/clearAll"(controller: 'file', action: 'clearAll')
//        post "/api/add"(controller: 'file', action: 'add')
//        post "/api/upload"(controller: 'file', action: 'upload')
//
//        post "/api/register"(controller: "user", action: "register")

        "/"(controller: 'application', action:'index')
        "500"(controller: 'application', action: 'handleServiceException', exception: ServiceException)
        "404"(view: '/notFound')
    }
}
