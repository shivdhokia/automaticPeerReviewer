window.onload = function () {

    let t = document.querySelector('#login-page');
    let clone = document.importNode(t.content, true);
    document.body.appendChild(clone);

    document.getElementById('loginBtn').onclick = function () {
        const container = document.body.lastElementChild;
        document.body.removeChild(container);
        let t = document.querySelector('#active-page');
        let clone = document.importNode(t.content, true);
        document.body.appendChild(clone);

        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }

        document.getElementById('createdButton').onclick = function () {
            console.log("button clicked");
            const container = document.body.lastElementChild;
            document.body.removeChild(container);
            let t = document.querySelector('#created-page');
            let clone = document.importNode(t.content, true);
            document.body.appendChild(clone);

            var coll = document.getElementsByClassName("collapsible");
            var i;
    
            for (i = 0; i < coll.length; i++) {
                coll[i].addEventListener("click", function () {
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                });
            }
        }

    }

}

