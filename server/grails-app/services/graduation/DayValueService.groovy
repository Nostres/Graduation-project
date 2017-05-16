package graduation

import grails.transaction.Transactional

@Transactional
class DayValueService {

    def addDayValueFromStream(DataFile file, InputStream is) {
        is.splitEachLine(',') { fields ->
            Long date = fields[0] as Long
            Double value = fields[1] as Double
            DayValue newDayValue = new DayValue(file: file, date: new Date(date), value: value, temp: null)
            newDayValue.save(flush: true, failOnError: true)
        }
    }

    def getAll(Long id) {
        DataFile file = DataFile.get(id)
        DayValue.findAllByFile(file)
    }
}
