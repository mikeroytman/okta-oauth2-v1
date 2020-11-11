#!/usr/bin/env bash

export SSO_LOGIN_URL=https://bcbsa.login.apigee.com

echo "Login to https://bcbsa.login.apigee.com"
echo "Press enter once logged in"

read

google-chrome https://bcbsa.login.apigee.com/passcode

echo "Copy the temporary authentication code, and pasted if prompted"
read

export ACCESS_TOKEN=$(get_token -u iarellano@nearbpo.com)

echo $ACCESS_TOKEN