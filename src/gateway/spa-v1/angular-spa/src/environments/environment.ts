// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    local: true,
    oidc: {
        baseUrl: 'https://dev-296346.okta.com',
        tokenUrl: 'https://dev-296346.okta.com/oauth2/default/v1/token',
        authorizeUrl: 'https://dev-296346.okta.com/oauth2/default/v1/authorize',
        logoutUrl: 'https://dev-296346.okta.com/oauth2/default/v1/logout',
        revokeUrl: 'https://dev-296346.okta.com/oauth2/default/v1/revoke',
        postLogoutRedirectUri: 'http://localhost:4200/',
        clientId: '0oa5hesdrLCLjJGQP4x6',
        issuer: 'https://dev-296346.okta.com/oauth2/default',
        redirectUri: 'http://localhost:4200/callback',
        scopes: ['openid', 'profile', 'email'],
        responseType: ['code'],
        pkce: true,
        testing: {
            disableHttpsCheck: false //`${OKTA_TESTING_DISABLEHTTPSCHECK}`
        }
    },
    baseURL: 'https://httpbin.org/anything'
};
