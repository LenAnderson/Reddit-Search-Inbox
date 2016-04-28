// ==UserScript==
// @name         Reddit - Search Inbox
// @namespace    https://github.com/LenAnderson/
// @downloadURL  https://github.com/LenAnderson/Reddit-Search-Inbox/raw/master/reddit_search_inbox.user.js
// @version      1.0
// @author       LenAnderson
// @match        https://www.reddit.com/message/*/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var inpLi = document.createElement('li');
    var inpSep = document.createElement('span');
    inpSep.classList.add('separator');
    inpSep.textContent = '|';
    inpLi.appendChild(inpSep);
    var inp = document.createElement('input');
    inp.placeholder = 'Search for username';
    inpLi.appendChild(inp);
    document.querySelector('.content > .menuarea > .spacer > .flat-list.hover').appendChild(inpLi);
    inp.addEventListener('keyup', function(evt) {
        if (evt.keyCode == 13) {
            searchUser(inp.value);
        }
    });

    var things = [];
    var loading;
    loading = document.createElement('h1');
    loading.textContent = 'getting messages...';
    loading.style.textAlign = 'center';
    loading.style.fontWeight = 'bold';
    loading.style.opacity = '0.75';
    loading.style.marginTop = '3em';
    var base = document.body.cloneNode(true);

    function searchUser(user) {
        things = [];
        processPage(base, user);

        [].forEach.call(document.querySelectorAll('#siteTable > *'), function(it) { it.remove(); });

        document.querySelector('#siteTable').appendChild(loading);
    }
    function processPage(html, user) {
        getThings(html.cloneNode(true), user);
        var next = html.querySelector('.nav-buttons > .nextprev > [rel~="next"]');
        if (next) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', next.href, true);
            xhr.addEventListener('load', function() {
                var doc = document.createElement('div');
                doc.innerHTML = xhr.responseText;
                processPage(doc, user);
            });
            xhr.send();
        } else {
            loading.remove();
            things.forEach(function(thing) {
                document.querySelector('#siteTable').appendChild(thing);
            });
        }
    }
    function getThings(html, user) {
        [].forEach.call(html.querySelectorAll('#siteTable > .thing'), function(thing) {
            var re = new RegExp('^'+user+'$', 'i');
            if (user === '' || thing.querySelector('.sender').textContent.search(re) != -1) {
                things.push(thing);
                things.push(thing.nextElementSibling);
            }
        });
        loading.textContent = 'getting messages... [' + (things.length/2) + ']';
    }
})();
