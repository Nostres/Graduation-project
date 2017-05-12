import { select, call } from 'redux-saga/effects';


export function* redirectToFiles (){
  let state = yield select();
  const router = state.objects.get('router');
  router.push('/files');
}

export function* redirectToLogin() {
  let state = yield select();
  const router = state.objects.get('router');
  if(router) {
    router.push('/login');
  }
}
