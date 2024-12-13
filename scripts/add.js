const pfp = document.getElementById('pfp');

const textEdit = document.getElementById('nameInput');

textEdit.addEventListener("focus", () => {
    if (textEdit.classList.contains("placeholder")) {
        textEdit.textContent = "";
        textEdit.focus();
    }
    textEdit.classList.remove("placeholder")
});

textEdit.addEventListener("blur", () => {
    if (textEdit.textContent === "") {
        textEdit.textContent = "John Doe";
        textEdit.classList.add("placeholder");
    }
})

pfp.addEventListener('click', function () {
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
                pfp.src = e.target.result;
            };

            reader.readAsDataURL(file);
        }

    };
});

const descriptionInput = document.getElementById('descriptionInput');
const descriptionDiv = document.getElementById('descriptionDiv');

const descriptionPlaceholderText = "John Doe walks into a room with an air of quiet confidence, quietly commanding the room without a single demand. When he speaks, others can't help but listen, captivated by the pause between his words. And when they leave, they do so by disappearing before anyone notices, like a shadow slipping away."

descriptionInput.textContent = descriptionPlaceholderText;
descriptionInput.classList.add("placeholder");

descriptionInput.addEventListener("focus", () => {
    if (descriptionInput.classList.contains("placeholder")) {
        descriptionInput.textContent = "";
        descriptionInput.focus();
    }
    
    descriptionInput.classList.remove("placeholder")
})

descriptionInput.addEventListener("blur", ()=>{
    if (descriptionInput.textContent === "") {
        descriptionInput.textContent = descriptionPlaceholderText;
        descriptionInput.classList.add("placeholder");
    }
})