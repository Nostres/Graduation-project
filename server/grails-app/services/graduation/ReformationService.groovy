package graduation

import graduation.models.Conversion
import grails.transaction.Transactional

@Transactional
class ReformationService {

    private reformatList = { Integer d, List<Double> sample ->
        List<Double> result = []
        for (int i = d; i < sample.size(); i++) {
            def w = (sample.get(i) - sample.get(i - d)).round(2)
            result.add(w)
        }
        return result
    }

    private reformatAsSeasonal = { Map data, List<Double> sample ->
        Integer d = (data.get('D') as Integer) * (data.get('S') as Integer)
        return reformatList(d, sample)
    }

    private reformatAsOffSeason = { Map data, List sample ->
        Integer d = data.get('D') as Integer
        return reformatList(d, sample)
    }

    List reformat(Conversion conversion, List<Double> sample) {
        return "reformatAs${conversion.getFormula()}"(conversion.getData(), sample)
    }
}
