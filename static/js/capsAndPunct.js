function startLoadingAction() {
    $('#input-area').prop('disabled', true);
    if (loading) {
        $('#input-area').val(addRandomPunctAndCaps(inputText));
        loadingTimeout = setTimeout(startLoadingAction, loadingRefreshRate);
    }
}

function stopLoadingAction() {
    $('#input-area').prop('disabled', false);
    clearTimeout(loadingTimeout);
    loading = false;
    $('#input-area').val(inputText);
}

$(document).ready(function () {
    console.log('working')
    $('#input-area').bind('input propertychange', function () {
        processInput('lower');
    });
    $('#insert-random').click(function () {
        insertRandomTEDTalk('lower');
    });
});
