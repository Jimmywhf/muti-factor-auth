/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const express = require('express');
const path = require('path');
const res = require('express/lib/response');
const req = require('express/lib/request');

const moment = require('moment');
const { application } = require('express');
const listeningPort = '2233'
const blockFlowPort = ''
const axios = require('axios')


const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const ccpPath = path.resolve(__dirname, '..', 'connection-org1.json');


async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network1 = await gateway.getNetwork('channel01');
        const network2 = await gateway.getNetwork('channel02');


        // Get the contract from the network.
        const contract1 = network1.getContract('myccone');
        const contract2 = network2.getContract('mycctwo');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        // await contract.submitTransaction('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom');
        // var body = {"ipAddress":"110.0.0.1","macAddress":"11:11:11:11:11:11","cpuPhysicalCores":"cpuPhysicalCores1","instructionSet":"instructionSet1","cpuSpeed":"cpuSpeed1","cpuVersion":"cpuVersion1","cpuRegisterInfo":"cpuRegisterInfo1","systemMemorySize":"systemMemorySize1","systemHardDiskSize":"systemHardDiskSize1","imei":"12345678","imsi":"12345678","iccid":"888888","businessPort":"688"}

        // var result = await contract.submitTransaction('verify', body.ipAddress, body.macAddress, body.cpuPhysicalCores, body.instructionSet, body.cpuSpeed, 
        //                                                         body.cpuVersion, body.cpuRegisterInfo, body.systemMemorySize, body.systemHardDiskSize, 
        //                                                         body.imei, body.imsi, body.iccid, body.businessPort);
        // result = result.toString();
        // console.log(result);
        // 这里是主要逻辑
        app.post('/api/authDevice', async function(req, res){
            console.log("\n——————————————————————————————\n");
            // console.log(req.body.data);
            console.log('get information:', req.body);
            // res.json({result: "Connected Success!"});
            req.body = JSON.parse(Object.keys(req.body)[0]);
            console.log('get information:', req.body)
            try {
                let currentTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                var result = await contract1.submitTransaction('verify', req.body.ipAddress, req.body.macAddress, req.body.cpuPhysicalCores, req.body.instructionSet, req.body.cpuSpeed, req.body.cpuVersion, req.body.cpuRegisterInfo, req.body.systemMemorySize, req.body.systemHardDiskSize, req.body.imei, req.body.imsi, req.body.iccid, req.body.businessPort, currentTime);
                result = JSON.parse(result)
                res.json(result)
                // 检查插入结果
                var wrongDetail = "Wrong"
                for(var val in result) {
                    if(val == 'registrationTime') continue;
                    if(result[val] == 'false') {
                        wrongDetail += (" " + String(val));
                    }
                }
                // 检查出错误，将错误信息存储到拎一个channel按上去
                if(wrongDetail !== "Wrong"){
                    var warningResult = await contract2.submitTransaction('verify', currentTime, req.body.macAddress, req.body.ipAddress, wrongDetail);
                    console.log(warningResult)
                }

                // 以前的逻辑
                // result = result.toString();
                // console.log(result);
                // if (result.toString() == "Get A New Device!") {
                //     res.send("You insert a new device.")
                // }else{
                //     result = JSON.parse(result)
                //     for (var val in result){
                //         console.log(result[val]);
                //     }

                //     var sendMessage = "Wrong"
                //     for (var val in result){
                //         if (result[val] == "0") {
                //             sendMessage += (" " + String(val));
                //         }
                //     }
                //     sendMessage += "."
                //     if (sendMessage == "Wrong."){
                //         res.send("Your input is right!")
                //     }else{
                //         return res.send(sendMessage)
                //     }
                // }
            } catch(error) {
                console.error(error);
                res.send(String(error));
            }
            console.log('Transaction has been submitted');
            
        });

        app.get('/api/queryDevice', async function(req, res) {
            try {
                console.log("I get a GET request");
                var result = await contract1.submitTransaction('query');
                result = result.toString();
                res.send(result);
            } catch(error) {
                console.error(error);
                res.send(String(error));
            }
            
            // console.log('Transaction has been submitted');
        });


        //这里需要重新定义一个contract，因为需要在另一个channel上注册
        app.get('/api/queryWarning', async function(req, res) {
            try {
                console.log("I get a GET request to get WARNINGs");
                var result = await contract2.submitTransaction('query');
                result = result.toString();
                res.send(result);
            } catch(error) {
                console.error(error);
                res.send(String(error));
            }
            
            // console.log('Transaction has been submitted');
        });

        // 调用wpx的借口实现阻断功能
        app.post('/api/blockFlow', async function(req, res) {
            const inputIP = req.body["target_ip"];
            const action = req.body["block_action"];
            axios
            .post(blockFlowPort, {
                "ip": inputIP,
                "blocked": action
            })
            .then(resp => {
                if(resp.data.state == 1){
                    res.json({"block_flow_result": true});
                } else {
                    res.send({"block_flow_result": false});
                }  
            })
            .catch(error => console.log(error))
        })

        // async function getResult (contract, mainKey, value){
        //     var result = await contract.submitTransaction('verify', mainKey, value);
        //     result = result.toString();
        //     console.log(result);
        //     if (result == "Right Input!") {
        //         console.log("aaaaaaa");
        //     }else if (result == "Wrong Input!"){
        //         console.log("bbbbbb");
        //     }
        // }
        // await contract.submitTransaction('verify', 'device1', '0002');
        // console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        //await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
        
}

app.listen(listeningPort, () => {
    console.log('正在监听端口:'+listeningPort);
});
main();
