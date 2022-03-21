const axios = require('axios')

var interface = 'http://127.0.0.1:2233/api/queryDevice'
// var interface = 'http://10.112.15.59:2233/api/queryDevice'


axios
  .get(interface)
  .then(res => (console.log(res.data)))
  .catch(error => console.log(error));

// var interface = 'http://10.112.15.59:2233/api/queryWarning';
// // var interface = 'http://127.0.0.1:2233/api/queryDevice'

// axios
//   .get(interface)
//   .then(res => (console.log(res.data)))
//   .catch(error => console.log(error))
