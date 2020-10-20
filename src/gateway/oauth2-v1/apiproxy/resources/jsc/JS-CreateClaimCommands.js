'use strict';
/* globals context */

var authorizeRequest = JSON.parse(context.getVariable('flow.authorize_request'));

var commands = {
    "commands": [
        {
            "type": "com.okta.identity.patch",
            "value": [
                {
                    "op": "replace",
                    "path": "/claims/aud",
                    "value": authorizeRequest.client.client_id
                }
            ]
        },
        {
            "type": "com.okta.identity.patch",
            "value": [
                {
                    "op": "add",
                    "path": "/claims/alias",
                    "value": "Mariano Delgado"
                }
            ]
        },
        {
            "type": "com.okta.access.patch",
            "value": [
                {
                    "op": "add",
                    "path": "/claims/alias",
                    "value": "Mariano Delgado"
                }
            ]
        }
    ]
};


context.setVariable('response.content', JSON.stringify(commands, null, 4));
context.setVariable('response.content', JSON.stringify({
    "commands": [
        {
            "type": "com.okta.identity.patch",
            "value": [
                {
                    "op": "replace",
                    "path": "/claims/aud",
                    "value": authorizeRequest.client.client_id + ''
                }
            ]
        },
        {
            "type": "com.okta.access.patch",
            "value": [
                {
                    "op": "add",
                    "path": "/claims/external_guid",
                    "value": "F0384685-F87D-474B-848D-2058AC5655A7"
                }
            ]
        }
    ]
}, null, 4));
context.setVariable('response.header.Content-Type', 'application/json');