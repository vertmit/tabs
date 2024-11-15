searchInput = document.getElementById('search');

document.getElementById("mainSearch").addEventListener("submit", function(event) {
    event.preventDefault();
});

searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const searchQuery = searchInput.value;
        window.location.href = `search?q=${searchQuery}`;
    }
});

const input = document.getElementById('search');

const searchdiv = document.getElementById("suggestionsbox");
let suggestions = document.getElementById("suggestions");
input.addEventListener('input', () => {
    
    suggestions.remove();

    suggestions = document.createElement("div");
    suggestions.id = "suggestions";
    searchdiv.appendChild(suggestions);

    if (input.value !== ""){
        let results = searchForQuery(input.value);
        for (let i = 0; i<8; i++) {
            let text = people[results[i]]["name"];
            if (!text) {
                break;
            }
            const suggestion = document.createElement("div");
            suggestion.classList.add("suggestion");
        
            const link = document.createElement("a");
            link.href = `/search?q=${text}`;
        
            const suggestionText = document.createElement("p");
            suggestionText.textContent = text
            suggestion.appendChild(suggestionText);
            link.appendChild(suggestion);
            suggestions.appendChild(link);
        }
    }
});




searchdiv.style.display = 'none';
input.addEventListener('focus', () => {
    searchdiv.style.display = 'block';
});

input.addEventListener('blur', () => {
    searchdiv.style.display = 'none';
});