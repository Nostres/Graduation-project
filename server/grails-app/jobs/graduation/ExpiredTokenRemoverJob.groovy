package graduation

class ExpiredTokenRemoverJob {
    static triggers = {
        cron name: 'ExpiredTokenRemover', cronExpression: '0 0 0/1 * * ?'
    }

    static final TOKEN_LIFE_TIME = 86400000

    def execute() {
        AuthenticationToken.executeUpdate('delete AuthenticationToken a where a.dateCreated < ?', [new Date(new Date().time - TOKEN_LIFE_TIME)])
    }
}
