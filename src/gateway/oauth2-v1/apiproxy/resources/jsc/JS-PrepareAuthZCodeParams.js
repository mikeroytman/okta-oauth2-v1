'use strict';
/* globals context */

var authorizeRequest = JSON.parse(context.getVariable('flow.authorize_request'));

authorizeRequest.idp.code = context.getVariable('request.queryparam.code');


var state = authorizeRequest.client.state;
var scope = authorizeRequest.client.scope;
var clientId = authorizeRequest.client.client_id;

context.setVariable('flow.client_id', clientId);
context.setVariable('flow.state', state);
context.setVariable('flow.redirect_uri', authorizeRequest.queryparams['redirect_uri']);
context.setVariable('flow.response_type', 'code');


context.setVariable('request.queryparam.response_type', 'code');
// context.setVariable("request.queryparam.scope", authorizeRequest.client.scope || '');
context.setVariable('request.queryparam.redirect_uri', authorizeRequest.client.redirect_uri);
context.setVariable('request.queryparam.state', authorizeRequest.client.state);
context.setVariable('request.queryparam.client_id', authorizeRequest.client.client_id);
context.setVariable("request.queryparam.username", 'the_one_from_id_token');
context.setVariable("request.verb", 'GET');

context.setVariable('flow.authorize_request', JSON.stringify(authorizeRequest));