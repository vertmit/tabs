searchInput = document.getElementById('search');

document.getElementById("mainSearch").addEventListener("submit", function(event) {
    event.preventDefault();
});

searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const searchQuery = searchInput.value;
        window.location.href = `search?q=${encodeURIComponent(searchQuery)}`;
    }
});

const input = document.getElementById('search');
const searchbardiv = document.getElementById('searchdiv');

const title = document.getElementById('logo');

const searchdiv = document.getElementById("suggestionsbox");
let suggestions = document.getElementById("suggestions");
input.addEventListener('input', () => {

    suggestions.remove();

    suggestions = document.createElement("div");
    suggestions.id = "suggestions";
    searchdiv.appendChild(suggestions);

    if (input.value !== "") {
        let results = searchForQuery(input.value);
        if (results.length > 0) {
            for (let i = 0; i < 8; i++) {
                let text = results[i][0];
                if (!text) {
                    break;
                }
                const suggestion = document.createElement("div");
                suggestion.classList.add("suggestion");
                if (i === 7 || i === results.length-1) {
                    console.log("done");
                    suggestion.id = "bottom";
                }
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
    }
});


function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

var mobile = !detectMob();

if (mobile){
    input.blur()
}
else {
    searchdiv.style.display = 'block';
}
input.addEventListener('focus', () => {
    searchdiv.style.display = 'block';
    if (mobile) {
        searchbardiv.classList.add("searchtop");
        title.style.display = "none";
    }
});

searchdiv.addEventListener('mousedown', (event) => {
    event.preventDefault();
    if (mobile) {
        searchbardiv.classList.add("searchtop");
        title.style.display = "none";
    }
});

input.addEventListener('blur', () => {
    searchdiv.style.display = 'none';
    if (mobile) {
        searchbardiv.classList.remove("searchtop");
        title.style.display = "block";
    }
});