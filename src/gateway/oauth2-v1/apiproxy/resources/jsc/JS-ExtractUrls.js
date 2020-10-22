'use strict'
/* globals context */

var groupsUrl = context.getVariable('flow.idp.user.groups');

print('groupsUrl: ' + groupsUrl);

context.setVariable('groupsUrl', groupsUrl.substring(8));