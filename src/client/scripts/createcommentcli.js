const commentReg = document.getElementById("commentReg");
const commentTitle = document.getElementById("commentTitle");
const commentBody = document.getElementById("commentBody");

async function createCommentCli(){
    if (commentReg.value.length != 7){
/*         alert("Registration number too short!");
        return; */
    }

    if (commentTitle.value.length < 3){
        alert("Title too short! (minimum 3 characters)");
        return;
    }

    if (commentTitle.value.length > 30){
        alert("Title too long! (maximum 30 characters)");
        return;
    }

    if (commentBody.value.length < 30){
        alert("Body too short! (minimum 30 characters)");
        return;
    }

    if (commentBody.value.length > 260){
        alert("Body too long! (maximum 260 characters)");
        return;
    }

    fetch('/createcomment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "reg" : commentReg.value, "title" : commentTitle.value, "body" : commentBody.value})
    })
    .then(response => response.json())
    .then(data => postProcess(JSON.parse(data)))
    .catch(error => console.error(error));
}

function postProcess(data){
    if (data.response == "okay"){
        window.location.href = "/regview?REG="+commentReg.value.toUpperCase()+"";
    } else if (data.response = "err") {
        alert(data.payload)
    }
}

function init(){
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('REF');

    if (ref){
        commentReg.value = ref;
    }
}

init()