randomSpaceFrequency = 0.2;
randomCommaFrequency = 0.15;
randomPeriodFrequency = 0.15;
randomCapFrequency = 0.25;
loadingRefreshRate = 500;
loading = false;
loadingTimeout = '';
inputText = '';
MODEL_2_URL = 'https://model2-space.azurewebsites.net/api/model2-spaces'
MODEL_2_URL_TEST = 'https://model2-space.azurewebsites.net/api/model2-spaces?input_text=ilikebananas'

function restore() {

    model = $('#model').find(":selected").val();
    inputText = $('#input-area').val();

    sendData = JSON.stringify({
        input_text: inputText
    });
    request = {
        body: sendData,
        method: 'POST'
    }

    loading = true;
    startLoadingAction();

    if (model == 'model2'){
        fetch(MODEL_2_URL, request).then(response => response.text().then(json_response => {
            response = JSON.parse(json_response);
            $('#output-area').val(response);
            stopLoadingAction();
        }));
    }

    else{
        fetch('/model', request).then(response => response.text().then(json_response => {
            response = JSON.parse(json_response);
            $('#output-area').val(response);
            stopLoadingAction();
        }));
    }
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