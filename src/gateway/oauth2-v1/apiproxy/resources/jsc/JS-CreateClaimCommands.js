'use strict';
/* globals context print */

var authorizeRequest = JSON.parse(context.getVariable('flow.authorize_request'));

var userGroups = context.getVariable('flow.idp.user.groups')
    ? JSON.parse(context.getVariable('userGroupsResponse.content'))
    : [];

var commands = {
    'commands': []
};
var groups = [];
userGroups.forEach(function (userGroup) {
    print('user group name: '.concat(userGroup.profile.name));
    groups.push(userGroup.profile.name);
});

var commands = {
    "commands": [
        {
            "type": "com.okta.identity.patch",
            "value": [
                {
                    "op": "add",
                    "path": "/claims/assign_to",
                    "value": groups.join(', ')
                }
            ]
        },
        {
            "type": "com.okta.access.patch",
            "value": [
                {
                    "op": "add",
                    "path": "/claims/assign_to",
                    "value": groups.join(', ')
                }
            ]
        }

    ]
};

context.setVariable('response.header.Content-Type', 'application/json');
context.setVariable('response.content', JSON.stringify(commands, null, 4));
