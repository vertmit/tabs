const id = Number(urlParams.get('u'));

const profileContent = document.createElement("div");
profileContent.id = "pContent";

let otherDivs = [];
function addDiv(title, content="") {
    
    const Div = document.createElement("div");
    Div.classList.add("profileOther");
    
    const h3 = document.createElement("h3");
    h3.textContent = title;
    Div.appendChild(h3);
    if (content) {
        const p = document.createElement("p");
        p.textContent = content;
        p.classList.add("profiletabp");
        Div.appendChild(p);
    }
    otherDivs.push(Div);
}

function addHeading(heading) {
    const h = document.createElement("h1");
    h.textContent = heading;
    h.classList.add("profileHead");
    profileContent.appendChild(h);
}

function displayDivs() {
    let rows = [];
    for (let i = 0; i < otherDivs.length / 2 + 0.5; i++) {
        const div = document.createElement("div");
        div.classList.add("profileFlex");
        rows.push(div);
    }
    for (let row = 0; row < otherDivs.length / 2; row++) {
        for (let column = 0; column < 2; column++) { 
            if (row*2 + column < otherDivs.length){
                rows[row].appendChild(otherDivs[row*2 + column]);
            }
        }
        profileContent.appendChild(rows[row]);
    }
    otherDivs = [];
}

function calculateAge(day, month, year) {
        const today = new Date();

        const birthDate = new Date(year, month - 1, day);

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
        }
        return age;
}


if (people.length > id-1) {
    const titleDiv = document.createElement("div");
    titleDiv.id = "titleDiv";

    profileContent.appendChild(titleDiv);

    const profilePic = document.createElement("img");
    if ("Male" === people[id][2]["gender"]){
        profilePic.src = "images/pfp/maleplaceholder.png";
    } else {
        profilePic.src = "images/pfp/femaleplaceholder.png";
    }
    profilePic.id = "pfp"
    titleDiv.appendChild(profilePic);

    document.title = "Tabs Profile - "+people[id][0];
    const title = document.createElement("h1");

    title.textContent = people[id][0];
    title.id = "profileName";
    titleDiv.appendChild(title);

    const description = document.createElement("p");
    description.textContent = people[id][1];
    description.id = "profileDes";
    profileContent.appendChild(description);

    
    let birthdate = people[id][2]["birthdate"]
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let numends = ["th","st", "nd", "rd", "th", "th", "th", "th", "th", "th"]
    
    
    addHeading("Other Information")
    addDiv("Birthdate", "The "+birthdate[0]+numends[birthdate[0]%10]+" of "+months[birthdate[1]-1]+", "+birthdate[2] + " (" + calculateAge(birthdate[0], birthdate[1], birthdate[2]) + " years)");
    addDiv("Gender", people[id][2]["gender"]);
    addDiv("Email", people[id][2]["email"]);
    addDiv("Phone", people[id][2]["phone"])
    addDiv("Height", people[id][2]["height"]+" cm")
    addDiv("Weight", people[id][2]["weight"]+" kg")
    addDiv("Address", people[id][2]["address"])
    addDiv("Sexuality", people[id][2]["sexuality"])
    displayDivs();

    addHeading("Family");
    addDiv("Mum", people[id][3]["mum"]);
    addDiv("Dad", people[id][3]["dad"]);
    for (let brother of people[id][3]["brother"]) {
        addDiv("Brother", brother);
    }
    for (let sister of people[id][3]["sister"]) {
        addDiv("Sister", sister);
    }
    displayDivs();

    addHeading("Interests");
    
    for (let interest of people[id][4]) {
        addDiv(interest);
    }
    displayDivs();
    
} else {
    document.title = "Tabs Profile - Person Not Found";
    const title = document.createElement("h1");
    title.textContent = "Profile not found";
    title.id = "profileNameNF";
    profileContent.appendChild(title);
}
document.getElementById("profileDiv").appendChild(profileContent);