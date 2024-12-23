let usearch = urlParams.get('u');
let edit = false
let profiledata = []
if (usearch !== null) {
    usearch = Number(usearch)
    if (profiledata.length > usearch - 1){
        edit = true
        profiledata = JSON.parse(localStorage.getItem("tabspeople"))[usearch]
        document.getElementById("nameInput").textContent = profiledata.n
        document.getElementById("nameInput").classList.remove("placeholder")
    }
}

let sectionname = []
if ("sections" in profiledata) {
    for (let section of profiledata.sections) {
        sectionname.push(section.t)
    }
}

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

var mobile = detectMob();
if (mobile){
    document.body.classList.add("mobile")
} else {
    document.body.classList.add("desktop")
}
const pfp = document.getElementById('pfp');

if (edit && "p" in profiledata) {
    pfp.src = localStorage.getItem(profiledata.p)
}
const pfpholder = document.getElementById('pfpholder');

const textEdit = document.getElementById('nameInput');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

textEdit.addEventListener("focus", () => {
    if (textEdit.classList.contains("placeholder")) {
        textEdit.textContent = "";
        textEdit.focus();
    }
    textEdit.classList.remove("placeholder")
});

textEdit.addEventListener("blur", () => {
    if (textEdit.textContent === "") {
        textEdit.textContent = "Profile Name";
        textEdit.classList.add("placeholder");
    }
})

pfpholder.addEventListener('click', function () {
    const input = document.createElement('input');
    input.type = 'file';

    input.accept = '.png, .jpg, .jpeg';
    input.click();

    input.onchange = function (event) {
        const files = event.target.files;
        const file = files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                // Create an image element to load the file
                const img = new Image();
                img.src = e.target.result;

                img.onload = function () {
                    // Create a canvas for cropping
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Determine the shortest side for a 1:1 crop
                    const shorterSide = Math.min(img.width, img.height);
                    const cropX = (img.width - shorterSide) / 2;
                    const cropY = (img.height - shorterSide) / 2;

                    // Set canvas size to the cropped area (1:1 aspect ratio)
                    canvas.width = shorterSide;
                    canvas.height = shorterSide;

                    // Draw the cropped image onto the canvas
                    ctx.drawImage(img, cropX, cropY, shorterSide, shorterSide, 0, 0, shorterSide, shorterSide);

                    // Convert the cropped image to a Data URL and set it as the `src` of the `pfp` element
                    pfp.src = canvas.toDataURL('image/jpeg');
                };
            };

            reader.readAsDataURL(file);
        }
    };
});


const descriptionInput = document.getElementById('descriptionInput');

const descriptionPlaceholderText = "This person could have a good description, add one."
if (!edit){
    descriptionInput.textContent = descriptionPlaceholderText;
    descriptionInput.classList.add("placeholder");
} else {
    descriptionInput.textContent = profiledata.d
}

descriptionInput.addEventListener("click", () => {
    if (descriptionInput.classList.contains("placeholder")) {
        descriptionInput.textContent = "";
    }
    descriptionInput.classList.remove("placeholder")
})

descriptionInput.addEventListener("blur", ()=>{
    if (descriptionInput.textContent === "") {
        descriptionInput.textContent = descriptionPlaceholderText;
        descriptionInput.classList.add("placeholder");
    }
})

const chipspots = document.getElementById("info").children

function resetchip(chip) {
    chip.id = null
    let childrentodelete = [];
    let index = 0;
    for (let child of chip.children) {
        if (!child.classList.contains("preventdelete")){
            childrentodelete.push(index);
        }
        index++;
    }
    childrentodelete.reverse()
    for (let child of childrentodelete) {
        chip.removeChild(chip.children[child]);

    }
}
let numends = ["th","st", "nd", "rd", "th", "th", "th", "th", "th", "th"]

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

const datecalc = new Date();

function replacebithdatechip(addeddiv, date= [datecalc.getDate(), datecalc.getMonth()+1, datecalc.getFullYear()]) {
    resetchip(addeddiv)
    addeddiv.id = "birthdate"
    const chipheader = document.createElement("div")
    chipheader.textContent = "Birthdate"
    chipheader.classList.add("chipheader")
    addeddiv.appendChild(chipheader)

     

    const birthdateholder = document.createElement("div")
    birthdateholder.classList.add("chipheadcontent")
    birthdateholder.classList.add("birthdayholder")
    birthdateholder.textContent = "The "+date[0]+getnumbersuffex(date[0])+" of "+months[date[1]-1]+", "+date[2]+" ("+calculateAge(date[0],date[1],date[2])+" years)";
    birthdateholder.id = `${date[0]},${date[1]},${date[2]}`
    birthdateholder.addEventListener("click", async ()=>{
        const newdate = await displaycalendar(date[0], date[1], date[2])
        if (newdate) {
            date = newdate;
            birthdateholder.textContent = "The "+date[0]+getnumbersuffex(date[0])+" of "+months[date[1]-1]+", "+date[2]+" ("+calculateAge(date[0],date[1],date[2])+" years)";
            birthdateholder.id = `${date[0]},${date[1]},${date[2]}`
        }

    })

    addeddiv.appendChild(birthdateholder)
}

function replacecalendarchip(addeddiv, title="", date = [datecalc.getDate(), datecalc.getMonth()+1, datecalc.getFullYear()]) {
    resetchip(addeddiv)
    addeddiv.id = "calendar"
    const chipheader = document.createElement("div")
    if (title!=="") {
        chipheader.textContent = title
    } else {
        chipheader.textContent = "Event name"
        chipheader.classList.add("placeholder")
    }
    
    chipheader.contentEditable = true;
    chipheader.classList.add("chipheader")
    

    chipheader.addEventListener("focus", ()=>{
        if (chipheader.classList.contains("placeholder")) {
            chipheader.textContent = ""
            chipheader.classList.remove("placeholder")
        }
        chipheader.focus()
    })

    chipheader.addEventListener("blur", ()=>{
        if (chipheader.textContent === "") {
            chipheader.textContent = "Event name"
            chipheader.classList.add("placeholder")
        }
    })
    addeddiv.appendChild(chipheader)

    const birthdateholder = document.createElement("div")
    birthdateholder.classList.add("chipheadcontent")
    birthdateholder.classList.add("birthdayholder")
    birthdateholder.textContent = "The "+date[0]+getnumbersuffex(date[0])+" of "+months[date[1]-1]+", "+date[2];
    birthdateholder.id = `${date[0]},${date[1]},${date[2]}`
    birthdateholder.addEventListener("click", async ()=>{
        const newdate = await displaycalendar(date[0], date[1], date[2])
        if (newdate) {
            date = newdate;
            birthdateholder.textContent = "The "+date[0]+getnumbersuffex(date[0])+" of "+months[date[1]-1]+", "+date[2];
            birthdateholder.id = `${date[0]},${date[1]},${date[2]}`
        }

    })

    addeddiv.appendChild(birthdateholder)
}

function replacedefaultchip(addeddiv, title="", content="") {
    resetchip(addeddiv)
    addeddiv.id = "default"
    const chipheader = document.createElement("div")
    chipheader.contentEditable = true;
    chipheader.classList.add("chipheader")
    if (title !=="") {
        chipheader.textContent = title
    }
    else {
        chipheader.textContent = "This is a header"
        chipheader.classList.add("placeholder")
    }

    chipheader.addEventListener("focus", ()=>{
        if (chipheader.classList.contains("placeholder")) {
            chipheader.textContent = ""
            chipheader.classList.remove("placeholder")
        }
        chipheader.focus()
    })

    chipheader.addEventListener("blur", ()=>{
        if (chipheader.textContent === "") {
            chipheader.textContent = "This is a header"
            chipheader.classList.add("placeholder")
        }
    })

    const chipheadcontent = document.createElement("div")
    chipheadcontent.contentEditable = true;
    chipheadcontent.classList.add("chipheadcontent")
    if (content !== "") {
        chipheadcontent.textContent = content
    }
    else { 
        chipheadcontent.textContent = "And this is the content the header is presenting."
        chipheadcontent.classList.add("placeholder")
    }
    

    chipheadcontent.addEventListener("focus", ()=>{
        if (chipheadcontent.classList.contains("placeholder")) {
            chipheadcontent.textContent = ""
            chipheadcontent.classList.remove("placeholder")
        }
        chipheadcontent.focus()
    })

    chipheadcontent.addEventListener("blur", ()=>{
        if (chipheadcontent.textContent === "") {
            chipheadcontent.textContent = "And this is the content the header is presenting."
            chipheadcontent.classList.add("placeholder")
        }
    })

    addeddiv.appendChild(chipheader)
    addeddiv.appendChild(chipheadcontent)
}

function replacefamilychip(addeddiv, title="", content="") {
    resetchip(addeddiv)
    addeddiv.id = "family"
    const chipheader = document.createElement("div")
    if (title!=="") {
        chipheader.textContent = title
    } else {
        chipheader.textContent = "Family member type"
        chipheader.classList.add("placeholder")
    }
    
    chipheader.contentEditable = true;
    chipheader.classList.add("chipheader")
    
    chipheader.addEventListener("focus", ()=>{
        if (chipheader.classList.contains("placeholder")) {
            chipheader.textContent = ""
            chipheader.classList.remove("placeholder")
        }
        chipheader.focus()
    })

    chipheader.addEventListener("blur", ()=>{
        if (chipheader.textContent === "") {
            chipheader.textContent = "Family member type"
            chipheader.classList.add("placeholder")
        }
    })

    const chipheadcontent = document.createElement("div")
    if (content!=="") {
        chipheadcontent.textContent = content
    } else {
        chipheadcontent.textContent = "Family member name"
        chipheadcontent.classList.add("placeholder")
    }
    
    chipheadcontent.contentEditable = true;
    chipheadcontent.classList.add("chipheadcontent")
    

    chipheadcontent.addEventListener("focus", ()=>{
        if (chipheadcontent.classList.contains("placeholder")) {
            chipheadcontent.textContent = ""
            chipheadcontent.classList.remove("placeholder")
        }
        chipheadcontent.focus()
    })

    chipheadcontent.addEventListener("blur", ()=>{
        if (chipheadcontent.textContent === "") {
            chipheadcontent.textContent = "Family member name"
            chipheadcontent.classList.add("placeholder")
        }
    })

    addeddiv.appendChild(chipheader)
    addeddiv.appendChild(chipheadcontent)
}

function replaceinterestchip(addeddiv, interest="") {
    resetchip(addeddiv)
    addeddiv.id = "interest"
    const chipheader = document.createElement("div")
    if (interest !== "") {
        chipheader.textContent = interest
    }
    else {
        chipheader.classList.add("placeholder")
        chipheader.textContent = "Interest"
    }
    chipheader.contentEditable = true;
    chipheader.classList.add("chipheader")
    

    chipheader.addEventListener("focus", ()=>{
        if (chipheader.classList.contains("placeholder")) {
            chipheader.textContent = ""
            chipheader.classList.remove("placeholder")
        }
        chipheader.focus()
    })

    chipheader.addEventListener("blur", ()=>{
        if (chipheader.textContent === "") {
            chipheader.textContent = "Interest"
            chipheader.classList.add("placeholder")
        }
    })

    addeddiv.appendChild(chipheader)
}

const lengthunits = ["cm", "mm", "m", "km", "ft", "in", "yd", "mi"]
function replacelengthchip(addeddiv, title="", content="", unit="") {
    resetchip(addeddiv)
    addeddiv.id = "length"
    const chipheader = document.createElement("div")
    chipheader.classList.add("chipheader")
    chipheader.contentEditable = true;
    if (title !=="") {
        chipheader.textContent = title
    }
    else {
        chipheader.textContent = "What Measurement"
        chipheader.classList.add("placeholder")
    }
    
    chipheader.addEventListener("focus", ()=>{
        if (chipheader.classList.contains("placeholder")) {
            chipheader.textContent = ""
            chipheader.classList.remove("placeholder")
        }
        chipheader.focus()
    })

    chipheader.addEventListener("blur", ()=>{
        if (chipheader.textContent === "") {
            chipheader.textContent = "What Measurement"
            chipheader.classList.add("placeholder")
        }
    })
    const measurementholder = document.createElement("div");
    measurementholder.classList.add("mholder")

    const unitdisplay = document.createElement("div");
    unitdisplay.classList.add("munit")
    if (unit!=="") {
        unitdisplay.textContent = unit
    } else {
        unitdisplay.textContent = "cm"
    }

    unitdisplay.addEventListener("click", ()=>{
        const unitholder = document.createElement("div");
        unitholder.addEventListener("mouseleave", ()=>{
            unitholder.remove()
        })
        unitholder.classList.add("muholder")
        unitholder.style.left = `${mousex}px`;
        unitholder.style.top = `${mousey+window.scrollY}px`;

        for (let unit of lengthunits) {
            const unitselect = document.createElement("div");
            unitselect.classList.add("unitselection")
            unitselect.textContent = unit;
            unitholder.appendChild(unitselect);
            unitselect.addEventListener("click", ()=>{
                unitdisplay.textContent = unit
                unitholder.remove()
            })
        }
        document.body.appendChild(unitholder);
    })

    const chipheadcontent = document.createElement("div")
    if (content !== "") {
        chipheadcontent.textContent = content
    }
    else {
        chipheadcontent.textContent = 100
    }
    chipheadcontent.contentEditable = true;
    chipheadcontent.classList.add("chipheadcontent")
    measurementholder.appendChild(chipheadcontent)
    measurementholder.appendChild(unitdisplay)

    chipheadcontent.addEventListener("focus", ()=>{
        chipheadcontent.focus()
    })

    chipheadcontent.addEventListener("blur", ()=>{
        if (chipheadcontent.textContent === "") {
            chipheadcontent.textContent = 100
            

        }
    })

    addeddiv.appendChild(chipheader)
    addeddiv.appendChild(measurementholder)
}
const weightunits = ["kg", "g", "t", "lb", "oz", "st"]
function replaceweightchip(addeddiv, title="", content="", unit="") {
    resetchip(addeddiv)
    addeddiv.id = "weight"
    const chipheader = document.createElement("div")
    if (title !=="") {
        chipheader.textContent = title
    } else {
        chipheader.textContent = "What Measurement"
        chipheader.classList.add("placeholder")
    }
    
    chipheader.contentEditable = true;
    chipheader.classList.add("chipheader")
    

    chipheader.addEventListener("focus", ()=>{
        if (chipheader.classList.contains("placeholder")) {
            chipheader.textContent = ""
            chipheader.classList.remove("placeholder")
        }
        chipheader.focus()
    })

    chipheader.addEventListener("blur", ()=>{
        if (chipheader.textContent === "") {
            chipheader.textContent = "What Measurement"
            chipheader.classList.add("placeholder")
        }
    })
    const measurementholder = document.createElement("div");
    measurementholder.classList.add("mholder")

    const unitdisplay = document.createElement("div");
    unitdisplay.classList.add("munit")
    if (unit !== "") {
        unitdisplay.textContent = unit
    }
    else {
        unitdisplay.textContent = "kg"
    }   
    unitdisplay.addEventListener("click", ()=>{
        const unitholder = document.createElement("div");
        unitholder.addEventListener("mouseleave", ()=>{
            unitholder.remove()
        })
        unitholder.classList.add("muholder")
        unitholder.style.left = `${mousex}px`;
        unitholder.style.top = `${mousey+window.scrollY}px`;

        for (let unit of weightunits) {
            const unitselect = document.createElement("div");
            unitselect.classList.add("unitselection")
            unitselect.textContent = unit;
            unitholder.appendChild(unitselect);
            unitselect.addEventListener("click", ()=>{
                unitdisplay.textContent = unit
                unitholder.remove()
            })
        }
        document.body.appendChild(unitholder);
    })

    const chipheadcontent = document.createElement("div")
    if (content!=="") {
        chipheadcontent.textContent = content
    } else {
        chipheadcontent.textContent = 100
    }
    chipheadcontent.contentEditable = true;
    chipheadcontent.classList.add("chipheadcontent")
    measurementholder.appendChild(chipheadcontent)
    measurementholder.appendChild(unitdisplay)

    chipheadcontent.addEventListener("focus", ()=>{
        chipheadcontent.focus()
    })

    chipheadcontent.addEventListener("blur", ()=>{
        if (chipheadcontent.textContent === "") {
            chipheadcontent.textContent = 100
        }
    })

    addeddiv.appendChild(chipheader)
    addeddiv.appendChild(measurementholder)
}

const avaliablepresets = {
    "otherinfo":["default", "birthdate", "length", "weight", "calendar"],
    "family":["family"],
    "interests":["interest"],
}
let mousex = 0;
let mousey = 0;
document.addEventListener('mousemove', function(event) {
    mousex = event.clientX;
    mousey = event.clientY;
});

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let monthsamounts = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
function getmonthamount(month, year) {
    if (month === 2) {
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
            return 29;
        } else {
            return 28;
        }
    } else {
        return monthsamounts[month-1]
    }
}

function getStartingDayOfMonth(year, month) {
    const firstDay = new Date(year, month, 1);
    
    return (firstDay.getDay()+10)%7;
}

function displaycalendar(day, month, year) {
    return new Promise((resolve) => {
        let selectedmonth = month;
        let selectedyear = year;
        let selectedday = day;
        const container = document.createElement("div")
        container.classList.add("calendar")
        if (!mobile){
            container.style.left = `${mousex}px`;
        }
        container.style.top = `${mousey+window.scrollY-40}px`;
        const topbar = document.createElement("div")
        topbar.classList.add("caltop")
        const finishbtn = document.createElement("img")
        finishbtn.classList.add("calfinishbtn")
        finishbtn.src = "images/icons/check.png"
        finishbtn.addEventListener("click", ()=>{
            container.remove()
            resolve([selectedday, selectedmonth, selectedyear]); 
        })
        topbar.appendChild(finishbtn)
        if (mobile) {
            const closebtn = document.createElement("img")
            closebtn.classList.add("calclosebtn")
            closebtn.src = "images/icons/close.png"
            closebtn.addEventListener("click", ()=>{
                container.remove()
                resolve(null); 
            })
            topbar.appendChild(closebtn)
        }
        const yeardisplay = document.createElement("input")
        yeardisplay.type = "number"
        yeardisplay.classList.add("calyear")
        yeardisplay.value = year;
        yeardisplay.id="year"
        let yearinputting = false;
        yeardisplay.addEventListener("mousedown", ()=>{
            yearinputting = true;
        })
        yeardisplay.addEventListener("blur", ()=>{
            yearinputting = false;
        })
        yeardisplay.addEventListener("input", ()=>{
            selectedyear = yeardisplay.value
            makedays(selectedyear, selectedmonth, selectedday)
        })
        topbar.appendChild(yeardisplay)
        const monthselector = document.createElement("div")
        monthselector.style.display = "none"
        monthselector.classList.add("calmonthselect")
        let monthhover = true;
        monthselector.addEventListener("mouseenter", ()=>{
            monthhover = true
        })
        monthselector.addEventListener("mouseleave", ()=>{
            monthhover = false
        })
        for (let monthindex = 0; monthindex<months.length; monthindex++){
            const monthbutton = document.createElement("div")
            monthbutton.classList.add("calmonthselectbtn")
            monthbutton.textContent = months[monthindex]
            monthbutton.id = monthindex+1
            monthselector.appendChild(monthbutton)
            if (monthindex+1 === month) {
                monthbutton.classList.add("calmonthselected");
            }
            monthbutton.addEventListener("click", ()=>{
                selectedmonth=Number(monthbutton.id)
                for (let monthelement of monthselector.children) {
                    monthelement.classList.remove("calmonthselected");
                }
                monthselector.style.display = "none"
                monthbutton.classList.add("calmonthselected");
                monthdisplay.textContent=months[selectedmonth-1]
                makedays(selectedyear, selectedmonth, selectedday)
            })
        }
        topbar.appendChild(monthselector)
        const monthnavnav = document.createElement("div");
        monthnavnav.classList.add("monthnav")

        const leftmontharrow = document.createElement("img");
        leftmontharrow.src = "images/icons/triangle.png"
        leftmontharrow.classList.add("montharrow")
        leftmontharrow.classList.add("left")
        

        monthnavnav.appendChild(leftmontharrow)

        const monthdisplay = document.createElement("div")
        monthdisplay.classList.add("calmonth")
        monthdisplay.textContent=months[month-1]
        monthnavnav.appendChild(monthdisplay)
        leftmontharrow.addEventListener("click",()=>{
            selectedmonth -= 1;
            if (selectedmonth < 1) {
                selectedmonth = 12
                selectedyear = Number(selectedyear)-1;
                yeardisplay.value = selectedyear
            }
            monthdisplay.textContent = months[selectedmonth-1]
            makedays(selectedyear, selectedmonth, selectedday)
        })
        
        monthdisplay.addEventListener("click", ()=>{
            monthselector.style.display = "flex"
            monthhover = true;
        })

        container.addEventListener("click", ()=>{
            if (!monthhover) {
                monthselector.style.display = "none"
               
            }
        })
        
        topbar.appendChild(monthnavnav)
        const rightmontharrow = document.createElement("img");
        rightmontharrow.src = "images/icons/triangle.png"
        rightmontharrow.classList.add("montharrow")
        rightmontharrow.classList.add("right")
        rightmontharrow.addEventListener("click",()=>{
            selectedmonth += 1;
            if (selectedmonth > 12) {
                selectedmonth = 1
                selectedyear = Number(selectedyear)+1;
                yeardisplay.value = selectedyear
            }
            monthdisplay.textContent = months[selectedmonth-1]
            makedays(selectedyear, selectedmonth, selectedday)
        })
        
        monthnavnav.appendChild(rightmontharrow)
        container.appendChild(topbar)
        const dayholder = document.createElement("div")
        dayholder.classList.add("caldayhold")
        function makedays(year, month, day) {
            while(dayholder.firstChild) {
                dayholder.firstChild.remove()
            }
            if (day>getmonthamount(month, year)) {
                selectedday = getmonthamount(month, year)
                day = selectedday
            }
            for (let daynum = 1; daynum< getmonthamount(month, year)+1; daynum++)  {
                const daydisplay =  document.createElement("div");
                daydisplay.classList.add("calday")
                if (selectedday === daynum) {
                    daydisplay.classList.add("caldayselected")
                }
                daydisplay.addEventListener("click", ()=>{
                    for (let dayelement of dayholder.children) {
                        dayelement.classList.remove("caldayselected");
                    }
                    daydisplay.classList.add("caldayselected")
                    selectedday = Number(daydisplay.textContent)
                })
                daydisplay.textContent = daynum;
                dayholder.appendChild(daydisplay);
            }
        }
        makedays(year, month)
        container.appendChild(dayholder)
        document.body.appendChild(container)
        let containerhover = true
        let start = true;
        container.addEventListener("mouseleave", ()=>{
            containerhover = false
        }) 
        document.addEventListener("click", ()=>{
            if (!start || mobile) {
                if (!containerhover) {
                    container.remove()
                    resolve(null);
                }
            } else {
                start = false
            }
        })
        container.addEventListener("mouseenter", ()=>{
            containerhover=true
        })
        if (!mobile){
            let offsetX = 0, offsetY = 0;
            let isDragging = false;

            topbar.addEventListener('mousedown', (e) => {
                if (!yearinputting){
                    isDragging = true;
                    offsetX = e.clientX - container.offsetLeft;
                    offsetY = e.clientY - container.offsetTop;

                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                }
            });

            function onMouseMove(e) {
                if (!isDragging) return;
                container.style.left = (e.clientX - offsetX) + 'px';
                container.style.top = (e.clientY - offsetY) + 'px';
            }

            function onMouseUp() {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
        }
    })
}

// t=type h=heading c=content u=unit
function parsechipdata(chip) {
    const headingelement = chip.getElementsByClassName("chipheader")
    const contentelement = chip.getElementsByClassName("chipheadcontent")
    let heading = ""
    let content = ""
    if (headingelement.length > 0) {
        heading = headingelement[0].textContent
    }
    if (contentelement.length > 0) {
        content = contentelement[0].textContent
    }

    if (chip.id === "birthdate") {
        const date = chip.getElementsByClassName("chipheadcontent")[0].id.split(",")
        let processeddate = []
        for (let value of date) {
            processeddate.push(Number(value))
        }
        return {"t":"birthdate", "h":"Birthdate", "c":processeddate}
    }
    else if (chip.id === "calendar") {
        const date = chip.getElementsByClassName("chipheadcontent")[0].id.split(",")
        let processeddate = []
        for (let value of date) {
            processeddate.push(Number(value))
        }
        return {"t":"calendar", "h":heading, "c":processeddate}
    }
    else if (chip.id === "default") {
        return {"t":"default", "h":heading, "c":content}
    }
    else if (chip.id === "length") {
        return {"t":"length", "h":heading, "c":{"v":Number(chip.getElementsByClassName("chipheadcontent")[0].textContent), "u":chip.getElementsByClassName("munit")[0].textContent}}
    }
    else if (chip.id === "weight") {
        return {"t":"weight", "h":heading, "c":{"v":Number(chip.getElementsByClassName("chipheadcontent")[0].textContent), "u":chip.getElementsByClassName("munit")[0].textContent}}
    } 
    else if (chip.id === "family") {
        return {"t":"family", "h":heading, "c":content}
    }
    else if (chip.id === "interest") {
        return {"t":"interest", "h":heading}
    }
    return null
}

function addchip(chiparea, element) {
    const addeddiv = document.createElement("div")
    addeddiv.classList.add("infochip")

    const presetsdropdown = document.createElement("div");
    presetsdropdown.classList.add("preventdelete")
    presetsdropdown.classList.add("presetsdropdown");

    addeddiv.appendChild(presetsdropdown);

    const threedots = document.createElement("div");
    threedots.classList.add("preventdelete")
    
    threedots.classList.add("presetsbutton")

    const threedotsicon = document.createElement("img");
    threedotsicon.src = "images/icons/dots.png";
    threedots.appendChild(threedotsicon)

    const presetsinfo = document.createElement("div");
    presetsinfo.classList.add("preventdelete")
    presetsinfo.textContent = "Other";
    presetsinfo.classList.add("presetsinfo")
    threedots.appendChild(presetsinfo)

    threedotsicon.addEventListener("mouseenter", ()=>{
        threedots.classList.add("hovering");
        sleep(1000).then(()=>{
            if (threedots.classList.contains("hovering")){
                presetsinfo.style.opacity = 1;
            }
        })
    })

    threedotsicon.addEventListener("mouseleave", ()=>{
        threedots.classList.remove("hovering");
        presetsinfo.style.opacity = 0;
    })

    threedotsicon.addEventListener("click", ()=>{
        presetsdropdown.style.display = "block";
        presetsdropdown.style.opacity = 1;
    })

    presetsdropdown.addEventListener("mouseleave", ()=>{
        presetsdropdown.style.opacity = 0;
        sleep(100).then(()=>{presetsdropdown.style.display = "none";})   
    })

    presetsdropdown.addEventListener("click", ()=>{
        presetsdropdown.style.opacity = 0;
        sleep(100).then(()=>{presetsdropdown.style.display = "none";})   
    })

    const deleteoption = document.createElement("div");
    deleteoption.classList.add("presetsoption");
    deleteoption.textContent = "Delete"

    deleteoption.addEventListener("click", ()=>{
        addeddiv.remove()
    })

    addeddiv.appendChild(threedots)

    if (chiparea.id && avaliablepresets[chiparea.id].length>1){
        if (avaliablepresets[chiparea.id].includes("default")){
            const defaultpreset = document.createElement("div");
            defaultpreset.classList.add("presetsoption");
            defaultpreset.textContent = "Default"

            defaultpreset.addEventListener("click", ()=>{
                replacedefaultchip(addeddiv)
            })
            presetsdropdown.appendChild(defaultpreset)
        }
        if (avaliablepresets[chiparea.id].includes("birthdate")){
            const birthdatepreset = document.createElement("div");
            birthdatepreset.classList.add("presetsoption");
            birthdatepreset.textContent = "Birthdate"

            birthdatepreset.addEventListener("click", ()=>{
                replacebithdatechip(addeddiv)
            })
            presetsdropdown.appendChild(birthdatepreset)
        }

        if (avaliablepresets[chiparea.id].includes("calendar")){
            const calendarpreset = document.createElement("div");
            calendarpreset.classList.add("presetsoption");
            calendarpreset.textContent = "calendar"

            calendarpreset.addEventListener("click", ()=>{
                replacecalendarchip(addeddiv)
            })
            presetsdropdown.appendChild(calendarpreset)
        }


        if (avaliablepresets[chiparea.id].includes("family")){
            const familypreset = document.createElement("div");
            familypreset.classList.add("presetsoption");
            familypreset.textContent = "Fam member"

            familypreset.addEventListener("click", ()=>{
                replacefamilychip(addeddiv)
            })
            presetsdropdown.appendChild(familypreset)
        }

        if (avaliablepresets[chiparea.id].includes("length")) {
            const lengthpreset = document.createElement("div");
            lengthpreset.classList.add("presetsoption");
            lengthpreset.textContent = "Length"

            lengthpreset.addEventListener("click", ()=>{
                replacelengthchip(addeddiv)
            })
            presetsdropdown.appendChild(lengthpreset)
        }

        if (avaliablepresets[chiparea.id].includes("weight")) {
            const weightpreset = document.createElement("div");
            weightpreset.classList.add("presetsoption");
            weightpreset.textContent = "Weight"

            weightpreset.addEventListener("click", ()=>{
                replaceweightchip(addeddiv)
            })
            presetsdropdown.appendChild(weightpreset)
        }
    }
    presetsdropdown.appendChild(deleteoption)
    if (chiparea.id && avaliablepresets[chiparea.id].length>0){
        if (avaliablepresets[chiparea.id][0] === "default") {
            replacedefaultchip(addeddiv);
        } 
        else if (avaliablepresets[chiparea.id][0] === "family") {
            replacefamilychip(addeddiv)
        } else if (avaliablepresets[chiparea.id][0] === "interest") {
            replaceinterestchip(addeddiv)
        }
    } 
    else {
        replacedefaultchip(addeddiv);
    }

    chiparea.appendChild(addeddiv)
    chiparea.appendChild(element)
    return addeddiv
}

function hashString(string) {
    string = String(string)
    let hash = 0;

    if (string.length == 0) return hash;

    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return hash;
}

function viewerror(error) {
    console.log(error);
    if (mobile) {
        const viewpopup = document.createElement("div")
        viewpopup.classList.add("popup")
        viewpopup.textContent = "View Error"
        viewpopup.addEventListener("click", ()=>{
            const consoleview = document.createElement("div")
            consoleview.classList.add("console")
            consoleview.textContent = error
            
            const exit = document.createElement("div")
            exit.textContent = "[X]"
            exit.classList.add("exit")

            exit.addEventListener("click", ()=>{
                consoleview.remove()
            })

            consoleview.appendChild(exit)
            document.body.appendChild(consoleview)
        })
        document.body.appendChild(viewpopup)
        sleep(1).then(()=>{
            viewpopup.classList.add("view")
        })
        sleep(3000).then(()=>{
            viewpopup.classList.remove("view")
            sleep(250).then(()=>{
                viewpopup.remove()
            })
        })
    }
}

// localStorage.setItem('tabspeople', JSON.stringify([]));
const addbutton = document.getElementById("addbutton")
if (edit) {
    addbutton.textContent = "Confirm Changes"
}
addbutton.addEventListener("click", () => {
    if (!addbutton.classList.contains("adding")){
        try {
            addbutton.textContent = "Adding Profile"
            if (edit) {
                addbutton.textContent = "Editing Profile"
            }
            
            addbutton.classList.add("adding")
            let existingpeople = []
            const localStoragepeople = localStorage.getItem("tabspeople")
            if (localStoragepeople) {
                existingpeople = JSON.parse(localStoragepeople)
            }
            let addingdate = {}
            addingdate.n = textEdit.textContent
            addingdate.d = descriptionInput.textContent
            let pfplocation = `pfp:${hashString(pfp.src)}`
            localStorage.setItem(pfplocation, pfp.src)
            addingdate.p = pfplocation

            let sections = []
            let infosections = document.getElementById("info").getElementsByClassName("infosection")
            for (let infosection of infosections) {
                let chips = []
                for (let chip of infosection.getElementsByClassName("chipspot")[0].children) {
                    let chipdata = parsechipdata(chip)
                    if (chipdata) {
                        chips.push(chipdata)
                    }
                }
                if (chips.length > 0) {
                    sections.push({"t":infosection.getElementsByClassName("profilehead")[0].textContent, "c":chips})
                }
            }
            if (sections.length > 0) {
                addingdate.sections = sections
            }
            let user = existingpeople.length
            if (edit) {
                existingpeople[usearch] = addingdate
                user = usearch
                
            } else {
                existingpeople.push(addingdate)
            }
            localStorage.setItem('tabspeople', JSON.stringify(existingpeople));
            addbutton.textContent = "Added"
            if (edit) {
                addbutton.textContent = "Done"
            }
            
            refreshdata()
            window.location.href = `profile?q=${searchQuery}&u=${user}`
        } catch (e) {
            addbutton.textContent = "Failed"
            viewerror(e)
        }
        
        addbutton.classList.remove("adding");

        sleep(1000).then(()=>{
            if (!addbutton.classList.contains("adding")) {
                addbutton.textContent = "Add Profile"; 
                if (edit) {
                    addbutton.textContent = "Confirm Changes"; 
                }
            }
        })
    }
})

for (let place of chipspots) {
    const spot = place.getElementsByClassName("chipspot")[0]
    const addelement = document.createElement("div");
    addelement.classList.add("infochip");
    addelement.classList.add("addchip");
    const titlename = place.getElementsByClassName("profilehead")[0].textContent
    if (edit && sectionname.includes(titlename)) {
        for (let chip of profiledata.sections[sectionname.indexOf(titlename)].c) {
            if (chip.t === "default") {
                const chipelem = addchip(spot, addelement)
                replacedefaultchip(chipelem, chip.h, chip.c)
            }
            else if (chip.t === "birthdate") {
                const chipelem = addchip(spot, addelement)
                replacebithdatechip(chipelem, chip.c)
            }
            else if (chip.t === "calendar") {
                const chipelem = addchip(spot, addelement)
                replacecalendarchip(chipelem, chip.h, chip.c)
            }
            else if (chip.t === "length") {
                const chipelem = addchip(spot, addelement)
                replacelengthchip(chipelem, chip.h, chip.c.v, chip.c.u)
            }
            else if (chip.t === "weight") {
                const chipelem = addchip(spot, addelement)
                replaceweightchip(chipelem, chip.h, chip.c.v, chip.c.u)
            }
            else if (chip.t === "family") {
                const chipelem = addchip(spot, addelement)
                replacefamilychip(chipelem, chip.h, chip.c)
            }
            else if (chip.t === "interest") {
                const chipelem = addchip(spot, addelement)
                replaceinterestchip(chipelem, chip.h)
            }
        }
    }

    const addicon = document.createElement("img");
    addicon.src = "images/icons/add.png";
    addicon.classList.add("addimg")
    addelement.addEventListener("click", ()=>{
        addchip(spot, addelement)
    });

    addelement.appendChild(addicon);
    spot.appendChild(addelement);
}
