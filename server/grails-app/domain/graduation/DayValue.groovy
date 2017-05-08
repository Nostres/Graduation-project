package graduation

class DayValue {

    Date date
    Double value
    Double temp

    static belongsTo = [Data]

    static constraints = {
        temp nullable: true
    }
}
