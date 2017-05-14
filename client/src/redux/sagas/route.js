import { select } from 'redux-saga/effects';


export function* redirectToFiles (){
  let state = yield select();
  const router = state.objects.get('router');
  router.push('/files');
}

export function* redirectToLogin() {
  let state = yield select();
  const router = state.objects.get('router');
  const { routing } = state;
  let path = routing.locationBeforeTransitions.pathname;
  if(path !== '/login') {
    router.push('/login');
  }
}
