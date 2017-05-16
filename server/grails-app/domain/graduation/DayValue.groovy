package graduation

class DayValue {

    Date date
    Double value
    Double degree

    static belongsTo = [file: DataFile]

    static constraints = {
        degree nullable: true
        date nullable: false
        value nullable: true
        file nullable: false
    }
}
