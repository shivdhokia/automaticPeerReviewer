window.onload = function () {

    let t = document.querySelector('#login-page');
    let clone = document.importNode(t.content, true);
    document.body.appendChild(clone);

    document.getElementById('loginBtn').onclick = function () {
        document.body.removeChild(document.body.children[3]);
        document.body.removeChild(document.body.children[2]);
        let t = document.querySelector('#active-page');
        let clone = document.importNode(t.content, true);
        document.body.appendChild(clone);
    }

    
}