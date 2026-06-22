// Notes Array
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Welcome Screen
function openAuth() {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("authScreen").style.display = "block";

    checkAuth();
}

// Check Authentication
function checkAuth() {
    const savedPassword = localStorage.getItem("appPassword");

    if (!savedPassword) {
        document.getElementById("createPasswordSection").style.display = "block";
        document.getElementById("loginSection").style.display = "none";
    } else {
        document.getElementById("createPasswordSection").style.display = "none";
        document.getElementById("loginSection").style.display = "block";
    }
}

// Create Password
function createPassword() {
    const pass = document.getElementById("newPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (pass === "" || confirm === "") {
        alert("Please fill all fields.");
        return;
    }

    if (pass !== confirm) {
        alert("Passwords do not match.");
        return;
    }

    localStorage.setItem("appPassword", pass);

    alert("Password created successfully!");

    document.getElementById("createPasswordSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";

    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";
}

// Login
function login() {
    const pass = document.getElementById("loginPassword").value;
    const savedPassword = localStorage.getItem("appPassword");

    if (pass === savedPassword) {
        document.getElementById("authScreen").style.display = "none";
        document.getElementById("appContent").style.display = "block";

        displayNotes();
    } else {
        alert("Incorrect Password.");
    }
}

// Add Note
function addNote() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (title === "" || content === "") {
        alert("Please fill all fields.");
        return;
    }

    notes.push({
        title: title,
        content: content,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("notes", JSON.stringify(notes));

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    displayNotes();
}

// Display Notes
function displayNotes(filtered = notes) {
    const notesDiv = document.getElementById("notes");

    notesDiv.innerHTML = "";

    if (filtered.length === 0) {
        notesDiv.innerHTML = "<p>No notes found.</p>";
        return;
    }

    filtered.forEach((note, index) => {
        notesDiv.innerHTML += `
            <div class="note">
                <h3>${note.title}</h3>

                <p>${note.content}</p>

                <small>${note.date}</small><br><br>

                <button onclick="editNote(${index})">
                    ✏️ Edit
                </button>

                <button onclick="deleteNote(${index})">
                    🗑️ Delete
                </button>
            </div>
        `;
    });
}

// Delete Note
function deleteNote(index) {
    if (confirm("Are you sure you want to delete this note?")) {
        notes.splice(index, 1);

        localStorage.setItem("notes", JSON.stringify(notes));

        displayNotes();
    }
}

// Edit Note
function editNote(index) {
    document.getElementById("title").value = notes[index].title;
    document.getElementById("content").value = notes[index].content;

    notes.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();
}

// Search Notes
function searchNotes() {
    const keyword = document.getElementById("search").value.toLowerCase();

    const filtered = notes.filter(note =>
        note.title.toLowerCase().includes(keyword) ||
        note.content.toLowerCase().includes(keyword)
    );

    displayNotes(filtered);
}

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Initial Load
window.onload = function () {
    document.getElementById("welcomeScreen").style.display = "flex";
    document.getElementById("authScreen").style.display = "none";
    document.getElementById("appContent").style.display = "none";
};