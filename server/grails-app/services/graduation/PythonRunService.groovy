package graduation

import grails.transaction.Transactional

@Transactional
class PythonRunService {

    Map<String, List<Double>> execute(List<Double> sample) {
        List<List<Double>> result = []
        try {
            String s = null
            String[] callAndArgs = [
                    "python",
                    "/home/iborsuk/Home-Project/Graduation-project/server/grails-app/python/script.py",
                    sample
            ]

            Process p = Runtime.getRuntime().exec(callAndArgs)
            BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()))
            BufferedReader stdError = new BufferedReader(new InputStreamReader(p.getErrorStream()))

            while ((s = stdInput.readLine()) != null) {
                result.add(s.substring(1, s.length() - 1).split(",").collect({ it as Double }))
            }
            while ((s = stdError.readLine()) != null) {
                System.out.println(s)
            }
        } catch (IOException e) {
            System.out.println("exception occured")
            e.printStackTrace()
        }
        return [
                ACF : result.get(0),
                PACF: result.get(1)
        ]
    }
}