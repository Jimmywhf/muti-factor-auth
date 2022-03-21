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


big_datas=(\
# '{"query":""}' \
'{"ipAddress":"110.02.0.1","macAddress":"11:11:11:11:11:11","cpuPhysicalCores":"cpuPhysicalCores1","instructionSet":"instructionSet12","cpuSpeed":"cpuSpeed1","cpuVersion":"cpuVersion1","cpuRegisterInfo":"cpuRegisterInfo1","systemMemorySize":"systemMemorySize1","systemHardDiskSize":"systemHardDiskSize1","imei":"12345678","imsi":"12345678","iccid":"888888","businessPort":"688"}' \
# '{"ipAddress":"110.0.0.10","macAddress":"EE:EE:EE:EE:EE:EE","cpuPhysicalCores":"cpuPhysicalCores1","instructionSet":"instructionSet1","cpuSpeed":"cpuSpeed1","cpuVersion":"cpuVersion1","cpuRegisterInfo":"cpuRegisterInfo1","systemMemorySize":"systemMemorySize1","systemHardDiskSize":"systemHardDiskSize1","imei":"12345678","imsi":"12345678","iccid":"888888","businessPort":"688"}' \
# '{"ipAddress":"110.0.0.10","macAddress":"11:11:11:11:11:11","cpuPhysicalCores":"cpuPhysicalCores3","instructionSet":"instructionSet1","cpuSpeed":"cpuSpeed1","cpuVersion":"cpuVersion1","cpuRegisterInfo":"cpuRegisterInfo1","systemMemorySize":"systemMemorySize1","systemHardDiskSize":"systemHardDiskSize1","imei":"12345678","imsi":"12345678","iccid":"888888","businessPort":"688"}' \
)


# feedback=$(wget -O- --post-data= '{\\\"name\\\":\\\"marshmallow\\\"}'--header='Content-Type:application/json' ${interfaceUrl})
# feedback=$(wget -O- --post-data="${big_data}" --header='Content-Type:application/json' ${interfaceUrl})
# echo ${feedback}

# echo $(wget --header="User-Agents: Chrome" --header="Content-Type: Application/json" --post-data='{"name":"marshmallow"}' http://127.0.0.1:8888/api/post)

# feedback=$(wget --header="User-Agents: Chrome" --header="Content-Type: Application/json" --post-data='{"name":"marshmallow"}' http://127.0.0.1:8888/api/post)
for big_data in ${big_datas[@]}
do
    feedback=$(wget -O- --header="Content-Type: Application/json" --post-data=${big_data} ${interfaceUrl})
    echo ${feedback}
    # echo ${big_data}
    sleep 2
done