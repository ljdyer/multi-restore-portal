const process = require('process')

const axios = require('axios')
const qs = require('qs')

const handler = async function (event) {

  MODEL2_KEY = process.env.MODEL2_KEY
  return {
    statusCode: 200,
    body: MODEL2_KEY,
  }
  // MODEL_2_URL = 'https://model2-spaces.azurewebsites.net/api/restore'
  // inputText = JSON.parse(event.body)
  // const sendData = JSON.stringify({
  //   input: inputText,
  // });
  // const headers = {
  //   'x-functions-key': MODEL2_KEY
  // }

  // try {
  //   const { data } = await axios.post(MODEL_2_URL, sendData, { headers: headers })
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify(data),
  //   }
  // } catch (error) {
  //   const { data, headers, status, statusText } = error.response
  //   return {
  //     statusCode: error.response.status,
  //     body: JSON.stringify({ status, statusText, headers, data }),
  //   }
  // }
}

module.exports = { handler }
