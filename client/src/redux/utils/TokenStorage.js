export function getToken(storage) {
  return storage.user.get('access_token');
}