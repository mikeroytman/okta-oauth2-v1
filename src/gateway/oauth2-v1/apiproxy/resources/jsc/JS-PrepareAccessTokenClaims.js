'use strict'
/* globals context */

// Sample response
// var responseContent = {
//     "refresh_token_expires_in" : "0",
//     "refresh_token_status" : "approved",
//     "api_product_list" : "[oktademo-oauth2-v1-product-isaias]",
//     "api_product_list_json" : [ "oktademo-oauth2-v1-product-isaias" ],
//     "organization_name" : "bcbsa-nonprod",
//     "developer.email" : "oktademo-oauth2-v1-developer-isaias@example.com",
//     "token_type" : "BearerToken",
//     "issued_at" : "1605025237302",
//     "client_id" : "T1AzMaG3bLQcrZ4sAHWiX3mvVanEVCVf",
//     "access_token" : "8dbHwSlz9zb7KzLci3ArRfV1DZup",
//     "refresh_token" : "d09DJC1hgEoudzG9xqGUI273JF6PmR4B",
//     "application_name" : "97a2c088-05b3-48b8-b6a3-26e22eb6d1e6",
//     "scope" : "",
//     "refresh_token_issued_at" : "1605025237302",
//     "expires_in" : "3599",
//     "refresh_count" : "0",
//     "status" : "approved",
//     "username" : "the_one_from_id_token"
// };

var responseContent = JSON.parse(context.getVariable('response.content'));
var access_token = JSON.parse(context.getVariable('jwt.JWT-DecodeAccessToken.payload-json'));

var accessToken = {
    id_token: context.getVariable('flow.jwt')
};

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

var excludedClaims = [
    "assign_to", "sub", "iss", "aud", "exp", "iat", "jti"
];

excludedClaims.forEach(function(claim) {
    delete accessToken[claim];
});
accessToken.access_token = responseContent.access_token;
accessToken.groups = [
    "Everyone",
    "010 - AL Blue Cross and Blue Shield of Alabama",
    "020 - AR Arkansas Blue Cross and Blue Shield",
    "030 - AZ Blue Cross and Blue Shield of Arizona",
    "040 - CA Blue Cross of California",
    "070 - DE Blue Cross Blue Shield of Delaware",
    "089 - Medi Carefirst AdvantageBlue PFFS",
    "090 - FL Blue Cross and Blue Shield of Florida",
    "101 - GA Blue Cross and Blue Shield of Georgia",
    "110 - ID Blue Cross of Idaho Health Service",
    "140 - IA Wellmark Blue Cross and Blue Shield of Iowa",
    "141 - SD Wellmark Blue Cross and Blue Shield of South Dakota",
    "150 - KS Blue Cross and Blue Shield of Kansas",
    "170 - LA Blue Cross and Blue Shield of Louisiana",
    "192 - MD CareFirst Administrators",
    "200 - MA Blue Cross and Blue Shield of Massachusetts",
    "210 - MI Blue Cross and Blue Shield of Michigan",
    "220 - MN Blue Cross and Blue Shield of Minnesota",
    "230 - MS Blue Cross & Blue Shield of Mississippi",
    "240 - MO Blue Cross and Blue Shield of Kansas City",
    "241 - MO Blue Cross and Blue Shield of Missouri",
    "250 - MT Blue Cross and Blue Shield of Montana",
    "260 - NE Blue Cross and Blue Shield of Nebraska",
    "280 - NJ Horizon Blue Cross and Blue Shield of New Jersey Inc.",
    "290 - NM New Mexico Blue Cross and Blue Shield",
    "301 - NY Blue Cross & Blue Shield of Western New York",
    "303 - NY Empire Blue Cross and Blue Shield",
    "304 - NY BlueCross BlueShield of the Rochester Area",
    "305 - NY BlueCross and BlueShield of Central New York",
    "306 - NY BlueCross BlueShield of Utica Watertown",
    "310 - NC Blue Cross and Blue Shield of North Carolina",
    "320 - ND BlueCross BlueShield of North Dakota",
    "340 - OK Blue Cross and Blue Shield of Oklahoma",
    "350 - OR Regence BlueCross BlueShield of Oregon",
    "361 - PA Capital Blue Cross",
    "362 - PA Independence Blue Cross",
    "363 - PA Highmark Blue Cross and Blue Shield",
    "364 - PA Blue Cross of Northeastern Pennsylvania",
    "370 - RI Blue Cross & Blue Shield of Rhode Island",
    "377 - PA Highmark Health Insurance Company",
    "378 - PA Highmark Blue Shield"
];

context.setVariable('flow.id_token', context.getVariable('flow.jwt'));
context.setVariable('flow.additionalClaims', JSON.stringify(accessToken));
context.setVariable('flow.access_token', responseContent.access_token);