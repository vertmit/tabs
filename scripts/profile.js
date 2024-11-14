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

function formateBirthdaybirthdate(birthdate) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let numends = ["th","st", "nd", "rd", "th", "th", "th", "th", "th", "th"]
    return "The "+birthdate[0]+numends[birthdate[0]%10]+" of "+months[birthdate[1]-1]+", "+birthdate[2];
}

if (people.length > id-1) {
    const titleDiv = document.createElement("div");
    titleDiv.id = "titleDiv";

    profileContent.appendChild(titleDiv);

    const profilePic = document.createElement("img");
    profilePic.src = people[id]["pfp"];

    profilePic.id = "pfp"
    titleDiv.appendChild(profilePic);

    document.title = "Tabs Profile - "+people[id]["name"];
    const title = document.createElement("h1");

    title.textContent = people[id]["name"];
    title.id = "profileName";
    titleDiv.appendChild(title);

    const description = document.createElement("p");
    description.textContent = people[id]["dis"];
    description.id = "profileDes";
    profileContent.appendChild(description);
    if ("otherinfo" in people[id]){
        let birthdate = people[id]["otherinfo"]["birthdate"];
        addHeading("Other Information")
        if ("birthdate" in people[id]["otherinfo"]) addDiv("Birthdate", formateBirthdaybirthdate(birthdate) + " (" + calculateAge(birthdate[0], birthdate[1], birthdate[2]) + " years)");
        if ("gender" in people[id]["otherinfo"]) addDiv("Gender", people[id]["otherinfo"]["gender"]);
        if ("email" in people[id]["otherinfo"]) addDiv("Email", people[id]["otherinfo"]["email"]);
        if ("phone" in people[id]["otherinfo"]) addDiv("Phone", people[id]["otherinfo"]["phone"])
        if ("height" in people[id]["otherinfo"]) addDiv("Height", people[id]["otherinfo"]["height"]+" cm")
        if ("weight" in people[id]["otherinfo"]) addDiv("Weight", people[id]["otherinfo"]["weight"]+" kg")
        if ("address" in people[id]["otherinfo"]) addDiv("Address", people[id]["otherinfo"]["address"])
        if ("sexuality" in people[id]["otherinfo"]) addDiv("Sexuality", people[id]["otherinfo"]["sexuality"])
        displayDivs();
    }
    if ("family" in people[id]){
        
        if (people[id]["family"] != {}) {
            addHeading("Family");
            if ("mum" in people[id]["family"]) addDiv("Mum", people[id]["family"]["mum"]);
            if ("dad" in people[id]["family"]) addDiv("Dad", people[id]["family"]["dad"]);
            if ("brother" in people[id]["family"]) {
                for (let brother of people[id]["family"]["brother"]) {
                    addDiv("Brother", brother);
                }
            }
            if ("sister" in people[id]["family"]) {
                for (let sister of people[id]["family"]["sister"]) {
                    addDiv("Sister", sister);
                }
            }
            displayDivs();
        }
    }
    if ("interests" in people[id]) {
        addHeading("Interests");
        
        for (let interest of people[id]["interests"]) {
            addDiv(interest);
        } 
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