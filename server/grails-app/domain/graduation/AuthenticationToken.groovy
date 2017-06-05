package graduation

class AuthenticationToken {

    String tokenValue
    String username
    Date dateCreated = new Date()

    static mapping = {
        version false
    }

    static constraints = {
    }
}
