#!/bin/sh
#start batch
command="docker start batch_batch_new_1 batch_batch_mod_1 batch_batch_fail_1"
echo $command
$command

#remove stop file
command="rm /home/tester/konew_docker/Batch/data/process.stop"
echo $command
$command
