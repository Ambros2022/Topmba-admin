export default {
  meEndpoint: 'auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'x-access-token',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
