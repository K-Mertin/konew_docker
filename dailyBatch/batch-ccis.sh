#!/bin/sh
# create stop files
command="docker run --rm  batch_batch python ccis.py"
echo $command
$command
