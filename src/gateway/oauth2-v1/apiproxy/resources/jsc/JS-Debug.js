'use strict';
/* globals context */

var flowContent = context.flow === 'PROXY_REQ_FLOW' ? 'request.content' : 'response.content';

var content = JSON.parse(context.getVariable(flowContent));

print('------------------------------ BEGIN ' + flowContent.toUpperCase() + ' ------------------------------');
print(JSON.stringify(content, null, 4));
print('------------------------------ END ' + flowContent.toUpperCase() + ' --------------------------------');

