const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');

async function postPredictHandler ( request, h ) {
  const { image } = request.payload;
  const { model } = request.server.app;
  
  // console.log(image);

  const { lable, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();  
  const createdAt = new Date().toISOString();

  const data = {
    "id": id,
    "result": lable,
    "suggestion": suggestion,
    "createdAt": createdAt
  } 
  await storeData(id, data);
   
    
  
/*Kode disembunyikan*/
  // console.log(data);


  //storage limit
  // if(true){
  //   const response = h.response({
  //     status: "fail",
  //     message: "Payload content length greater than maximum allowed: 1000000"
  //   })
  //   response.code(413);
  // }
  // //errror formating etc
  // else if(true){
  //   const reponse = h.response({
  //     status: "fail",
  //     message: "Terjadi kesalahan dalam melakukan prediksi"
  //   })
  //   response.code(400);
  // }
  // if(cancer)

  // const storeData = require('../services/storeData');

  let response = h.response({
    status : 'success',
    message : 'your mom is gay'
  });

  if(lable === 'Cancer'){
    response = h.response({
      status : 'success',
      message : 'Model is predicted successfully',
      data:{
        id,
        lable,
        suggestion,
        createdAt
      }
    })
  }
  //not cancer
  else{
    response = h.response({
      status : 'success',
      message : 'Model is predicted successfully',
      data:{
        id,
        lable,
        suggestion,
        createdAt
      }
    })
  }
  response.code(201);

  // console.log(response);


  return response;
}

module.exports = postPredictHandler;
