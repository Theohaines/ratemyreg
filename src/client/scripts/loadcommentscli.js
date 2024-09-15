const commentContainer = document.getElementById("commentContainer");
const plate = document.getElementById('plate');

function loadCommentsCli(amnt, srchtype){
    fetch('/loadcomments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"amnt" : amnt, "srchtype" : srchtype})
    })
    .then(response => response.json())
    .then(data => loadRegIntoUI(data))
    .catch(error => console.error(error));
}

function loadRegIntoUI(data){
    try {
        for (var comment of data) {
            const commentDiv = document.createElement('div');
            commentDiv.className = "comment";
            commentContainer.appendChild(commentDiv);

            const commentRegLink = document.createElement('a');
            commentRegLink.href = "/regview?REG=" + comment.C_REG;
            commentDiv.appendChild(commentRegLink);
            
            const commentReg = document.createElement('h2');
            commentReg.textContent = comment.C_REG;
            commentRegLink.appendChild(commentReg);
    
            const commentTitle = document.createElement('h3');
            commentTitle.textContent = comment.C_TITLE;
            commentDiv.appendChild(commentTitle);
    
            const commentBody = document.createElement('h4');
            commentBody.textContent = comment.C_BODY;
            commentDiv.appendChild(commentBody);
        }
    } catch {
        const commentDiv = document.createElement('div');
        commentDiv.className = "comment";
        commentContainer.appendChild(commentDiv);

        const commentRegLink = document.createElement('a');
        commentRegLink.href = "/regview?REG=" + data.C_REG;
        commentDiv.appendChild(commentRegLink);
        
        const commentReg = document.createElement('h2');
        commentReg.textContent = data.C_REG;
        commentRegLink.appendChild(commentReg);

        const commentTitle = document.createElement('h3');
        commentTitle.textContent = data.payload.C_TITLE;
        commentDiv.appendChild(commentTitle);

        const commentBody = document.createElement('h4');
        commentBody.textContent = data.payload.C_BODY;
        commentDiv.appendChild(commentBody);
    }
}