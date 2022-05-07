randomSpaceFrequency = 0.2;
randomCommaFrequency = 0.15;
randomPeriodFrequency = 0.15;
randomCapFrequency = 0.25;
loadingRefreshRate = 500;
loading = false;
loadingTimeout = '';
inputText = '';
maxInputLength = 1000;

MODEL_URLS = {
    'model1': 'https://model1-spaces.azurewebsites.net/api/restore',
    'model2': 'https://model2-spaces.azurewebsites.net/api/restore',
    'model3': 'https://model3-caps-and-punct.azurewebsites.net/api/restore',
    'model5': 'https://model5-all.azurewebsites.net/api/restore'
}

function get_model_key(model){
    return new Promise((resolve) =>
        fetch("/.netlify/functions/model2-api", {method: 'POST', body: model})
            .then(response => response.text()
                .then(response => {
                    resolve(response);
                })
            )
    )
}

function run_model(url, key){
    inputText = $('#input-area').val();
    if (inputText.length === 0){
        window.alert('You need to type something into the input area first!')
        return;
    }
    const sendData = JSON.stringify({
        input: inputText,
    });
    const headers = {
        'x-functions-key': key,
    }
    loading = true;
    startLoadingAction();
    fetch(url, { method: 'POST', headers: headers, body: sendData })
        .then(response => response.text().then(response => {
            $('#output-area').val(response);
            stopLoadingAction();
        }))
}

async function restore() {
    model = $('#model').find(":selected").val();
    url = MODEL_URLS[model]
    get_model_key(model).then(key => {
        run_model(url, key);
    });
};

function processInput(processAction) {
    inputText = $('#input-area').val();
    inputText = inputText.toLowerCase();
    if (processAction == 'no_spaces') {
        inputText = inputText.replaceAll(/[^a-z0-9]/g, '')
    }
    if (processAction == 'lower') {
        inputText = inputText.replaceAll(/[^a-z0-9 ]/g, '')
    }
    inputText = inputText.substr(0,maxInputLength)
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

function stopLoadingAction() {
    $('#input-area').prop('disabled', false);
    clearTimeout(loadingTimeout);
    loading = false;
    $('#input-area').val(inputText);
}

$(document).ready(function () {
    $('#restore').click(function () {
        restore();
    });
    $('#output-area').attr('readonly', true).css("background-color", "#ffffff").addClass('no-input');
    $('#input-area').focus().select();
});