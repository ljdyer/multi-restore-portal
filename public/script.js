window.onload = function () {
    
    document.getElementById("button").addEventListener("click", () => {
        request = {
            body: JSON.stringify('ilikebananas'),
            method: 'post'
        }

        fetch("/.netlify/functions/token-hider", request).then(response => response.text().then(json_response => {
            response = json_response;
            console.log(response);
        }))
    })
    
  //     // response = JSON.parse(json_response);
}