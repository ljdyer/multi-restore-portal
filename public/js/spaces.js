function startLoadingAction() {
    $('#input-area').prop('disabled', true);
    if (loading) {
        $('#input-area').val(addRandomSpaces(inputText));
        loadingTimeout = setTimeout(startLoadingAction, loadingRefreshRate);
    }
}

$(document).ready(function () {
    $('#input-area').bind('input propertychange', function () {
        processInput('no_spaces');
    });
});
