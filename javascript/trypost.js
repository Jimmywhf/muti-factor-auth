const axios = require('axios')

var interface = 'http://127.0.0.1:2233/api/queryDevice'
// var interface = 'http://127.0.0.1:2233/api/queryWarning';
// var interface = 'http://10.112.15.59:2233/api/queryWarning'
// var interface = 'http://10.112.15.59:2233/api/queryDevice'



axios
  .get(interface)
  .then(res => (console.log(res.data)))
  .catch(error => console.log(error));

// var interface = 'http://10.112.15.59:2233/api/queryWarning';
// var interface = 'http://127.0.0.1:2233/api/queryDevice'

// axios
//   .get(interface)
//   .then(res => (console.log(res.data)))
//   .catch(error => console.log(error))

// var interface = 'http://10.128.239.20:8008'
// var interface = 'http://127.0.0.1:2233/api/blockFlow'
// var interface = 'http://10.112.15.59:2233/api/blockFlow'

// axios
//   .post(interface, {
//   'target_ip': '10.128.215.188',
//   'target_mac': 'xx:xx:xx:xx:xx:xx',
//   'block_action': 'ACCEPT'
//   }).then(res => (console.log(res.data)))
//     .catch(error => console.log(error))
