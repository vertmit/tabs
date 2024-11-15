const topSearchInput = document.getElementById('topSearch');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchQuery = decodeURIComponent(urlParams.get('q'));

topSearchInput.value = searchQuery;

document.getElementById("topSearchForm").addEventListener("submit", function(event) {
    event.preventDefault();
});

topSearchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const searchQuery = topSearchInput.value;
        window.location.href = `search?q=${encodeURIComponent(searchQuery)}`;
    }
    
});

const input = document.getElementById('topSearch');

const searchdiv = document.getElementById("suggestionsbox");
let suggestions = document.getElementById("suggestions");
input.addEventListener('input', () => {

    suggestions.remove();

    suggestions = document.createElement("div");
    suggestions.id = "suggestions";
    searchdiv.appendChild(suggestions);

    if (input.value !== "") {
        let results = searchForQuery(input.value);
        for (let i = 0; i < 8; i++) {
            let text = results[i][0];
            if (!text) {
                break;
            }
            const suggestion = document.createElement("div");
            suggestion.classList.add("suggestion");
            const suggestionIcon = document.createElement("img");
            if (results[i][1] == 1) {
                suggestionIcon.src = "images/icons/user.png";
            } else {
                suggestionIcon.src = "images/icons/search.png";
            }
            suggestionIcon.classList.add("suggestionIcon");

            suggestion.appendChild(suggestionIcon);

            const link = document.createElement("a");
            if (results[i][1] == 1) {
                link.href = `profile?q=${encodeURIComponent(input.value)}&u=${encodeURIComponent(results[i][2])}`;
            } else {
                link.href = `search?q=${encodeURIComponent(text)}`;
            }

            const suggestionText = document.createElement("p");
            suggestionText.textContent = text;
            suggestion.appendChild(suggestionText);
            link.appendChild(suggestion);
            suggestions.appendChild(link);
        }
    }
});

searchdiv.style.display = 'block';
input.addEventListener('focus', () => {
    searchdiv.style.display = 'block';
});

searchdiv.addEventListener('mousedown', (event) => {
    event.preventDefault();
});


input.addEventListener('blur', () => {
    searchdiv.style.display = 'none';
});