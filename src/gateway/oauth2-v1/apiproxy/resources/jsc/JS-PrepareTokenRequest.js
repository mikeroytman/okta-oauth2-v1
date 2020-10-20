'use strict';
/* globals context */

var authorizeRequest = JSON.parse(context.getVariable('flow.authorize_request'));

var idp_client_id = authorizeRequest.idp.client_id;
var idp_code = authorizeRequest.idp.code;
var idp_redirect_uri = authorizeRequest.idp.redirect_uri;
var idp_code_verifier = context.getVariable('request.formparam.code_verifier');

context.setVariable('flow.idp.client_id', idp_client_id);
context.setVariable('flow.idp.code', idp_code);
context.setVariable('flow.idp.redirect_uri', idp_redirect_uri);
context.setVariable('flow.idp.grant_type', 'authorization_code');
context.setVariable('flow.idp.code_verifier', idp_code_verifier);