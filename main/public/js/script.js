window.onload = function () {

    function loadTemplate(newPage) {
        const container = document.body.lastElementChild;
        document.body.removeChild(container);
        let t = document.querySelector(newPage);
        let clone = document.importNode(t.content, true);
        document.body.appendChild(clone);
    }

        // ajax get request need to fix
        function loadXMLDoc() {
            var xmlhttp = new XMLHttpRequest();
    
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
                    if (xmlhttp.status == 200) {
                        document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
                    }
                    else if (xmlhttp.status == 400) {
                        alert('There was an error 400');
                    }
                    else {
                        alert('something else other than 200 was returned');
                    }
                }
            };
    
            xmlhttp.open("GET", "ajax_info.txt", true);
            xmlhttp.send();
        }
    
    
        // ajax post request need to fix
        function sendForm() {
            xhttp.open("POST", "demo_post2.asp", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("fname=Henry&lname=Ford");
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
            document.getElementById('cancelCohort').onclick = function () {
                loadCreated();
            }


        }

        document.getElementById('addCriteria').onclick = function () {
            loadTemplate('#criteriaForm');
            let count = 1;
            document.getElementById('cancelCriteria').onclick = function () {
                loadCreated();
            }

            document.getElementById('addStatement').onclick = function () {
                console.log("button clicked to add statement");
                
                // Get the last <li> element ("Milk") of <ul> with id="myList2"
                var itm = document.getElementById("statementDiv");

                // Copy the <li> element and its child nodes
                var cln = itm.cloneNode(true);
                cln.id = "statement"+count;
                // Append the cloned <li> element to <ul> with id="myList1"
                document.getElementById("statementContainer").appendChild(cln);
                count ++;
            }

        }
    }

    function loadActive() {
        loadTemplate('#active-page');
        collapsible();

        document.getElementById('createdButton').onclick = function () {
            loadCreated();
        }

        document.getElementById('activeButton').onclick = function () {
            // do nothing
            console.log("did nothing in active screen");
        }
    }

    function loadCreated() {
        loadTemplate('#created-page');
        collapsible();
        loadFormButtons();

        document.getElementById('createdButton').onclick = function () {
            // do nothing
            console.log("did nothing in created screen");
        }

        document.getElementById('activeButton').onclick = function () {
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

