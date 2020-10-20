'use strict';
/* globals context */

var url = new Url();

var authorizeRequest = JSON.parse(context.getVariable('flow.authorize_request'));

context.setVariable('flow.cache.key', context.getVariable('oauthv2authcode.OAuth2-MintAuthorizationCode.code'));
var redirectUri = url.parse(authorizeRequest.client.redirect_uri);
redirectUri.queryparams['code'] = context.getVariable('oauthv2authcode.OAuth2-MintAuthorizationCode.code');
redirectUri.queryparams['state'] = authorizeRequest.client.state;

authorizeRequest.apigee = {
    'code': context.getVariable('oauthv2authcode.OAuth2-MintAuthorizationCode.code'),
    'state': context.getVariable('oauthv2authcode.OAuth2-MintAuthorizationCode.state')
};

context.setVariable('flow.authorize_request', JSON.stringify(authorizeRequest));
context.setVariable('flow.client_callback_url', url.build(redirectUri));