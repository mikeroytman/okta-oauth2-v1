'use strict';
/* globals context */

var url = new Url();

var proxyRequest = url.parse(context.getVariable('proxy.url'));

var authorizeUrl = url.parse('${target.okta.baseUrl}/authorize');

var okta_scopes = ['openid', 'profile', 'email'];

for (var param in proxyRequest.queryparams) {
    authorizeUrl.queryparams[param] = proxyRequest.queryparams[param];
}

var scopes = authorizeUrl.queryparams['scope'].split(' ');
var i;
var new_scopes = [];
for (i = 0; i < scopes.length; i++) {
    var scope = scopes[i];
    if (okta_scopes.indexOf(scope) >= 0) {
        new_scopes.push(scope);
    }
}

authorizeUrl.client = {
    state: authorizeUrl.queryparams['state'],
    scope: authorizeUrl.queryparams['scope'],
    code_challenge: authorizeUrl.queryparams['code_challenge'],
    code_challenge_method: authorizeUrl.queryparams['code_challenge_method'],
    redirect_uri: authorizeUrl.queryparams['redirect_uri'],
    client_id: authorizeUrl.queryparams['client_id']
};

var state = randomString(40);
authorizeUrl.idp = {
    state: state,
    client_id: '${target.okta.clientId}',
    redirect_uri: '${target.okta.redirectUri}',
    scope: new_scopes.join(' ')
};


authorizeUrl.queryparams['state'] = state;
authorizeUrl.queryparams['client_id'] = '${target.okta.clientId}';
authorizeUrl.queryparams['redirect_uri'] = '${target.okta.redirectUri}';
authorizeUrl.queryparams['scope'] = new_scopes.join(' ');

context.setVariable('flow.cache.key', state);
context.setVariable('flow.authorize_url', url.build(authorizeUrl));
context.setVariable('flow.authorize_request', JSON.stringify(authorizeUrl));

