import { APPLICATION_NAME } from '../../config';

export function getToken(storage) {
  return storage.user.get('access_token');
}

export function storeData(key, data) {
  localStorage.setItem(`${APPLICATION_NAME}_${key}`, JSON.stringify(data));
}

export function extractData(key) {
  const storedData = localStorage.getItem(`${APPLICATION_NAME}_${key}`);
  return storedData ? JSON.parse(storedData) : {};
}

export function checkData(key) {
  const storedData = localStorage.getItem(`${APPLICATION_NAME}_${key}`);
  return storedData !== null || storedData !== undefined || storedData !== '';
}

export function deleteData(key) {
  localStorage.removeItem(`${APPLICATION_NAME}_${key}`);
}
