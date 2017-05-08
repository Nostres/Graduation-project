package graduation

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

        "/"(controller: 'application', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
