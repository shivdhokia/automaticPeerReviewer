window.onload = function () {

    function collapsible() {
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

    function loadTemplate(newPage) {
        const container = document.body.lastElementChild;
        document.body.removeChild(container);
        let t = document.querySelector(newPage);
        let clone = document.importNode(t.content, true);
        document.body.appendChild(clone);
    }

    function loadActive(){
        loadTemplate('#active-page');
        collapsible();
    }

    function loadCreated() {
        loadTemplate('#created-page');
        collapsible();

    }

    function loadFormButtons() {
        document.getElementById('addCohort').onclick = function () {

            loadTemplate('#cohort_form_page');
            document.getElementById('cancelCohort').onclick = function(){
                loadCreated();
            }
        }

        document.getElementById('addCriteria').onclick = function () {
            loadTemplate('#criteriaForm');
            document.getElementById('cancelCriteria').onclick = function() {
                loadCreated();
            }
        }
    }



    let t = document.querySelector('#login-page');
    let clone = document.importNode(t.content, true);
    document.body.appendChild(clone);

    document.getElementById('loginBtn').onclick = function () {

        loadActive();


        document.getElementById('createdButton').onclick = function () {
            loadCreated();
            collapsible();
            loadFormButtons();

        }

    }

}

