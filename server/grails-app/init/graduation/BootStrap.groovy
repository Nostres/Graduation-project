package graduation

class BootStrap {

    def init = { servletContext ->
        def userRole = new Role(authority: 'ROLE_USER').save flush: true
        def adminRole = new Role(authority: 'ROLE_ADMIN').save flush: true
        def admin = new User(username: 'admin', password:'111').save flush:true
        UserRole.create admin, adminRole
    }
    def destroy = {
    }
}
