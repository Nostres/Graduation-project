package graduation

class DayValue {

    Date date
    Double value
    Double temp

    static belongsTo = [file: DataFile]

    static constraints = {
        temp nullable: true
        file nullable: false
    }
}
