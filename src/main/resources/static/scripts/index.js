
let dataElement = $("#search-result");
let repositoryResults = $("#repository-results");
let searchButton = $("#search-button");
let inputBox = $("#input");
let selectList = $("#search_language");
let footer = $("#footer");
let currentPageNumber = 1;
let nextButton = $("#next-button");
let previousButton = $("#previous-button");
let reposFound = 0;
let sortMenuSelect = $("#sort");
let url = "http://localhost:1337";
let query = {};
let error = $(".error");
let navLink = $("#nav-link");
let thirdButton = 0;

//Performs a new search when sort-order is changed
sortMenuSelect.change(function () {
    doSearch();
});

//Performs a new search when language is changed.
selectList.change(function () {
    doSearch();
});

//Creates eventlistener for nextbutton
nextButton.on("click", function (e) {
    e.preventDefault();
    currentPageNumber++;
    doSearch();
    //Enable previous button
    if (currentPageNumber > 1) {
        previousButton.prop('disabled', false);
    }
    if (currentPageNumber * 10 >= reposFound) {
        nextButton.prop('disabled', true);
    }
    window.scrollTo({
        top: 100,
        left: 100,
        behavior: 'smooth'
    });
    thirdButton++;
});

//Creates eventlistener for previousbutton
previousButton.on("click", function (e) {
    e.preventDefault();
    currentPageNumber--;
    doSearch();
    //Disable previous button
    if (currentPageNumber <= 1) {
        previousButton.prop('disabled', true);
    }
    if (currentPageNumber * 10 <= reposFound) {
        nextButton.prop('disabled', false);
    }
    window.scrollTo({
        top: 100,
        left: 100,
        behavior: 'smooth'
    });
    thirdButton--;
});

//Creates eventlistener for searchbutton
searchButton.on("click", function (e) {
    currentPageNumber = 1;
    e.preventDefault();
    doSearch();
});

//Generates html data from json result and appends it to the dom in element <li>
function displaySearchResult(results) {
    dataElement.html("");
    $.each(results, function (i, item) {
        let languageColor = returnLanguageColor(item.language);
        let li = $(
            "<li><div class='wrapper'>" +
            "<div class='search-result-left'>" +
            "<h3><a href='" + item.svn_url + "'>" + item.full_name + "</a>" +
            "</h3><h4>" + item.name +
            "</h4><p> Updated: " + getDateString(item.updated_at) +
            "</p></div><div class='search-result-right'>" +
            "<div class='repo-language'>" +
            "<span class='repo-language-color' style='background-color:" + returnLanguageColor(item.language) +
            "'></span><span class='language'>" + item.language +
            "</span></div><div class='repo-stars'>" +
            "<img src='/images/star.png' class='star-img'/>" +
            "<span class='stars'>" + getStarGazersCount(item.stargazers_count) +
            "</div></span></div></div></li>");
        dataElement.append(li);
    });
}

//Search with jQuery
/*function doSearch(url) {
    $.get(url, function (r) {
        reposFound = r.total_count;
        displaySearchResult(r.items);
        repositoryResults.text(reposFound + ' repositories found.');
        if(reposFound > 10){
            footer.css("visibility", "visible");
        }else{
            footer.css("visibility", "hidden");
        }
    });
}*/

//Search with fetch
function doSearch() {
    if (inputBox.val() != "") {
        error.hide();
        //Creates a query JSON-object that we send to our webserver using fetch.
        let query = {
            query: inputBox.val(),
            language: selectList.val(),
            sort: getSort(),
            sortOrder: getSortOrder(),
            pageNumber: currentPageNumber
        };
        console.log(query);
        // Default options are marked with *
        return fetch(url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                //redirect: "follow", // manual, *follow, error
                //referrer: "no-referrer", // no-referrer, *client
                body: JSON.stringify(query), // body data type must match "Content-Type" header
            })
            //Takes the response and pareses it to json
            .then(response => response.json()
                //Calls a function that takes the json we got back from the server and passes it to the function in variable "data".
                .then(function (data) {
                    if (data.total_count != reposFound) {
                        thirdButton = (calculateMaxResults(data.total_count) / 2);
                    }
                    reposFound = data.total_count;
                    repositoryResults.text(reposFound + ' repositories found.');
                    if (reposFound > 10) {
                        footer.css("visibility", "visible");
                    } else {
                        footer.css("visibility", "hidden");
                    }
                    displaySearchResult(data.items);
                    generateNavLinks();
                })); // parses response to JSON
    } else {
        //Shows error message if search inputfield is empty.
        error.toggle();
    }
}

//Returns sortmethod
function getSort() {
    if (sortMenuSelect.val() == 1 || sortMenuSelect.val() == 2) {
        return "stars";
    }
    if (sortMenuSelect.val() == 3 || sortMenuSelect.val() == 4) {
        return "forks";
    } else {
        return "updated";
    }
}

//Returns sortorder
function getSortOrder() {
    if (sortMenuSelect.val() == 1 || sortMenuSelect.val() == 3 || sortMenuSelect.val() == 5) {
        return "desc";
    } else {
        return "asc";
    }
}

function getDateString(date) {
    return date.substring(0, 10);
}

function getStarGazersCount(stars) {
    if (stars < 1000) {
        return stars;
    } else {
        return (stars / 1000).toFixed(1) + "k";
    }
}

function generateNavLinks() {

    navLink.html("");
    let maxResult = calculateMaxResults(reposFound);
    let lis;

    if (calculateMaxResults(reposFound) >= 5) {
        lis = $(
            "<li class='" + 1 + " buttons'>" + 1 + "</li>" +
            "<li class='minus'>...</li>" +
            "<li class='" + (thirdButton - 1) + " buttons'>" + (thirdButton - 1) + "</li>" +
            "<li class='" + thirdButton + " buttons'>" + thirdButton + "</li>" +
            "<li class='" + (thirdButton + 1) + " buttons'>" + (thirdButton + 1) + "</li>" +
            "<li class='plus'>...</li>" +
            "<li class='" + (maxResult) + " buttons'>" + (maxResult) + "</li>"
        );
    } else if (calculateMaxResults(reposFound) == 4) {
        lis = $(
            "<li class='" + 1 + " buttons'>" + 1 + "</li>" +
            "<li class='" + (thirdButton - 1) + " buttons>" + (thirdButton - 1) + "</li>" +
            "<li class='" + thirdButton + " buttons'>" + thirdButton + "</li>" +
            "<li class='" + (maxResult) + " buttons'>" + (maxResult) + "</li>"
        );
    }
    navLink.append(lis);




    $("#nav-link li.buttons").click(function (e) {
        let pageClicked = $(this).text();
        if (pageClicked != currentPageNumber && pageClicked != calculateMaxResults(reposFound) && pageClicked != 1) {
            thirdButton = parseInt(thirdButton = pageClicked);
            currentPageNumber = $(this).text();
            doSearch();
        } else if (pageClicked != currentPageNumber && pageClicked == 1) {
            thirdButton = 3;
            currentPageNumber = $(this).text();
            doSearch();
        } else if (pageClicked != currentPageNumber && pageClicked == calculateMaxResults(reposFound)) {
            thirdButton = calculateMaxResults(reposFound) - 3;
            currentPageNumber = $(this).text();
            doSearch();
        }
    });
    $("." + currentPageNumber).css("background-color", "lightgray");

    $("#nav-link li.minus").click(function (e) {
        if (thirdButton > 3) {
            thirdButton--;
            generateNavLinks();
        }
    });

    $("#nav-link li.plus").click(function (e) {
        if (thirdButton < 28) {
            thirdButton++;
            generateNavLinks();
        }
    });
}

function calculateMaxResults(count) {
    if (count >= 750) {
        return 30;
    } else {
        return Math.ceil(count / 25);
    }
}


