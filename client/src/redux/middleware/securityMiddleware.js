export function securityMiddleware({dispatch, getState}) {
  return next => action => {
    const xauth = getState().user.get('access_token');
    if(action.request !== undefined && xauth !== undefined) {
      if(action.request.headers) {
        action.request.headers = {...action.request.headers, 'X-Auth-Token': xauth};
      } else {
        action.request.headers = {'X-Auth-Token': xauth};
      }
    }
    next(action);
  }
}
