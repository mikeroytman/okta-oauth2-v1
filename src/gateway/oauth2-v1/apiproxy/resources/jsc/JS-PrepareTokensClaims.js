'use strict'
/* Globals context */


var id_token = JSON.parse(context.getVariable('jwt.JWT-DecodeIdToken.payload-json'));
var access_token = JSON.parse(context.getVariable('jwt.JWT-DecodeAccessToken.payload-json'));

var idToken = {};
Object.keys(id_token).forEach(function(claim) {
    idToken[claim] = id_token[claim];
});

delete idToken.aud;
delete idToken.iat;
delete idToken.exp;
delete idToken.jti;
delete idToken.at_hash;


context.setVariable('idToken.additionalClaims', JSON.stringify(idToken));

var accessToken = {};
Object.keys(access_token).forEach(function (claim) {
    accessToken[claim] = access_token[claim]
});

context.setVariable('accessToken.additionalClaims', JSON.stringify(accessToken));

var idToken = {
    "sub": "00u593cuaygayhVcl4x6",
    "name": "Isaias Arellano",
    "email": "iarellano@nearbpo.com",
    "ver": 1,
    "iss": "https://dev-296346.okta.com/oauth2/default",
    "aud": "0oa5hesdrLCLjJGQP4x6",
    "iat": 1603227725,
    "exp": 1603231325,
    "jti": "ID.nrKZqLNv0eSCoLcmrhyFw4tD80PRzpP-uj4jEWBwfVw",
    "amr": [
        "pwd"
    ],
    "idp": "00o593cqzSm3MszEW4x6",
    "nonce": "WsCyo3JF06Y0e6vhwYDYw59xl3TBZxRC6B5NfEk20Bc0hk15QlcDeTSqtJeWKgHX",
    "preferred_username": "iarellano@nearbpo.com",
    "auth_time": 1603227723,
    "at_hash": "OYM9fAbeu0dpDXmIkVXQzA"
};