const process = require('process')

const axios = require('axios')
const qs = require('qs')

const handler = async function (event) {

  model = event.body;
  if (model == 'model1'){
    key = process.env.MODEL1_KEY
  } else if (model == 'model2'){
    key = process.env.MODEL2_KEY
  } else if (model == 'model3'){
    key = process.env.MODEL3_KEY
  } else if (model == 'model5'){
    key = process.env.MODEL5_KEY
  }
  return {
    statusCode: 200,
    body: key
  }
}

module.exports = { handler }
