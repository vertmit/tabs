console.log("loaded");
function searchForQuery(query){
    let possibleResults = [];
    for (let value of people) {
        let name = value["name"];
        if (name.toLowerCase().includes(query.toLowerCase())) {
            resultsPlaced = true;
            if (name.toLowerCase().startsWith(query)) {
                possibleResults.push([name, 2])
            }
            else if (name.split(" ")[1].toLowerCase().startsWith(query)) {
                possibleResults.push([name, 1])
            } 
            else {
                possibleResults.push([name, 0])
            }
            
        }
    }

    possibleResults.sort((a, b) => b[1]-a[1]);
    let results = [];
    for (let result of possibleResults) {
        results.push(result[0]);
    }
    return results;
}