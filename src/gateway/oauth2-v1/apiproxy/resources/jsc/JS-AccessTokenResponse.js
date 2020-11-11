'use strict';
/* globals context */

var responseContent = {
    id_token: context.getVariable('flow.id_token'),
    access_token: context.getVariable('flow.jwt'),
    expires_in: context.getVariable('idp.expires_in'),
    token_type : "Bearer"
};

context.setVariable('response.header.Content-Type', 'application/json');
context.setVariable('response.content', JSON.stringify(responseContent, null, 4));