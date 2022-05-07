function startLoadingAction() {
    $('#input-area').prop('disabled', true);
    if (loading) {
        $('#input-area').val(addRandomSpaces(inputText));
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
    $('#input-area').bind('input propertychange', function () {
        processInput('no_spaces');
    });
    $('#insert-random').click(function () {
        insertRandomTEDTalk('no_spaces');
    });
});
