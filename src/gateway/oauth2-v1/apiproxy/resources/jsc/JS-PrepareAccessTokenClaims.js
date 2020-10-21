'use strict'
/* globals context */

var access_token = JSON.parse(context.getVariable('jwt.JWT-DecodeAccessToken.payload-json'));

var accessToken = {};
Object.keys(access_token).forEach(function (claim) {
    accessToken[claim] = access_token[claim]
});

context.setVariable('flow.sub', accessToken.sub);
context.setVariable('flow.iss', accessToken.iss);
context.setVariable('flow.aud', accessToken.aud);
context.setVariable('flow.jti', accessToken.jti);
context.setVariable('flow.kid', context.getVariable('jwt.JWT-DecodeAccessToken.decoded.header.kid'));

delete accessToken.sub;
delete accessToken.iss;
delete accessToken.aud;
delete accessToken.exp;
delete accessToken.iat;
delete accessToken.jti;

context.setVariable('flow.additionalClaims', JSON.stringify(accessToken));
