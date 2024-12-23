document.title = 'Tabs Search - "' + searchQuery + '"';

function addDiv(content, description, index) {
    const link = document.createElement('a');
    link.href = `profile?u=${index}&q=${encodeURIComponent(searchQuery)}`;

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
    if (people[index].p) {
        console.log(people[index].p)
        profilePic.src = localStorage.getItem(people[index].p);
    } else {
        if (people[index]["gender"]){
            if (people[index]["gender"] === "male") profilePic.src = "images/pfp/maleplaceholder.png";
            else if (people[index]["gender"] === "female") profilePic.src = "images/pfp/femaleplaceholder.png";
        } else {
            profilePic.src = "images/pfp/maleplaceholder.png"
        }
    }
    profilePic.id = "searchPfp";
    nameDiv.appendChild(profilePic);

    const title = document.createElement('h3');
    title.textContent = content;
    nameDiv.appendChild(title);

    let descriptionText = description;
    if (descriptionText.length > 100) {
        descriptionText = descriptionText.slice(0, 96) + " ...";
    }
    
    const descriptionElem = document.createElement('p');
    descriptionElem.textContent = descriptionText;

    contentDiv.appendChild(descriptionElem);

    newDiv.appendChild(link);
    document.getElementById('results').appendChild(newDiv);
}

let resultsPlaced = false;
let index = 0;
let possibleResults = [];

for (let value of people) {
    let name = value["n"];
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

possibleResults = search(searchQuery);

if (resultsPlaced) {
    for (let result of possibleResults) {
        addDiv(people[result[2]]["n"],people[result[2]]["d"],result[2])
    }
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

    const subtitle = document.createElement("a")
    subtitle.textContent = `Add ${searchQuery}'s profile?`
    subtitle.href = `/add?q=${encodeURIComponent(searchQuery)}&n=${encodeURIComponent(searchQuery)}`
    subtitle.id = "addaccount"
    newDiv.appendChild(subtitle);

    document.getElementById("results").appendChild(newDiv);
}