randomSpaceFrequency = 0.2;
randomCommaFrequency = 0.15;
randomPeriodFrequency = 0.15;
randomCapFrequency = 0.25;
loadingRefreshRate = 500;
loading = false;
loadingTimeout = '';
inputText = '';

MODEL_2_URL = 'https://model2-spaces.azurewebsites.net/api/restore'


function get_model_2_key(){
    return new Promise((resolve) =>
        fetch("/.netlify/functions/model2-api")
            .then(response => response.text()
                .then(response => {
                    // console.log(response);
                    resolve(response);
                })
            )
    )
}

function make_api_call(key){
    model = $('#model').find(":selected").val();
    inputText = $('#input-area').val();
    const sendData = JSON.stringify({
        input: inputText,
    });
    const headers = {
        'x-functions-key': key,
    }
    console.log(sendData);
    console.log(key);
    console.log(headers);
    loading = true;
    startLoadingAction();

    fetch(MODEL_2_URL, { method: 'POST', headers: headers, body: sendData })
        .then(response => response.text().then(response => {
            $('#output-area').val(response);
            stopLoadingAction();
        }))
}

async function restore() {

    get_model_2_key().then(key => {
        make_api_call(key);
    })
    

    // else{
    //     fetch('/model', request).then(response => response.text().then(json_response => {
    //         response = JSON.parse(json_response);
    //         $('#output-area').val(response);
    //         stopLoadingAction();
    //     }));
    // }
};

function insertRandomTEDTalk(sampleType) {
    request = {
        method: "POST",
        body: sampleType
    };
    fetch('/get_random', request).then(response => response.text().then(json_response => {
        response = JSON.parse(json_response);
        $('#input-area').val(response);
    }));
}

function processInput(processAction) {
    inputText = $('#input-area').val();
    inputText = inputText.toLowerCase();
    if (processAction == 'no_spaces') {
        inputText = inputText.replaceAll(/[^a-z0-9]/g, '')
    }
    if (processAction == 'lower') {
        inputText = inputText.replaceAll(/[^a-z0-9 ]/g, '')
    }
    $('#input-area').val(inputText);
}

function addRandomPunctAndCaps(inputText) {
    let output = ''
    words = inputText.split(" ");
    for (var i = 0; i < words.length; i++) {
        randNum = Math.random()
        if (randNum < randomPeriodFrequency) {
            words[i] = words[i] + '.'
        }
        randNum = Math.random()
        if (randNum < randomCommaFrequency) {
            words[i] = words[i] + ','
        }
        randNum = Math.random()
        if (randNum < randomCapFrequency) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
        }
        output += words[i] + ' '
    }
    return output
}

function addRandomSpaces(inputText) {
    let output = ''
    for (var i = 0; i < inputText.length; i++) {
        output += inputText[i]
        randNum = Math.random()
        if (randNum < randomSpaceFrequency) {
            output += ' '
        }
    }
    return output
}

$(document).ready(function () {
    $('#restore').click(function () {
        restore();
    });
});