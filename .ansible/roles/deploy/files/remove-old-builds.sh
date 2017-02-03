#!/bin/bash

if [ -z $1 ]; then
  echo "Please specify a directory to clean";
  exit 1;
fi

if [ ! -d $1 ]; then
  echo "Directory $1 does not exist";
  exit 1;
fi

cd $1;

count=`ls -ld */ | grep -v origin | wc -l`

if [ 11 -gt $count ]; then
  echo "Not enough directories to clean"
  exit 0;
fi

remove=$((count - 5))
`ls -trd */ | head -$remove | xargs rm -rf`