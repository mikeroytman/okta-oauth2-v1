'use strict'
/* Globals context */


var access_token = context.getVariable('flow.jwt');
context.setVariable('flow.access_token', access_token);

var id_token = JSON.parse(context.getVariable('jwt.JWT-DecodeIdToken.payload-json'));

var idToken = {};
Object.keys(id_token).forEach(function(claim) {
    idToken[claim] = id_token[claim];
});

var authorizeRequest = JSON.parse(context.getVariable('flow.authorize_request'));

context.setVariable('flow.sub', id_token.sub);
context.setVariable('flow.iss', id_token.iss);
context.setVariable('flow.aud', authorizeRequest.client.client_id)
context.setVariable('flow.jti', id_token.jti);
context.setVariable('flow.kid', context.getVariable('jwt.JWT-DecodeIdToken.decoded.header.kid'));

delete idToken.aud;
delete idToken.iat;
delete idToken.exp;
delete idToken.jti;
delete idToken.at_hash;

var sha256 = crypto.getSHA256();
sha256.update(access_token);
var atHash = sha256.digest();
atHash = hexToBytes(atHash);
atHash = bytesToBase64(atHash.splice(0, atHash.length / 2));
idToken.at_hash = atHash.replace(/\+/g, '-').replace(/\//g, '_').replace(/[=]+$/g, '');

context.setVariable('flow.additionalClaims', JSON.stringify(idToken));
context.setVariable('oauth_external_authorization_status', true);