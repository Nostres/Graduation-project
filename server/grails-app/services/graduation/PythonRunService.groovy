package graduation

import grails.transaction.Transactional
import groovyx.net.http.HTTPBuilder
import static groovyx.net.http.ContentType.JSON

@Transactional
class PythonRunService {

    static def sendToMathServer(def body, String goal) {
        String url = "http://localhost:5000/calc/$goal"
        HTTPBuilder http = new HTTPBuilder(url)
        return http.post(body: body, requestContentType: JSON)
    }
}
