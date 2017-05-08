package graduation

class Data {

    Date create
    Date upadate
    String name
    String description

    static belongsTo = [User]

    static constraints = {
    }
}
