package graduation

import grails.transaction.Transactional
import org.hibernate.service.spi.ServiceException

import javax.servlet.http.HttpServletRequest

@Transactional
class FileService {

    DayValueService dayValueService

    List<DataFile> getFiles(User user) {
        DataFile.findAllByUser(user)
    }

    void deleteFile(Long id) {
        def dataFile = DataFile.get(id)
        List<DayValue> values = DayValue.findAllByFile(dataFile)
        values*.delete()
        dataFile.delete(flush: true, failOnError: true)
    }

    def addDataFromStream(User user, HttpServletRequest request) throws ServiceException {
        checkUser(user)
        checkFileType(request)

        String fileName = request.getHeader('name')
        String description = request.getHeader('description')
        Date currentDate = new Date()

        DataFile file = new DataFile(
                user: user,
                name: fileName,
                description: description,
                create: currentDate,
                update: currentDate
        ).save(flush: true, failOnError: true)

        dayValueService.addDayValueFromStream(file, request.inputStream)
    }

    private static checkFileType(HttpServletRequest request) throws ServiceException {
        if (request.getHeader('content-type') != 'text/csv') {
            throw new ServiceException('Incorrect file format')
        }
    }

    private static checkUser(User user) throws ServiceException {
        if (!user) {
            throw new ServiceException('User not found')
        }
    }
}
