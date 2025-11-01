#!/bin/sh

echo Reading posts with anonymous user
curl localhost:3000/api/model/post/findMany
echo

echo Reading posts with user#1
curl -H "x-userid:1" localhost:3000/api/model/post/findMany
echo

echo Reading posts with user#2
curl -H "x-userid:2" localhost:3000/api/model/post/findMany
echo
