'use strict'
/* globals context */


var expiresIn = context.getVariable('okta.expires_in');
context.setVariable('flow.expires_in', Math.floor(expiresIn * 1000) + '');

var authorizeRequest = JSON.parse(context.getVariable('flow.authorize_request'));

context.setVariable('flow.client_id', authorizeRequest.client.client_id);