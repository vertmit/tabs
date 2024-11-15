document.title = 'Tabs Search - "'+searchQuery+'"';

function addDiv(content, discription, index, gender) {
    const link = document.createElement('a');
    link.href = `profile?u=${index}&q=${searchQuery}`;

    const linkDiv = document.createElement('div');
    linkDiv.class = "linkDiv";
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
    profilePic.id = "searchPfp"
    nameDiv.appendChild(profilePic);
    
    const textDiv = document.createElement('div');

    const title = document.createElement('h3');
    title.textContent = content;
    nameDiv.appendChild(title);

    let descriptionText = discription;
    if (descriptionText.length > 100) {
        descriptionText = descriptionText.slice(0, 96)+" ..."
    }
    
    const description = document.createElement('p');
    description.textContent = descriptionText;

    textDiv.appendChild(description);
    contentDiv.appendChild(textDiv);
    

    
    newDiv.appendChild(link);
    document.getElementById('results').appendChild(newDiv);
}

let resultsPlaced = false;
let index = 0;
let possibleResults = [];
for (let value of people) {
    let name = value["name"];
    if (name.toLowerCase().includes(searchQuery.toLowerCase())) {
        resultsPlaced = true;
        if (name.toLowerCase().startsWith(searchQuery)) {
            possibleResults.push([index, 2])
        }
        else if (name.split(" ")[1].toLowerCase().startsWith(searchQuery)) {
            possibleResults.push([index, 1])
        } 
        else {
            possibleResults.push([index, 0])
        }
        
    }
    index++;
}

possibleResults.sort((a, b) => b[1]-a[1]);

for (let person of possibleResults) {
    addDiv(people[person[0]]["name"], people[person[0]]["dis"], person[0], people[person[0]]["otherinfo"]["gender"]);
}

if (!resultsPlaced) {
    const newDiv = document.createElement('div');
    newDiv.id = 'noResult';

    const noResults = document.createElement('p');
        noResults.textContent = "No results for " + searchQuery;

    newDiv.appendChild(noResults);

    const sorry = document.createElement('p');
    sorry.textContent = "Sorry to disappoint";

    newDiv.appendChild(sorry);

    const frown = document.createElement('img');
    frown.src = "images/icons/frown.svg";
    frown.alt = "Frowny Face";
    frown.id = "frown";

    newDiv.appendChild(frown);

    document.getElementById('results').appendChild(newDiv);
}
else {
    const resultUnderPadding = document.createElement("div");
    resultUnderPadding.id = "resultsunder";
    document.getElementById('results').appendChild(resultUnderPadding);
}
