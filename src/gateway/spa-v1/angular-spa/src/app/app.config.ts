
// const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env;

export default {
  oidc: {
    baseUrl: '${okta.baseUrl}',
    clientId: '${okta.clientId}',
    issuer: '${okta.issuer}',
    redirectUri: '${okta.redirectUri}',
    scopes: ['openid', 'profile', 'email'],
    responseType: ['code'],
    pkce: true,
    testing: {
      disableHttpsCheck: false //`${OKTA_TESTING_DISABLEHTTPSCHECK}`
    }
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};
