#!/bin/sh
#这个是提交的正式版本
interfaceUrl="http://10.112.15.59:2233/api/authDevice"
# interfaceUrl="http://127.0.0.1:2233/api/authDevice"

ip=`ifconfig -a|grep inet|grep -v 127.0.0.1|grep -v inet6|awk '{print $2}'|tr -d "addr:"​|awk 'NR==1{print $1}'`
mac=$(ip addr | grep 'state UP' -A2 | grep link | egrep -v '(127.0.0.1|inet6|docker)' | awk '{print $2}' | head -n 1)
cpuPhysicalCores=$(cat /proc/cpuinfo | grep processor |tail -n 1| awk '{print $3}')
instructionSet=$(cat /proc/cpuinfo | grep Features | head -n 1|awk '{$1=$2=""; print $0}')
cpuSpeed=$(cat /proc/cpuinfo | grep BogoMIPS | head -n 1|awk '{print $3}')

cpuVersion=$(cat /proc/cpuinfo | grep revision  | head -n 1|awk '{print $4}')

cpuRegisterInfo="0x00000000410fb520"

systemMemorySize=$(cat /proc/meminfo |grep MemTotal | awk '{print $2}')$(cat /proc/meminfo |grep MemTotal | awk '{print $3}')

systemHardDiskSize=$(df -h | grep /dev/root | awk '{print $2}')
imei="868034031518269"
imsi="460023192787105"
iccid="89860 0MFSS YYGXX XXXXP"
businessPort="100876"


big_data='{"ipAddress":"'$ip'","macAddress":"'$mac'","cpuPhysicalCores":"'$cpuPhysicalCores'","instructionSet":"'$instructionSet'","cpuSpeed":"'$cpuSpeed'","cpuVersion":"'$cpuVersion'","cpuRegisterInfo":"'$cpuRegisterInfo'","systemMemorySize":"'$systemMemorySize'","systemHardDiskSize":"'$systemHardDiskSize'","imei":"'$imei'","imsi":"'$imsi'","iccid":"'$iccid'","businessPort":"'$businessPort'"}'

echo "$big_data"

feedback=$(wget -O- --post-data="${big_data}" ${interfaceUrl})
echo ${feedback}
