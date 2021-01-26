#! /bin/bash

ds=$(date +"%Y%m%d%H%M%S")
full_folder=/home/ubuntu/workspace/releases-fed/$ds

ssh website << SCRIPT
echo deploy to $full_folder
mkdir -p $full_folder
ls -lha /home/ubuntu/workspace/releases-fed
SCRIPT

cd build
rm *.gz
tar -czvf trendfund-fed.tar.gz ./*
scp trendfund-fed.tar.gz website:~/workspace/releases-fed/$ds/

ssh website << SCRIPT
cd /home/ubuntu/workspace/releases-fed/$ds
tar -xvf trendfund-fed.tar.gz
rm -rf trendfund-fed.tar.gz
ls -l
rm -rf /home/ubuntu/workspace/trendfund-fed
ln -s /home/ubuntu/workspace/releases-fed/$ds/ /home/ubuntu/workspace/trendfund-fed

ls -lha /home/ubuntu/workspace/releases-fed
ls -lha /home/ubuntu/workspace
SCRIPT
