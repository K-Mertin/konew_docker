#!/bin/sh
# create stop files
command="touch /home/tester/konew_docker/Batch/data/process.stop"
echo $command
$command

command="docker restart seleniumChrome"
echo $command
$command
