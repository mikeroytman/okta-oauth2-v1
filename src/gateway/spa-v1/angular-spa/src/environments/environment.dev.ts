export const environment = {
  production: true,
  local: false,
  oidc: {
    baseUrl: '${okta.baseUrl}',
    tokenUrl: '${okta.tokenUrl}',
    authorizeUrl: '${okta.authorizeUrl}',
    logoutUrl: '${okta.logoutUrl}',
    revokeUrl: '${okta.revokeUrl}',
    postLogoutRedirectUri: '${okta.logoutRedirectUri}',
    clientId: '${okta.clientId}',
    issuer: '${okta.issuer}',
    redirectUri: '${okta.redirectUri}',
    scopes: ['openid', 'profile', 'email'],
    responseType: ['code'],
    pkce: true,
    verifyUrl: '${apigee.verifyUrl}',
    testing: {
      disableHttpsCheck: false
    },
    ignoreSignature:true
  },
  baseURL: '${proxy.protected-endpoint-v1.baseUrl}'
};
