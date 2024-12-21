const postPredictHandler = require('../server/handler');

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        maxBytes: 1000000,
        allow: 'multipart/form-data',
        multipart: true
      }
    }
  },
  {
    path : '/',
    method : 'GET',
    handler : () => 'hello world'
  }
]

module.exports = routes;