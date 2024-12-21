const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
     
async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()

    const prediction = model.predict(tensor); 
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ['Cancer','Non-cancer'];
  

    let lable;
    if(confidenceScore >50){
    lable = classes[0];
    } 
    else {
    lable = classes[1];
    }
  
    let suggestion;
    if (lable === 'Cancer') {
      suggestion = "Segera periksa ke dokter!"
    }
  
    if (lable === 'Non-cancer') {
      suggestion = "Penyakit kanker tidak terdeteksi."
    } 
    return { lable, suggestion };
  } catch (error) {
    throw new InputError("Terjadi kesalahan dalam melakukan prediksi")
  }

}
 
module.exports = predictClassification;