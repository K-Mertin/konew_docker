#!/bin/sh
 
# Definded Dump Configuartion
rollingDays=7
dumpFilename="mongodb"
dumpTmpDir="/home/tester/mongodb/backup/tmp"
dockerTmpDir="/data/backup/tmp"
backupPath="/home/tester/mongodb/backup"
username="mertin"
password="mertin" 
database="konew"
 
#Start Dumpping.......
today=`date "+%Y-%m-%d"`
echo "Today: ${today}"
echo "Start Dumpping......."
 
# Make backup directory
if ! [ -d "${backupPath}" ] ; then
    echo "make dir : ${backupPath}"
    mkdir -p "${backupPath}"
fi
if ! [ -d "${dumpTmpDir}" ] ; then
    echo "make dir : ${dumpTmpDir}"
    mkdir -p $dumpTmpDir
fi
 
# Make parameter
dn=""
if [ "${username}" != "" ] && [ "${password}" != "" ] ; then
    dn="${dn} -u ${username} -p ${password}"
fi
if [ "${database}" != "" ] ; then
    dn="${dn} -d ${database}"
fi
 
# Run backup script
#rm -rf -R ${dumpTmpDir}
command="docker exec  db_konewdb_1 mongodump ${dn} -o ${dockerTmpDir}"
echo $command
$command
#if [ $? == 0 ] ; then
cd "${dumpTmpDir}"
command="tar -zcvf ${backupPath}/${dumpFilename}-${today}.tar.gz *"
echo $command
$command
find ${backupPath}/${dumpFilename}-* -mtime +${rollingDays} -exec rm -f {} \;
#fi
rm -rf -R ${dumpTmpDir}

