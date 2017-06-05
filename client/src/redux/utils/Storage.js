import { APPLICATION_NAME } from '../../config';

export function getToken(storage) {
  return storage.user.get('access_token');
}

export function storeData(key, data) {
  localStorage.setItem(`${APPLICATION_NAME}_${key}`, JSON.stringify(data));
  localStorage.setItem(`${APPLICATION_NAME}_${key}_created`, new Date().getTime());
}

export function extractData(key) {
  const storedData = localStorage.getItem(`${APPLICATION_NAME}_${key}`);
  return storedData ? JSON.parse(storedData) : {};
}

export function isDataStored(key) {
  const dataCreated = localStorage.getItem(`${APPLICATION_NAME}_${key}_created`);
  const today = new Date();
  if(today - dataCreated >= 86390000) {
    deleteData(key);
  }
  const storedData = localStorage.getItem(`${APPLICATION_NAME}_${key}`);
  return storedData !== null;
}

export function deleteData(key) {
  localStorage.removeItem(`${APPLICATION_NAME}_${key}`);
  localStorage.removeItem(`${APPLICATION_NAME}_${key}_created`);
}
