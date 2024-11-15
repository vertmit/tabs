function searchForQuery(query){
    let possibleResults = [];
    let suggestions = [];
    let index = 0;
    for (let value of people) {
        let name = value["name"];
        if (name.toLowerCase().includes(query.toLowerCase())) {
            resultsPlaced = true;
            if (name.toLowerCase().startsWith(query.toLowerCase())) {
                possibleResults.push([[name, index], 2])
                let word = name.split(" ")[0];
                if (!suggestions.includes(word)){
                    suggestions.push(word);
                }
            }
            else if (name.split(" ")[1].toLowerCase().startsWith(query.toLowerCase())) {
                possibleResults.push([[name, index], 1]);
                let word = name.split(" ")[1];
                if (!suggestions.includes(word)) {
                    suggestions.push(word);
                }
            } 
            else {
                possibleResults.push([[name, index], 0]);
            }
            
        }
        index ++;
    }

    possibleResults.sort((a, b) => b[1]-a[1]);
    let results = [];
    for (let suggestion of suggestions) {
        results.push([suggestion, 0]);
    }
    for (let result of possibleResults) {
        results.push([result[0][0], 1, result[0][1]]);
    }
    return results;
}