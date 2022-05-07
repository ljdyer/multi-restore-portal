const process = require('process')

const axios = require('axios')
const qs = require('qs')

const handler = async function (event) {

  MODEL2_KEY = process.env.MODEL2_KEY
  model = event.body;
  if (model == 'model2'){
    key = process.env.MODEL2_KEY
  } else if (model == 'model5'){
    key = process.env.MODEL5_KEY
  }
  return {
    statusCode: 200,
    body: key
  }
}

module.exports = { handler }
