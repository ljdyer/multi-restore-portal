// const { resolve } = require("path");

randomSpaceFrequency = 0.2;
randomCommaFrequency = 0.15;
randomPeriodFrequency = 0.15;
randomCapFrequency = 0.25;
loadingRefreshRate = 500;
loading = false;
loadingTimeout = '';
prevInputText = '';
inputText = '';
maxInputLength = 1000;
processAction = '';
loadingAction = '';
pipelinePause = 1000;


MODEL_URLS = {
    'model1': 'https://model1-spaces.azurewebsites.net/api/restore',
    'model2': 'https://model2-spaces.azurewebsites.net/api/restore',
    'model3': 'https://model3-caps-and-punct.azurewebsites.net/api/restore',
    'model5': 'https://model5-all.azurewebsites.net/api/restore'
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function getModelKey(model){
    return new Promise((resolve) =>
        fetch("/.netlify/functions/model2-api", {method: 'POST', body: model})
            .then(response => response.text()
                .then(response => {
                    resolve(response);
                })
            )
    )
}

function callModel(url, key){
    const sendData = JSON.stringify({
        input: inputText,
    });
    const headers = {
        'x-functions-key': key,
    }
    loading = true;
    $('#input-area').val('')
    startLoadingAction();
    return new Promise((resolve) => 
        fetch(url, { method: 'POST', headers: headers, body: sendData })
            .then(response => response.text().then(response => {
                resolve(response);
            }))
    )
}

function runModel(model) {
    console.log('Running model: ' + model);
    url = MODEL_URLS[model]
    return new Promise((resolve) =>
        getModelKey(model).then(key =>
            callModel(url, key).then(response =>
                resolve(response)
            )
        )
    );
}

async function restore() {
    disableAll();
    $('#output-area').val('');
    if (inputText.length === 0) {
        window.alert('You need to type something into the input area first!')
        return;
    }
    inputText = $('#input-area').val();
    prevInputText = $('#input-area').val();
    model = $('#model').find(":selected").val();

    // Single model
    if (model.includes('model')){
        runModel(model).then(response => {
            $('#output-area').val(response);
            $('#input-area').val(prevInputText);
            stopLoadingAction();
            console.log(model + ' finished.')
        })
    }
        
    // // Pipeline
    else if (model.includes('pipeline')){
        firstModel = 'model' + model[model.length - 2]
        secondModel = 'model' + model[model.length - 1]
        loadingAction = 'spaces';
        runModel(firstModel).then(response => {
            inputText = response;
            $('#input-area').val(response);
            loadingAction = 'caps_and_punct';
            delay(2000).then(response => 
                runModel(secondModel).then(response => {
                    $('#output-area').val(response);
                    $('#input-area').val(prevInputText);
                    stopLoadingAction();
                    loadingAction = 'all';
                    console.log(model + ' finished.')
                })
            )
        });
    }
};

function disableAll() {
    $('#input-area').prop('disabled', true);
    $('#restore').prop('disabled', true);
    $('#model').prop('disabled', true);
}

function enableAll() {
    $('#input-area').prop('disabled', false);
    $('#restore').prop('disabled', false);
    $('#model').prop('disabled', false);
}

function processInput() {
    inputText = $('#input-area').val();
    inputText = inputText.toLowerCase();
    if (processAction == 'spaces') {
        inputText = inputText.replaceAll(/[^a-z0-9]/g, '')
    }
    if (processAction == 'lower') {
        inputText = inputText.replaceAll(/[^a-z0-9 ]/g, '')
        inputText = inputText.replaceAll(/ +/g, ' ')
    }
    inputText = inputText.substr(0, maxInputLength)
    $('#input-area').val(inputText);
}

function startLoadingAction() {
    if (loading) {
        switch (loadingAction){
            case 'spaces':
                $('#input-area').val(addRandomSpaces(inputText));
                break;
            case 'caps_and_punct':
                $('#input-area').val(addRandomPunctAndCaps(inputText));
                break;
            case 'all':
                $('#input-area').val(addRandomPunctAndCaps(addRandomSpaces(inputText)));
                break;
        }
        loadingTimeout = setTimeout(startLoadingAction, loadingRefreshRate);
    }
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

function stopLoadingAction() {
    enableAll()
    clearTimeout(loadingTimeout);
    loading = false;
}

$(document).ready(function () {

    pageName = window.location.pathname;
    if (pageName.includes('spaces')) {
        processAction = 'spaces';
        loadingAction = 'spaces';
    } else if (pageName.includes('caps_and_punct')) {
        processAction = 'lower';
        loadingAction = 'caps_and_punct';
    } else if (pageName.includes('all')) {
        processAction = 'spaces';
        loadingAction = 'all';
    }
    $('#restore').click(restore);
    $('#input-area').bind('input propertychange', processInput);
    $('#output-area').attr('readonly', true).css("background-color", "#ffffff").addClass('no-input');
    $('#input-area').focus().select();
});