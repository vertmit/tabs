const id = Number(urlParams.get('u'));

const profileContent = document.createElement("div");
profileContent.id = "pContent";

enlarged = document.getElementById("enlarged")
enlargedp = document.getElementById("enlargedp")
enlargedh3 = document.getElementById("enlargedh3")
enlargedpfp = document.getElementById("enlargedpfp")
enlargedclose = document.getElementById("enlargedclose")

function closeEnlarged() {
    enlarged.classList.remove("show");
    
    enlarged.classList.add("bye");
    sleep(100).then(() => { enlarged.classList.remove("bye"); showing=false; enlarged.classList.remove("pfp");});
}

enlargedclose.addEventListener("click", function() {
    closeEnlarged();
})

let disappear = false;
let showing = false;

document.addEventListener('click', function(event) {
    if (!enlarged.contains(event.target) && disappear && showing) {
        closeEnlarged();
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let otherDivs = [];
function addDiv(title, content="", backcontent="") {
    
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
    Div.addEventListener('click', (event) => {
        if (showing) {
            closeEnlarged();
            sleep(200).then(() => { 
                sleep(10).then(() => {enlarged.classList.add("show");})
                showing = true;
                enlargedp.textContent = content;
                enlargedh3.textContent = title;
            });
        } else {
            disappear = false;
            sleep(100).then(() => { disappear = true; });
            enlarged.classList.add("show");
            enlargedp.textContent = content;
            enlargedh3.textContent = title;
        }
        showing=true;
    });
    otherDivs.push(Div);
}

function formatecalendar(birthdate) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let numends = ["th","st", "nd", "rd", "th", "th", "th", "th", "th", "th"]
    return "The "+birthdate[0]+getnumbersuffex(birthdate[0])+" of "+months[birthdate[1]-1]+", "+birthdate[2];
}

function parsechip(chip) {
    if (chip.t === "default") {
        addDiv(chip.h, chip.c)
    }
    else if (chip.t === "birthdate") {
        addDiv(chip.h, formatecalendar(chip.c)+` (${calculateAge(chip.c[0],chip.c[1],chip.c[2])} years)`)
    }
    else if (chip.t === "calendar") {
        addDiv(chip.h, formatecalendar(chip.c))
    }
    else if (chip.t === "length") {
        addDiv(chip.h, `${chip.c.v} ${chip.c.u}`)
    }
    else if (chip.t === "weight") {
        addDiv(chip.h, `${chip.c.v} ${chip.c.u}`)
    }
    else if (chip.t === "family") {
        addDiv(chip.h, chip.c)
    }
    else if (chip.t === "interest") {
        addDiv(chip.h)
    }
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

function getnumbersuffex(number) {
    if (number%100<20 && number%100>10) {
        return "th"
    } else {
        return numends[number]
    }
}

if (people.length > id-1) {
    const persondata = people[id]
    const titleDiv = document.createElement("div");
    titleDiv.id = "titleDiv";

    profileContent.appendChild(titleDiv);

    const profilePic = document.createElement("img");
    if ("pfp" in persondata) {
        profilePic.src = persondata["pfp"];
    } else {
        if (persondata["gender"]){
            if (persondata["gender"] === "male") profilePic.src = "images/pfp/maleplaceholder.png";
            else if (persondata["gender"] === "female") profilePic.src = "images/pfp/femaleplaceholder.png";
        } else {
            profilePic.src = "images/pfp/maleplaceholder.png"
        }
    }

    profilePic.id = "pfp"
    profilePic.alt = persondata["n"]+"'s Profile Picture"
    titleDiv.appendChild(profilePic);
    enlargedpfp.src = profilePic.src;

    profilePic.addEventListener("click", function(event) {
        if (showing) {
            closeEnlarged();
            sleep(200).then(() => { 
                disappear = true;
                enlarged.classList.add("pfp");
                sleep(10).then(() => {enlarged.classList.add("show");})
                showing = true;
                
            });
        } else {
            disappear = false;
            sleep(100).then(() => { disappear = true; showing = true;});
            enlarged.classList.add("show");
            enlarged.classList.add("pfp");
            enlargedp.textContent = "";
            enlargedh3.textContent = "";
        }
        showing = true;
    });

    document.title = "Tabs Profile - "+persondata["n"];
    const title = document.createElement("h1");

    title.textContent = persondata["n"];
    title.id = "profileName";
    titleDiv.appendChild(title);

    const description = document.createElement("p");
    description.textContent = persondata["d"];
    description.id = "profileDes";
    profileContent.appendChild(description);
    console.log(persondata)
    for (let section of persondata["sections"]) {
        addHeading(section.t)
        for (let chip of section.c){
            parsechip(chip)
        }
        displayDivs()
    }
    
} 
else {
    document.title = "Tabs Profile - Person Not Found";
    const title = document.createElement("h1");
    title.textContent = "Profile not found";
    title.id = "profileNameNF";
    profileContent.appendChild(title);
}
document.getElementById("profileDiv").appendChild(profileContent);
