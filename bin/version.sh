#!/bin/bash

# get commit name from args
commit="$1"

# get commit prefix
commit_prefix="${commit%%:*}"

# check commit prefix
if [ "$commit_prefix" == "feat" ]; then
    npm version minor 
else
    npm version patch 
fi