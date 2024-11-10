document.title = 'Tabs Search - "'+searchQuery+'"';

function addDiv(content, discription, index) {
  const link = document.createElement('a');
  link.href = `profile.html?u=${index}&q=${searchQuery}`;

  const linkDiv = document.createElement('div');
  linkDiv.class = "linkDiv";
  link.appendChild(linkDiv);
  
  const newDiv = document.createElement('div');
  newDiv.classList.add('result');
  
  const title = document.createElement('h3');
  title.textContent = content;

    linkDiv.appendChild(title);

  let descriptionText = discription;
  if (descriptionText.length > 100) {
    descriptionText = descriptionText.slice(0, 96)+" ..."
  }

  
  const description = document.createElement('p');
    description.textContent = descriptionText;

  linkDiv.appendChild(description);
  
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
  addDiv(people[person[0]][0], people[person[0]][1], person[0]);
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
