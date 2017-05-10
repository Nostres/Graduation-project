package graduation

class DayValue {

    String fileName

    Date date
    Double value
    Double degree

    static constraints = {
        degree nullable: true
        fileName nullable: false
        date nullable: false
        value nullable: true
    }
}
