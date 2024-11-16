document.title = 'Tabs Search - "' + searchQuery + '"';

function addDiv(content, description, index, gender) {
    const link = document.createElement('a');
    link.href = `profile?u=${index}&q=${searchQuery}`;

    const linkDiv = document.createElement('div');
    linkDiv.classList.add("linkDiv");
    link.appendChild(linkDiv);
    
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("nameDiv");
    linkDiv.appendChild(nameDiv);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add("searchContentDiv");
    linkDiv.appendChild(contentDiv);

    const newDiv = document.createElement('div');
    newDiv.classList.add('result');
    
    const profilePic = document.createElement("img");
    profilePic.src = people[index]["pfp"];
    profilePic.id = "searchPfp";
    nameDiv.appendChild(profilePic);
    
    const textDiv = document.createElement('div');

    const title = document.createElement('h3');
    title.textContent = content;
    nameDiv.appendChild(title);

    let descriptionText = description;
    if (descriptionText.length > 100) {
        descriptionText = descriptionText.slice(0, 96) + " ...";
    }
    
    const descriptionElem = document.createElement('p');
    descriptionElem.textContent = descriptionText;

    textDiv.appendChild(descriptionElem);
    contentDiv.appendChild(textDiv);

    newDiv.appendChild(link);
    document.getElementById('results').appendChild(newDiv);
}

let resultsPlaced = false;
let index = 0;
let possibleResults = [];
let resultsPerPage = 10;
let currentPage = 1;

for (let value of people) {
    let name = value["name"];
    if (name.toLowerCase().includes(searchQuery.toLowerCase())) {
        resultsPlaced = true;
        if (name.toLowerCase().startsWith(searchQuery)) {
            possibleResults.push([index, 2]);
        } else if (name.split(" ")[1]?.toLowerCase().startsWith(searchQuery)) {
            possibleResults.push([index, 1]);
        } else {
            possibleResults.push([index, 0]);
        }
    }
    index++;
}

possibleResults.sort((a, b) => b[1] - a[1]);

function loadResults(page) {
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;
    const resultsToDisplay = possibleResults.slice(start, end);

    resultsToDisplay.forEach((person) => {
        addDiv(
            people[person[0]]["name"],
            people[person[0]]["dis"],
            person[0],
            people[person[0]]["otherinfo"]["gender"]
        );
    });
}

if (resultsPlaced) {
    loadResults(currentPage);
    currentPage++;
} else {
    const newDiv = document.createElement("div");
    newDiv.id = "noResult";

    const noResults = document.createElement("p");
    noResults.textContent = "No results for " + searchQuery;

    newDiv.appendChild(noResults);

    const sorry = document.createElement("p");
    sorry.textContent = "Sorry to disappoint";

    newDiv.appendChild(sorry);

    const frown = document.createElement("img");
    frown.src = "images/icons/frown.svg";
    frown.alt = "Frowny Face";
    frown.id = "frown";

    newDiv.appendChild(frown);

    document.getElementById("results").appendChild(newDiv);
}

// Infinite scroll implementation
window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    // If the user has scrolled near the bottom, load more results
    if (scrollTop + clientHeight >= scrollHeight - 50 && currentPage * resultsPerPage <= possibleResults.length) {
        loadResults(currentPage);
        currentPage++;
    }
});
