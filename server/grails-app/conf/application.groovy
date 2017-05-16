// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'graduation.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'graduation.UserRole'
grails.plugin.springsecurity.authority.className = 'graduation.Role'
grails.plugin.springsecurity.securityConfigType = 'Annotation'

//grails.plugin.springsecurity.interceptUrlMap = [
//		[pattern: '/',               access: ['permitAll']],
//		[pattern: '/error',          access: ['permitAll']],
//		[pattern: '/index',          access: ['permitAll']],
//		[pattern: '/index.gsp',      access: ['permitAll']],
//		[pattern: '/shutdown',       access: ['permitAll']],
//		[pattern: '/assets/**',      access: ['permitAll']],
//		[pattern: '/**/js/**',       access: ['permitAll']],
//		[pattern: '/**/css/**',      access: ['permitAll']],
//		[pattern: '/**/images/**',   access: ['permitAll']],
//		[pattern: '/**/favicon.ico', access: ['permitAll']],
//		[pattern: '/api/user/**',    access: ['permitAll']],
//		[pattern: '/api/login',      access: ['permitAll']],
//		[pattern: '/api/logout',     access: ['isFullyAuthenticated()']],
//		[pattern: '/file/**',    	 access: ['ROLE_ADMIN', 'ROLE_USER']],
//		[pattern: '/**',             access: ['isFullyAuthenticated()']]
//]

grails.plugin.springsecurity.filterChain.chainMap = [
		[pattern: '/api/**', filters:'JOINED_FILTERS,-anonymousAuthenticationFilter,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter'],
//		[pattern: '/**', filters:'JOINED_FILTERS,-restTokenValidationFilter,-restExceptionTranslationFilter']
		[pattern: '/**', filters: 'JOINED_FILTERS,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter']
]

grails.plugin.springsecurity.rest.logout.endpointUrl = '/api/logout'
grails.plugin.springsecurity.rest.token.validation.useBearerToken = false
grails.plugin.springsecurity.rest.token.validation.headerName = 'X-Auth-Token'
grails.plugin.springsecurity.rest.token.storage.memcached.hosts = 'localhost:11211'
grails.plugin.springsecurity.rest.token.storage.memcached.username = ''
grails.plugin.springsecurity.rest.token.storage.memcached.password = ''
grails.plugin.springsecurity.rest.token.storage.memcached.expiration = 86400