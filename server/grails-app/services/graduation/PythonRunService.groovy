package graduation

import grails.transaction.Transactional

@Transactional
class PythonRunService {

    def execute(List<Double> sample, String goal) {
        List<Double> result = []
        String s = null
        try {
            String[] callAndArgs = [
                    "python",
                    "${System.getProperty('user.dir')}/grails-app/python/${goal}.py".toString(),
                    sample
            ]

            Process p = Runtime.getRuntime().exec(callAndArgs)
            BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()))
            BufferedReader stdError = new BufferedReader(new InputStreamReader(p.getErrorStream()))

            while ((s = stdInput.readLine()) != null) {
                result = s.substring(1, s.length() - 1).split(",").collect({ it as Double })
            }
            while ((s = stdError.readLine()) != null) {
                System.out.println(s)
            }
        } catch (IOException e) {
            System.out.println("exception occured")
            e.printStackTrace()
        }
        return result
    }
}