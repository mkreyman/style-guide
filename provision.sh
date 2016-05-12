#!/bin/bash

# CHANGE THIS URL FOR DIFF VERSIONS :::
# -----------------------------------------------------

JSURL=http://nodejs.org/dist/node-latest.tar.gz

# -----------------------------------------------------

clear

echo 'We are going to install NodeJS for you... '

echo 'checking if we got wget magic'
yum install -y wget #check if we have it

echo 'lets download nodejs..'

rm -r -f /usr/local/src
mkdir -p /usr/local/src
cd /usr/local/src

wget $JSURL

tar -zxvf ./node-latest.tar.gz

echo 'Files extracted....'

cd node-v*

yum install -y openssl-devel gcc-c++ make git

echo 'Configuring and installing NodeJS'

./configure
make
make install

echo 'NodeJS installed successfully'

clear

echo "PATH=$PATH:/usr/local/bin:./node_modules/.bin" >> $HOME/.bash_profile
echo "export PATH" >> $HOME/.bash_profile
source $HOME/.bash_profile

echo "Node is now installed @ version:"
node --version
