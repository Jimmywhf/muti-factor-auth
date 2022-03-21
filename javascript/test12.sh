# interfaceUrl="http://127.0.0.1:8888/api/post"
# interfaceUrl="http://192.168.229.129:2233/api/post"
interfaceUrl="http://10.112.15.59:2233/api/post"

# 传送的数据格式：
# type Record struct {
#     IpAddress string `json:"ipAddress"`
#     MacAddress string `json:"macAddress"`
#     CpuPhysicalCores string `json:"cpuPhysicalCores"`
#     InstructionSet string `json:"instructionSet"`
#     CpuSpeed string `json:"cpuSpeed"`
#     CpuVersion string `json:"cpuVersion"`
#     CpuRegisterInfo string `json:"cpuRegisterInfo"`
#     SystemMemorySize string `json:"systemMemorySize"`
#     SystemHardDiskSize string `json:"systemHardDiskSize"`
#     Imei string `json:"imei"`
#     Imsi string `json:"imsi"`
#     Iccid string `json:"iccid"`
#     BusinessPort string `json:"businessPort"`
# }

# set -- '{"ipAddress":"1","macAddress":"1","cpuPhysicalCores":"1","instructionSet":"1","cpuSpeed":"1","cpuVersion":"cpuVersion1","cpuRegisterInfo":"cpuRegisterInfo1","systemMemorySize":"systemMemorySize1","systemHardDiskSize":"systemHardDiskSize1","imei":"12345678","imsi":"12345678","iccid":"888888","businessPort":"688"}'


ip=`ifconfig -a|grep inet|grep -v 127.0.0.1|grep -v inet6|awk '{print $2}'|tr -d "addr:"​`
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

# feedback=$(wget -O- --post-data= '{\\\"name\\\":\\\"marshmallow\\\"}'--header='Content-Type:application/json' ${interfaceUrl})
# feedback=$(wget -O- --post-data="${big_data}" --header='Content-Type:application/json' ${interfaceUrl})
# echo ${feedback}

# echo $(wget --header="User-Agents: Chrome" --header="Content-Type: Application/json" --post-data='{"name":"marshmallow"}' http://127.0.0.1:8888/api/post)

# feedback=$(wget --header="User-Agents: Chrome" --header="Content-Type: Application/json" --post-data='{"name":"marshmallow"}' http://127.0.0.1:8888/api/post)
# for big_data in "$@"
# do
#     feedback=$(wget -O- --post-data="${big_data}" ${interfaceUrl})
#     echo ${feedback}
#     # echo ${big_data}
#     sleep 2
# done

# feedback=$(wget -O- --post-data=${big_data} ${interfaceUrl})
# echo ${feedback}