const fs = require("fs");
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', 'connection-org1.json');
const adminPemPath = path.resolve(__dirname, "..", "crypto-config", "peerOrganizations", "org1.example.com", "users", "Admin@org1.example.com", "msp", "tlscacerts", "tlsca.org1.example.com-cert.pem");
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

// 首先处理json文件中的秘钥
const data = fs.readFileSync(adminPemPath).toString('utf-8');
ccp.peers["peer0.org1.example.com"].tlsCACerts.pem = data;
ccp.certificateAuthorities["ca.org1.example.com"].tlsCACerts.pem = data;


let result = JSON.stringify(ccp)

fs.writeFile(ccpPath,result,"utf8",function (err, data1) {
    if(err){
        console.error(err);
    }
    else{
        console.log("修改成功！");
    }
})
