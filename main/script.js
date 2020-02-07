window.onload = function () {

    function loadTemplate(newPage) {
        const container = document.body.lastElementChild;
        document.body.removeChild(container);
        let t = document.querySelector(newPage);
        let clone = document.importNode(t.content, true);
        document.body.appendChild(clone);
    }

    // allows for collapsible divs.
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

    function loadActive(){
        loadTemplate('#active-page');
        collapsible();

        document.getElementById('createdButton').onclick = function () {
            loadCreated();
        }

        document.getElementById('activeButton').onclick = function(){
            // do nothing
            console.log("did nothing in active screen");
            
        }

    }

    function loadCreated() {
        loadTemplate('#created-page');
        collapsible();
        loadFormButtons();
        
        document.getElementById('createdButton').onclick = function(){
            // do nothing
            console.log("did nothing in created screen");
            
        }

        document.getElementById('activeButton').onclick = function(){
            loadActive();

        }

    }


    // loads the login page
    let t = document.querySelector('#login-page');
    let clone = document.importNode(t.content, true);
    document.body.appendChild(clone);

    // when login button clicked takes you to the active page.
    document.getElementById('loginBtn').onclick = function () {
        loadActive();

    }

}

