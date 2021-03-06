document.addEventListener('DOMContentLoaded', function () {
    /* general functions */
    let createA = (href, text) => {
        let a = document.createElement('a');
        a.href = href;
        a.innerText = text;
        return a;
    }

    let createDiv = className => {
        let div = document.createElement('div');
        div.classList.add(className);
        return div;
    }

    let getQueryStrings = () => {
        let queryDict = {};
        location.search
            .substr(1)
            .split('&')
            .forEach(item => {
                queryDict[item.split("=")[0]] = item.split("=")[1]
            })
        return queryDict;
    }

    let htmlDecode = input => {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }



    /* bulma-provided navbar */
    // Get all "navbar-burger" elements
    let $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
            $el.addEventListener('click', function () {
                // Get the target from the "data-target" attribute
                let target = $el.dataset.target;
                let $target = document.getElementById(target);

                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                $el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }



    /* search */
    let searchIndexPath = '/data/lunrIndex.json';
    let searchIndex;
    let searchStore;
    let searchBar = document.getElementById('searchbar');
    let searchButton = document.getElementById('searchbutton');

    if (searchButton != null) {
        getSearchIndex();
        
        searchButton.addEventListener('click', requestSearch);

        searchbar.addEventListener('keyup', event => {
            event.preventDefault();
            if (event.keyCode === 13) {
                searchButton.click();
            }
        });
    }

    /* search functions */
    function getSearchIndex () {
        let httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let response = JSON.parse(httpRequest.responseText);
                    searchIndex = lunr.Index.load(response.index);
                    searchStore = response.store;
                    searchButton.disabled = false;
                } else {
                    console.log('Search index request error');
                }
            }
        };
        httpRequest.open('GET', searchIndexPath);
        httpRequest.send();
    }

    function requestSearch () {
        let query = searchBar.value;
        if (query != undefined) {
            let results = searchIndex.search(query);

            if (results.length === 0) {
                showResults(query.length <= 3 ? 'short' : 'empty');
            }
            else {
                showResults('filled');

                let ol = document.getElementById('searchresults');
                ol.innerHTML = '';
                
                results.forEach(result => {
                    let a = createA(result.ref, htmlDecode(searchStore[result.ref].title));
                    let li = document.createElement('li');
                    let box = createDiv('box');
                    box.appendChild(a)
                    li.appendChild(box);
                    ol.appendChild(li);
                })
            }
        }
    }

    function showResults (resultsPane) {
        document.getElementById('searchfilled').style.display = resultsPane === 'filled' ? 'block' : 'none';
        document.getElementById('searchempty').style.display = resultsPane === 'empty' ? 'block' : 'none';
        document.getElementById('searchshort').style.display = resultsPane === 'short' ? 'block' : 'none';
    }



    /* episode filter - radio buttons */
    addEventListenerList(document.getElementsByName('episodefilter'), 'click', filterEpisodes);

    function addEventListenerList(list, event, fn) {
        for (var i = 0, len = list.length; i < len; i++) {
            list[i].addEventListener(event, fn, false);
        }
    }

    function filterEpisodes (event) {
        let filter = event.srcElement.id;
        let allCards = document.querySelectorAll('.episode-list .card');
        let cards;

        switch (filter) {
            case 'all':
                cards = allCards;
                break;
            case 'essential':
                cards = document.querySelectorAll('.episode-list .recommendation-essential, .episode-list .recommendation-essential-timeloop');
                break;
            case 'listen':
                cards = document.querySelectorAll('.episode-list .recommendation-essential, .episode-list .recommendation-essential-timeloop, .episode-list .recommendation-yes, .episode-list .recommendation-yes-timeloop');
                break;
            case 'skip':
                cards = document.querySelectorAll('.episode-list .recommendation-no');
                break;
        }

        allCards.forEach(card => card.style.display = 'none');
        cards.forEach(card => card.style.display = 'block');
    }



    /* episode filter - query string */
    {
        let queryStrings = getQueryStrings();
        let radio = document.getElementById(queryStrings.r);
        if (radio) {
            radio.click();
        }
    }



    /* episode filter - sort episodes */
    let sortEpisodesButton = document.getElementById('sortEpisodes');

    if (sortEpisodesButton != null) {
        sortEpisodesButton.addEventListener('click', toggleEpisodeSort);
    }

    function toggleEpisodeSort () {
        const namespace = 'http://www.w3.org/1999/xlink';
        const iconPathUp = '/img/feather-sprite.svg#chevrons-up';
        const iconPathDown = '/img/feather-sprite.svg#chevrons-down';
        
        // toggle icon
        let sortEpisodesIcon = document.getElementById('sortEpisodesIcon');
        let currentIconPath = sortEpisodesIcon.getAttributeNS(namespace, 'href');
        sortEpisodesIcon.setAttributeNS(
            namespace, 'xlink:href', currentIconPath === iconPathUp ? iconPathDown : iconPathUp);
        
        // toggle episode order
        let episodeList = document.getElementById('episodeList');
        reverseElements(episodeList);
    }

    function reverseElements (element) {
        for (let i = 0; i < element.childNodes.length; i++) { 
            element.insertBefore(element.childNodes[i], element.firstChild);
        }
    }
});