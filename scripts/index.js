const input = document.getElementById('search');
const searchbardiv = document.getElementById('searchdiv');

const title = document.getElementById('logo');

const searchdiv = document.getElementById("suggestionsbox");

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
var mobile = detectMob();
const searchContent = document.createElement("div");
if (mobile){
    input.blur();
    
    const titleDiv = document.createElement("div");
    titleDiv.id = "titleDiv";

    searchContent.id = "searchContent";
    searchbardiv.id = "mobileSearch";
    title.classList.add("mobile")
    
    searchContent.appendChild(searchbardiv);
    titleDiv.appendChild(title);
    
    document.getElementById("container").appendChild(searchContent);
    document.getElementById("container").appendChild(titleDiv);
    
}
else {
    searchdiv.style.display = 'block';
}

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


let suggestions = document.getElementById("suggestions");
function addsuggestions() {
    suggestions.remove();

    suggestions = document.createElement("div");
    suggestions.id = "suggestions";
    searchdiv.appendChild(suggestions);

    if (input.value !== "" || mobile) {
        let results = searchForQuery(input.value);
        if (results.length > 0) {
            let amount = 8;
            if (mobile) {
                amount = 16;
            }
            results = results.slice(0, amount);
            for (let result of results) {
                let text = result[0];
                if (!text) {
                    break;
                }
                const suggestion = document.createElement("div");
                suggestion.classList.add("suggestion");
                const suggestionIcon = document.createElement("img");
                if (result[1] == 1) {
                    suggestionIcon.src = "images/icons/user.png";
                } else {
                    suggestionIcon.src = "images/icons/search.png";
                }
                suggestionIcon.classList.add("suggestionIcon");

                suggestion.appendChild(suggestionIcon);

                const link = document.createElement("a");
                if (result[1] == 1) {
                    link.href = `profile?q=${encodeURIComponent(input.value)}&u=${encodeURIComponent(result[2])}`;
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
}

if (mobile) {
    
    addsuggestions();
    searchdiv.style.display = "none";
}

input.addEventListener('input', () => {

    addsuggestions();
});


input.addEventListener('focus', () => {
    searchdiv.style.display = 'block';
    if (mobile) {
        searchContent.classList.add("searchtop")
        searchbardiv.classList.add("searchtop");
        title.style.display = "none";
    }
});

searchdiv.addEventListener('mousedown', (event) => {
    event.preventDefault();
    if (mobile) {
        searchbardiv.classList.add("searchtop");
        searchContent.classList.add("searchtop")
        title.style.display = "none";
    }
});

input.addEventListener('blur', () => {
    searchdiv.style.display = 'none';
    if (mobile) {
        searchbardiv.classList.remove("searchtop");
        searchContent.classList.remove("searchtop")
        title.style.display = "block";
    }
});