const process = require('process')

const axios = require('axios')
const qs = require('qs')

const handler = async function (event) {

  MODEL2_KEY = process.env.MODEL2_KEY
  MODEL_2_URL = 'https://model2-spaces.azurewebsites.net/api/restore'

  console.log(MODEL2_KEY)
  inputText = JSON.parse(event.body)
  console.log(inputText)
  sendData = JSON.stringify({
    input: inputText,
  });
  request = {
    method: 'POST',
    body: sendData,
    headers: {
      'x-functions-key': MODEL2_KEY
    }
  }
  console.log('got this far')

  try {
    const { data } = await axios.post(MODEL_2_URL, request)
    // refer to axios docs for other methods if you need them
    // for example if you want to POST data:
    //    
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    const { data, headers, status, statusText } = error.response
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data, '80085' }),
    }
  }
}

module.exports = { handler }
