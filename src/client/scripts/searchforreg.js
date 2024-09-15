//Multistep process to stop end user from doing end user things lololol

const searchReg = document.getElementById("searchReg");

function callServerToValidateReg(){
    fetch('/validatereg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "reg" : searchReg.value.toUpperCase()})
    })
    .then(response => response.json())
    .then(data => postProcessing(JSON.parse(data)))
    .catch(error => console.error(error));
}

function postProcessing(data){
    if (data.response == "err"){
        window.location.reload();
    } else if (data.response == "okay") {
        window.location.href = '/regview' + "?REG="+searchReg.value.toUpperCase()+"";
    }
}