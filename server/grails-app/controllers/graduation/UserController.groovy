package graduation


import grails.rest.*
import grails.converters.*
import grails.plugin.springsecurity.annotation.Secured

class UserController {
	static responseFormats = ['json', 'xml']

    UserService userService

    @Secured(['IS_AUTHENTICATED_ANONYMOUSLY'])
    def register() {
        String username = request.getHeader('username')
        String password = request.getHeader('password')
        [user: userService.addUser(username, password)]
    }
}
