#! /bin/bash
rm -rf wallet/*

node enrollAdmin.js
sleep 1

node registerUser.js
sleep 1

node testinvoke.js

# test and init
node trypost.js