import { SERVER_URL } from '../../config';

export default function sendRequest(url, options) {
  return fetch(`${SERVER_URL}${url}`, options)
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
    .then(response => {
      const type = response.headers.get("content-type");
      if (type && type.toLowerCase().indexOf('json') > -1) {
        return response.json();
      } else {
        return response;
      }
    })
}
