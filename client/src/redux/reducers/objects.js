import { fromJS } from 'immutable';

const INSERT_OBJECT = 'common/INSERT_OBJECT';
const DELETE_OBJECT = 'common/DELETE_OBJECT';

const initialState = fromJS({});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INSERT_OBJECT:
      return state.set(`${action.name}`, action.object);
    case DELETE_OBJECT: {
      return state.delete(`${action.name}`);
    }
    default:
      return state;
  }
}

export function insertObjectToStore(name, object) {
  return {
    type: INSERT_OBJECT,
    name,
    object
  }
}

export function deleteObjectFromStore(name) {
  return {
    type: DELETE_OBJECT,
    name
  }
}

export function isObjectInStore(globalStore, name) {
  return globalStore.objects.get(`${name}`) !== undefined;
}