package graduation

import grails.transaction.Transactional

@Transactional
class UserService {

    def addUser(String username, String password) {
        User user = new User([username: username, password: password])
        user.save(flush: true, failOnError: true)

        Role role = Role.findByAuthority('ROLE_USER')
        UserRole.create user, role

        return user
    }
}
