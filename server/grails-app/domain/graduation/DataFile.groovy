package graduation

class DataFile {

    Date create
    Date update
    String name
    String description

    static belongsTo = [user: User]

    static constraints = {
        user nullable: false
        description nullable: true
    }
}
