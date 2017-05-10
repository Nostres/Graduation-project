package graduation

import grails.transaction.Transactional
import org.hibernate.service.spi.ServiceException

import javax.servlet.http.HttpServletRequest

@Transactional
class ChartService {

    def clearAllData() {
        DayValue.executeUpdate('delete from DayValue')
    }

    def addValue(Double value) {
        DayValue lastDayValue = DayValue.last()
        long date = lastDayValue ? lastDayValue.date.time : new Date().time
        long newDate = date + 86400000
        DayValue newDayValue = new DayValue(date: new Date(newDate), value: value)
        newDayValue.save(flush: true, failOnError: true)
    }

    def getData() {
        DayValue.findAll()
    }

    def addDataFromStream(HttpServletRequest request) throws ServiceException {
        checkFileType(request)
        clearAllData()
        String fileName = request.getHeader("name")
        request.inputStream.splitEachLine(',') { fields ->
            Long date = fields[0] as Long
            Double value = fields[1] as Double
            DayValue dayValue = new DayValue(date: new Date(date), value: value, degree: null, fileName: fileName)
            dayValue.save(flush: true, failOnError: true)
        }
    }

    private static checkFileType(HttpServletRequest request) throws ServiceException {
        if (request.getHeader('content-type') != 'text/csv') {
            throw new ServiceException('Incorrect file format')
        }
    }
}
