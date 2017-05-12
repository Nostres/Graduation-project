import {SERVER_URL} from '../../config';

export function callAPIMiddleware({dispatch, getState}) {
  return next => action => {
    const {types, request} = action;

    if (!types) {
      // Normal action: pass it on
      return next(action)
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    let body;
    if (request.payload) {
      body = typeof request.payload !== 'string' ? JSON.stringify(request.payload) : request.payload;
    } else if (request.file) {
      body = request.file !== null ? request.file : null;
    }

    const options = {
      method: request.method,
      headers: request.headers !== null ? request.headers : request.method === 'POST' ? {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      } : null,
      body
    };

    const [requestType, successType, failureType] = types;

    dispatch({payload: request.payload, type: requestType});

    return fetch(`${SERVER_URL}${request.url}`, options)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          return response.json()
            .then(res => {
              let error = new Error(response.statusText);
              error.response = res;
              throw error;
          })
        }
      })
      .then(response => response.json())
      .then(response => {
        return next({type: successType, payload: response})
      })
      .catch(error => next({type: failureType, payload: { ...error.response, type: 'danger'}}))
  }
}
