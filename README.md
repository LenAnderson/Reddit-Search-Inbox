# Reddit Search Inbox
UserScript for reddit. Search your inbox for specific users.

## Installation
You need to have a UserScript extension (e.g. Tampermonkey for Chrome, Greasemonkey for Firefox) installed to run this script.

[Install this UserScript](https://github.com/LenAnderson/Reddit-Search-Inbox/raw/master/reddit_search_inbox.user.js)

## Searching
The script searches case insensitive for full usernames ("myname" will find "MyName" and "myName" but not "myname123").
### Regular Expressions
You can use regular expressions (using [JavaScript syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Special_characters_meaning_in_regular_expressions) for more flexible searching. Some examples:
- `myname.*` will find "myname", "myname123", "mynames"...
- `myname\d+`will find "myname123" but not "myname" or "mynames"
- `myn[ao]me` will find "myname" and "mynome"
