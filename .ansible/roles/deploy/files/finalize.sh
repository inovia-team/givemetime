#!/bin/bash

phing -f $1/build.xml config
phing -f $1/build.xml update.translations
phing -f $1/build.xml rights.config
phing -f $1/build.xml cron

mkdir -p $2/shared/public/img/uploads
mkdir -p $2/data/log

rm -fr $1/public/img/uploads

ln -s $2/shared/public/img/uploads/ $1/public/img/
ln -s $2/shared/data/log $1/data/log

