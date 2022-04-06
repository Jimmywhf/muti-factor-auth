var net = require('net');
var port = 8008;
var host = '10.128.239.20';
var client= new net.Socket();

function wait(delay) {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
      // 使用  continue 实现；
      continue; 
  }
}

var data1 = {
    'target_ip': '10.0.0.1',
    'target_mac': 'xx:xx:xx:xx:xx:xx',
    'block_action': 'open'
    };

//创建socket客户端
client.setEncoding('binary');
//连接到服务端
client.connect(port,host,function(){
    var buf = Buffer.from(JSON.stringify(data1));
    client.write(buf);
    console.log("aaa");
    // while(true) {
    //     client.write(buf);
    //     console.log("aaa");
    //     wait(10000);
    // }
  //向端口写入数据到达服务端
});
client.on('data',function(data){
    console.log(data);
    var getdata = JSON.parse(data);
    console.log(getdata['code']);
    client.end();
  //得到服务端返回来的数据
});
client.on('error',function(error){
//错误出现之后关闭连接
  console.log('error:'+error);
  // client.destory();
});
client.on('close',function(){
//正常关闭连接
  console.log('Connection closed');
});