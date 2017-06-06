package graduation

class DayValue {

    Date date
    Double value
    Double degree
    Double valueForecast
    Double degreeForecast
    Double noiseForecast

    static belongsTo = [file: DataFile]

    static constraints = {
        degree nullable: false
        date nullable: false
        value nullable: false
        valueForecast nullable: true
        degreeForecast nullable: true
        noiseForecast nullable: true
        file nullable: false
    }
}
