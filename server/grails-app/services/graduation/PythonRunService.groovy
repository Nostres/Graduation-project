package graduation

import grails.transaction.Transactional
import groovyx.net.http.HTTPBuilder
import static groovyx.net.http.ContentType.JSON

@Transactional
class PythonRunService {

    def sendToMathServer(List<Double> sample, String goal) {
        String url = "http://localhost:5000/calc/$goal"
        HTTPBuilder http = new HTTPBuilder(url)
        def res = http.post(body: sample, requestContentType: JSON)
        return res
    }
}
