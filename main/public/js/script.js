window.onload = function () {

    function loadTemplate(newPage) {
        const container = document.body.lastElementChild;
        document.body.removeChild(container);
        let t = document.querySelector(newPage);
        let clone = document.importNode(t.content, true);
        document.body.appendChild(clone);
    }

    // ajax get request need to fix

    function getAllCriteria() {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
                if (xmlhttp.status == 200) {
                    loadTemplate('#showCriteria');
                    document.getElementById("criteriaBox").innerHTML = xmlhttp.responseText;
                } else if (xmlhttp.status == 400) {
                    alert('There was an error 400');
                } else {
                    alert('something else other than 200 was returned');
                }
            }
        };

        xmlhttp.open("GET", "/criteria", true);
        xmlhttp.send();
    }

    function sendCohort() {
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/cohort", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        let cohortObject = {};

        cohortObject.title = document.getElementById('cohortTitle');

        // if clicked use new criteria emulate new crit screen.

        // else GET list of crits and select one. 

        cohortObject.startDate = document.getElementById('startDate');
        cohortObject.expiryDate = document.getElementById('expiryDate');
        let cohortObjectString = JSON.stringify(cohortObject);
        xhttp.send(cohortObjectString);


        // Creates random link 

        /*  var links = [
             "google.com",
             "youtube.com",
             "reddit.com",
             "apple.com"
         ]

         var openSite = function () {
             // get a random number between 0 and the number of links
             var randIdx = Math.random() * links.length;
             // round it, so it can be used as array index
             randIdx = parseInt(randIdx, 10);
             // construct the link to be opened
             var link = 'http://' + links[randIdx];

             return link;
         }; */

    }

    // ajax post request need to fix
    function sendCriteria() {
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/criteria", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        let criteriaObject = {};
        criteriaObject.criteriaData = [];
        criteriaObject.title = document.getElementById('criteriaTitle').value;

        let criterionArray = document.getElementsByClassName('criterionBaseContainer');

        for (let index = 0; index < criterionArray.length; index++) {
            let critTitle = criterionArray[index].getElementsByClassName('critTitle')[0].value;
            criteriaObject.criteriaData[index] = {};
            criteriaObject.criteriaData[index].criterionTitle = critTitle;
            let statmentsDivArrayElem = criterionArray[index].getElementsByClassName('statements');
            criteriaObject.criteriaData[index].statements = [];
            let statementObjArray = [];

            for (let k = 0; k < statmentsDivArrayElem.length; k++) {
                let statmentsArrayElem = statmentsDivArrayElem[k].getElementsByTagName('input');
                for (let j = 0; j < statmentsArrayElem.length; j++) {
                    let newStatementObj = {}
                    if (j % 2 == 0) {
                        newStatementObj.statement = statmentsArrayElem[j].value;
                        newStatementObj.score = statmentsArrayElem[j + 1].value;
                        statementObjArray.push(newStatementObj);
                    }
                }
            }
            criteriaObject.criteriaData[index].statements = statementObjArray;
        }
        let criteriaString = JSON.stringify(criteriaObject);
        // console.log(criteriaString);
        xhttp.send(criteriaString);
        loadCreated();
    }

    function loadCriteriaData() {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
                if (xmlhttp.status == 200) {
                    let jsonObj = JSON.parse(this.responseText);
                    console.log(jsonObj);


                    for (let index = 0; index < jsonObj.length; index++) {
                        const element = jsonObj[index];

                        let t = document.querySelector('#collapsibleTemplate');
                        let clone = document.importNode(t.content, true);
                        console.log(element.title);
                        let cloneContents = Array.from(clone.children);
                        for (let j = 0; j < cloneContents.length; j++) {
                            const content = cloneContents[j];

                            if (content.classList.contains("collapsible")) {
                               content.innerHTML = element.title; 
                            }
                            
                            if (content.classList.contains("content")) {
                                content.textContent = JSON.stringify(element.criteriaData);
                            }
                        }
                        // let btn = clone.
                        // clone.innerHTML = element.title;
                        let parent = document.getElementById('criteriaList');
                        parent.appendChild(clone);

                        // document.getElementById("criteriaBox").innerHTML = xmlhttp.responseText;

                    }

                    collapsible();

                } else if (xmlhttp.status == 400) {
                    alert('There was an error 400');
                } else {
                    alert('something else other than 200 was returned');
                }
            }
        };

        xmlhttp.open("GET", "/criteria", true);
        xmlhttp.send();
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

            document.getElementById('getCreatedCriteria').onclick = function () {
                getAllCriteria();
            }
        }

        document.getElementById('addCriteria').onclick = function () {
            loadTemplate('#criteriaForm');

            document.getElementById('cancelCriteria').onclick = function () {
                loadCreated();
            }

            document.getElementById('saveCriteria').onclick = function () {
                sendCriteria();
                // console.log("formSent");
            }

            document.getElementById('addCriterion').onclick = function () {
                let item = document.getElementById("criterionTemplate");
                let clone = document.importNode(item.content, true);
                document.getElementById("criteriaDataForm").lastChild.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.appendChild(clone);
                // document.getElementById("criteriaDataForm").lastChild.previousSibling.previousSibling.appendChild(clone);
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

        document.getElementById('testButton').onclick = function () {
            loadPeerReview();
        }
    }

    function loadPeerReview() {
        loadTemplate('#testPeerReview');

        document.getElementsByClassName('statements').onclick = function () {
            let statements = this.parentNode.children;

            for (let statement of statements) {
                if (statement.classList.contains('statement.selected')) {
                    statement.classList.remove('statement.selected');
                    console.log("removed class");
                }
            }
            this.classList.add('statement.selected');
            console.log("added class");
        }

    }

    function loadCreated() {
        loadTemplate('#created-page');
        loadFormButtons();
        loadCriteriaData();

        document.getElementById('createdButton').onclick = function () {
            // do nothing
            console.log("did nothing in created screen");
        }

        document.getElementById('activeButton').onclick = function () {
            loadActive();
        }
        // collapsible();
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

document.addEventListener('click', function (e) {
    if (hasClass(e.target, 'addStatement')) {
        let parent = e.target.parentNode.nextSibling.nextSibling;

        // Create statement-score pair for particular criterion.

        // Get the last <li> element ("Milk") of <ul> with id="myList2"

        let statementTemplate = document.getElementById("statementClone");

        // Copy the <li> element and its child nodes
        let statementCln = document.importNode(statementTemplate.content, true);
        parent.appendChild(statementCln);

    }
}, false);

function hasClass(elem, className) {
    return elem.classList.contains(className);
}