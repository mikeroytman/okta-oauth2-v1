'use strict'
/* globals context */

if (!context.getVariable('flow.client_id')){
    var authorizeRequest = JSON.parse(context.getVariable('flow.authorize_request'));
    context.setVariable('flow.client_id', authorizeRequest.client.client_id);
} else {
    var expiresIn = context.getVariable('idp.expires_in');
    context.setVariable('flow.expires_in', Math.floor(expiresIn * 1000) + '');
    context.setVariable('flow.client_id', context.getVariable('verifyapikey.VAK-ClientId.client_id'));
    context.setVariable('flow.client_secret', context.getVariable('verifyapikey.VAK-ClientId.client_secret'));
    context.setVariable('request.formparam.client_id', context.getVariable('verifyapikey.VAK-ClientId.client_id'));
}