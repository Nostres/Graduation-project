package graduation

class DataFile implements Serializable {

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
