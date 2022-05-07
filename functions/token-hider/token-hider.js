const process = require('process')

const axios = require('axios')
const qs = require('qs')

const handler = async function (event) {

  MODEL2_KEY = process.env.MODEL2_KEY
  MODEL_2_URL = 'https://model2-spaces.azurewebsites.net/api/restore'

  console.log(MODEL2_KEY)
  inputText = JSON.parse(event.body)
  console.log(inputText)
  const sendData = JSON.stringify({
    input: inputText,
  });
  const request = {
    body: sendData,
  }
  const headers = {
    'x-functions-key': MODEL2_KEY
  }
  console.log('got this far')

  try {
    const { data } = await axios.post(MODEL_2_URL, request, {headers: headers})
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    const { data, headers, status, statusText } = error.response
    const monkeys = MODEL2_KEY
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data, monkeys }),
    }
  }
}

module.exports = { handler }
