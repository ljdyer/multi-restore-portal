function startLoadingAction() {
    $('#input-area').prop('disabled', true);
    if (loading) {
        $('#input-area').val(addRandomPunctAndCaps(addRandomSpaces(inputText)));
        loadingTimeout = setTimeout(startLoadingAction, loadingRefreshRate);
    }
}

$(document).ready(function () {
    console.log('working')
    $('#input-area').bind('input propertychange', function () {
        processInput('no_spaces');
    });
});
