#!/bin/bash

# Usage: ./archive dir1 dir2 where dir1 and dir2 are additionnal directories (ignored by git) that you want included in the archive
LBLUE="\033[1;34m"
YELLOW="\033[0;33m"
GREEN="\033[0;32m"
RESET="\033[0m"

archive=package.zip
parent=${0%/*}/..

cd $parent
for ARG in ${*:1}
do
    if [ ! -e $ARG ]; then
        echo -e "File or directory ${YELLOW}$ARG${RESET} not found. Exiting"
        exit
    fi
done

echo -e "Creating archive"
git archive -o ${archive} HEAD
echo -e "Archive ${LBLUE}${archive}${RESET} created"

echo "Adding vendors to archive"
zip --symlinks -r ${archive} ${*:1} -x *.git/* tests/*

echo -e "${GREEN}givemetime packaged successfully${RESET}"