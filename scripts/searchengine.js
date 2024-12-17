function getSuggestions(query){
    let possibleResults = [];
    let suggestions = {};
    let index = 0;
    for (let value of people) {
        try {
            let name = value["n"];
            if (name.toLowerCase().includes(query.toLowerCase())) {
                resultsPlaced = true;
                const namesplit = name.split(" ")
                if (namesplit[namesplit.length - 1].toLowerCase() === query.toLowerCase()) {
                    possibleResults.push([[name, index], 3])
                    let word = namesplit[namesplit.length - 1]
                    if (!word in suggestions){
                        suggestions[word] = 0;
                    }
                    suggestions[word]++;
                }
                else if (name.toLowerCase().startsWith(query.toLowerCase())) {
                    possibleResults.push([[name, index], 2])
                    let word = name.split(" ")[0];
                    if (!word in suggestions){
                        suggestions[word] = 0;
                    }
                    suggestions[word]++;
                }
                else if (namesplit[namesplit.length - 1].toLowerCase().startsWith(query.toLowerCase())) {
                    possibleResults.push([[name, index], 1]);
                    let word = namesplit[namesplit.length - 1]
                    if (!word in suggestions) {
                        suggestions[word] = 0;
                    }
                    suggestions[word]++;
                } 
                else {
                    possibleResults.push([[name, index], 0]);
                }
                
            }
            index ++;
        } catch (error) {
            console.log(`Suggestion failed to load from ${error}`)
        }
    }

    let sortedSuggestionsArray = Object.entries(suggestions);

    sortedSuggestionsArray.sort((a, b) => {
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
    return 0;
    });

    let sortedSuggestions = sortedSuggestionsArray.map(entry => entry[0]);

    possibleResults.sort((a, b) => b[1]-a[1]);
    let results = [];
    for (let suggestion of sortedSuggestions) {
        results.push([suggestion, 0]);
    }
    for (let result of possibleResults) {
        results.push([result[0][0], 1, result[0][1]]);
    }
    return results;
}

function search(query) {
    let possibleResults = [];
    let index = 0;
    for (let value of people) {
        try {
            let name = value.n;
            if (name.toLowerCase().includes(query.toLowerCase())) {
                resultsPlaced = true;
                const namesplit = name.split(" ")
                if (namesplit[namesplit.length - 1].toLowerCase() === query.toLowerCase()) {
                    possibleResults.push([[name, index], 3])
                }
                else if (name.toLowerCase().startsWith(query.toLowerCase())) {
                    possibleResults.push([[name, index], 2])
                }
                else if (namesplit[namesplit.length-1].toLowerCase().startsWith(query.toLowerCase())) {
                    possibleResults.push([[name, index], 1]);
                } 
                else {
                    possibleResults.push([[name, index], 0]);
                }
                
            }
            index ++;
        } catch (error) {
            console.log(`Result failed to load`, value, "from", error)
        }
    }

    let sortedSuggestionsArray = Object.entries(suggestions);

    sortedSuggestionsArray.sort((a, b) => {
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
    return 0;
    });

    let sortedSuggestions = sortedSuggestionsArray.map(entry => entry[0]);

    possibleResults.sort((a, b) => b[1]-a[1]);
    let results = [];
    for (let result of possibleResults) {
        results.push([result[0][0], 1, result[0][1]]);
    }
    return results;
}