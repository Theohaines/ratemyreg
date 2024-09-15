function redirect(url){
    window.location.href = url;
}

function redirectWithRef(url){
    const urlParams = new URLSearchParams(window.location.search);
    const reg = urlParams.get('REG');

    window.location.href = url + "?REF="+reg.toUpperCase()+"";
}