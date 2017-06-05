// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'graduation.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'graduation.UserRole'
grails.plugin.springsecurity.authority.className = 'graduation.Role'
grails.plugin.springsecurity.securityConfigType = 'Annotation'

grails.plugin.springsecurity.filterChain.chainMap = [
		[pattern: '/api/**', filters:'JOINED_FILTERS,-anonymousAuthenticationFilter,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter'],
//		[pattern: '/**', filters:'JOINED_FILTERS,-restTokenValidationFilter,-restExceptionTranslationFilter']
		[pattern: '/**', filters: 'JOINED_FILTERS,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter']
]

grails.plugin.springsecurity.controllerAnnotations.staticRules = [
		[pattern: '/api/logout', access: ['isAuthenticated()']]
]

grails.plugin.springsecurity.rest.logout.endpointUrl = '/api/logout'
grails.plugin.springsecurity.rest.token.validation.useBearerToken = false
grails.plugin.springsecurity.rest.token.validation.headerName = 'X-Auth-Token'
grails.plugin.springsecurity.rest.token.validation.activated = true

//grails.plugin.springsecurity.rest.token.storage.memcached.hosts = 'localhost:11211'
//grails.plugin.springsecurity.rest.token.storage.memcached.username = ''
//grails.plugin.springsecurity.rest.token.storage.memcached.password = ''
//grails.plugin.springsecurity.rest.token.storage.memcached.expiration = 86400

grails.plugin.springsecurity.rest.token.storage.useGorm = true
grails.plugin.springsecurity.rest.token.storage.gorm.tokenDomainClassName = 'graduation.AuthenticationToken'
grails.plugin.springsecurity.rest.token.storage.gorm.tokenValuePropertyName = 'tokenValue'
grails.plugin.springsecurity.rest.token.storage.gorm.usernamePropertyName = 'username'