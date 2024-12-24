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

let numends = ["th","st", "nd", "rd", "th", "th", "th", "th", "th", "th"]
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function formatecalendar(birthdate) {
    return "The "+birthdate[0]+getnumbersuffex(birthdate[0])+" of "+months[birthdate[1]-1]+", "+birthdate[2];
}

function parsechip(chip) {
    try {
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
    catch (error) {
        console.log(`Error found preventing a ${chip.t} from creation:\n    `+error)
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

let mousex = 0;
let mousey = 0;
document.addEventListener('mousemove', function(event) {
    mousex = event.clientX;
    mousey = event.clientY;
});

if (people.length > 0 && people.length > id-1) {
    const persondata = people[id]
    const titleDiv = document.createElement("div");
    titleDiv.id = "titleDiv";

    profileContent.appendChild(titleDiv);

    const profilePic = document.createElement("img");
    if (persondata.p) {
        profilePic.src = localStorage.getItem(persondata.p);
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
    if ("sections" in persondata){
        for (let section of persondata["sections"]) {
            addHeading(section.t)
            for (let chip of section.c){
                parsechip(chip)
            }
            displayDivs()
        }
    }
    const editbtn = document.createElement("img")
    editbtn.src = "images/icons/dots.png"
    editbtn.id = "edit"
    editbtn.title = "Edit"
    document.body.appendChild(editbtn)
    editbtn.addEventListener("click", ()=>{
        const unitholder = document.createElement("div");
        unitholder.addEventListener("mouseleave", ()=>{
            unitholder.remove()
        })
        unitholder.classList.add("dropdown")
        
        const editselect = document.createElement("div");
        editselect.classList.add("dropdownoption")
        editselect.textContent = "Edit";
        unitholder.appendChild(editselect);
        editselect.addEventListener("click", ()=>{
            window.location.href = `add?q=${encodeURIComponent(searchQuery)}&u=${id}`
            unitholder.remove()
        })

        const deleteselect = document.createElement("div");
        deleteselect.classList.add("dropdownoption")
        deleteselect.textContent = "delete";
        unitholder.appendChild(deleteselect);
        deleteselect.addEventListener("click", ()=>{
            const popupbg = document.createElement("div")
            popupbg.classList.add("popbg")

            const popup = document.createElement("div")
            popup.classList.add("popup")
            const title = document.createElement("h1")
            title.textContent = "Confirm Deletion"

            popup.appendChild(title)
            const areusure = document.createElement("p")
            const boldname = document.createElement("span")
            boldname.classList.add("bold")
            boldname.textContent = persondata.n
            areusure.innerHTML = "Are you sure you want to delete "+boldname.outerHTML+"?" 
            popup.appendChild(areusure)

            const btnholder = document.createElement("div")
            btnholder.classList.add("btnholder")

            const yesbtn = document.createElement("div")
            yesbtn.classList.add("btn")
            yesbtn.textContent = "Yes"
            btnholder.appendChild(yesbtn)

            yesbtn.addEventListener("click", ()=> {
                let data = JSON.parse(localStorage.getItem("tabspeople"))
                if ("p" in persondata){
                    const pfpsrc = persondata.p
                    let removepfp = true
                    let index = 0
                    for (let person of data) {
                        if (index !== id && person.p === pfpsrc) {
                            removepfp = false
                            break
                        }
                        index++;
                    }
                    if (removepfp) {
                        localStorage.removeItem(pfpsrc)
                    }
                }

                data.splice(id, 1);
                localStorage.setItem("tabspeople", JSON.stringify(data))
                
                window.location.reload()
            })

            const nobtn = document.createElement("div")
            nobtn.classList.add("btn")
            nobtn.textContent = "No"
            btnholder.appendChild(nobtn)
            nobtn.addEventListener("click", ()=> {
                popupbg.remove()
            })

            popup.appendChild(btnholder)
            popupbg.appendChild(popup)
            document.body.appendChild(popupbg)
            
        })
        
        document.body.appendChild(unitholder);
        unitholder.style.left = `${mousex-unitholder.offsetWidth+10}px`;
        unitholder.style.top = `${mousey+window.scrollY-10}px`;
    })
} 
else {
    document.title = "Tabs Profile - Person Not Found";
    const title = document.createElement("h1");
    title.textContent = "Profile not found";
    title.id = "profileNameNF";

    const subtitle = document.createElement("a")
    subtitle.textContent = "Add a profile?"
    subtitle.href = "/add"
    subtitle.id = "addaccount"

    profileContent.appendChild(title);
    profileContent.appendChild(subtitle);
}
document.getElementById("profileDiv").appendChild(profileContent);
