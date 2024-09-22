const commentContainer = document.getElementById("commentContainer");
const plate = document.getElementById('plate');

function loadRegCli(reg){
    fetch('/loadreg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "reg" : reg})
    })
    .then(response => response.json())
    .then(data => loadRegIntoUI(JSON.parse(data)))
    .catch(error => console.error(error));
}

function loadRegIntoUI(data){
    if (data.response == "err") {
        alert(data.payload);
        return;
    } else if (data.response == "ser") {
        return;
    }

    if (data.payload.length >= 1){
        for (var comment of data.payload) {
            const commentDiv = document.createElement('div');
            commentDiv.className = "comment";
            commentContainer.appendChild(commentDiv);
    
            const commentTitle = document.createElement('h3');
            commentTitle.textContent = comment.C_TITLE;
            commentDiv.appendChild(commentTitle);
    
            const commentBody = document.createElement('h4');
            commentBody.textContent = comment.C_BODY;
            commentDiv.appendChild(commentBody);


            const urlParams = new URLSearchParams(window.location.search);
            const reg = urlParams.get('REG');
        
            plate.textContent = reg;
        }
    } else {
        const commentAlert = document.createElement("h2");
        commentAlert.textContent = "No comments exist for this registration number!";
        commentAlert.style.textAlign = "center"
        commentContainer.appendChild(commentAlert);

        const urlParams = new URLSearchParams(window.location.search);
        const reg = urlParams.get('REG');
    
        plate.textContent = reg;
    }
}

function init(){
    const urlParams = new URLSearchParams(window.location.search);
    const reg = urlParams.get('REG');

    loadRegCli(reg);
}

init()