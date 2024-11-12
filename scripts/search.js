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
    if (gender === "Male"){
        profilePic.src = "images/pfp/m"+index%10+".jpeg";
    } else {
        profilePic.src = "images/pfp/f"+index%10+".jpeg";
    }
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
    if (value[0].toLowerCase().includes(searchQuery.toLowerCase())) {
        resultsPlaced = true;
        if (value[0].toLowerCase().startsWith(searchQuery)) {
            possibleResults.push([index, 2])
        }
        else if (value[0].split(" ")[1].toLowerCase().startsWith(searchQuery)) {
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
    addDiv(people[person[0]][0], people[person[0]][1], person[0], people[person[0]][2]["gender"]);
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
