// 🌙 Theme toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// 💡 Motivation quotes
const quotes = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "Hospitality is making your guests feel at home, even if you wish they were.",
  "Great leaders don’t set out to be leaders, they set out to make a difference.",
  "Excellence is not an act, but a habit.",
  "The secret of joy in work is contained in one word — excellence."
];
document.getElementById("newMotivationBtn").addEventListener("click", () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("motivationQuote").textContent = "${randomQuote}";
});

// 📝 Notes with localStorage
const noteForm = document.getElementById("noteForm");
const notesList = document.getElementById("notesList");
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  notesList.innerHTML = "";
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${note.title}</strong> (${note.category})<br>${note.content}<br><small>Tags: ${note.tags}</small>
      <br><button onclick="deleteNote(${index})">Delete</button>`;
    notesList.appendChild(li);
  });
}
noteForm.addEventListener("submit", e => {
  e.preventDefault();
  const newNote = {
    title: document.getElementById("noteTitle").value,
    content: document.getElementById("noteContent").value,
    tags: document.getElementById("noteTags").value,
    category: document.getElementById("noteCategory").value
  };
  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
  noteForm.reset();
});
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}
renderNotes();

// 📅 Activities with localStorage
const activityForm = document.getElementById("activityForm");
const activitiesList = document.getElementById("activitiesList");
let activities = JSON.parse(localStorage.getItem("activities")) || [];

function renderActivities() {
  activitiesList.innerHTML = "";
  activities.forEach((act, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${act.title}</strong> (${act.date}) [${act.category}]<br>${act.desc}<br><small>Tags: ${act.tags}</small>
      <br><button onclick="deleteActivity(${index})">Delete</button>`;
    activitiesList.appendChild(li);
  });
}
activityForm.addEventListener("submit", e => {
  e.preventDefault();
  const newActivity = {
    title: document.getElementById("activityTitle").value,
    date: document.getElementById("activityDate").value,
    desc: document.getElementById("activityDesc").value,
    tags: document.getElementById("activityTags").value,
    category: document.getElementById("activityCategory").value
  };
  activities.push(newActivity);
  localStorage.setItem("activities", JSON.stringify(activities));
  renderActivities();
  activityForm.reset();
});
function deleteActivity(index) {
  activities.splice(index, 1);
  localStorage.setItem("activities", JSON.stringify(activities));
  renderActivities();
}
renderActivities();

// 📷 Upload & display personal photos
const photoInput = document.getElementById("photoInput");
const myPhotosList = document.getElementById("myPhotosList");
let myPhotos = JSON.parse(localStorage.getItem("myPhotos")) || [];

function renderMyPhotos() {
  myPhotosList.innerHTML = "";
  myPhotos.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("gallery-img");
    const wrapper = document.createElement("div");
    wrapper.appendChild(img);
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      myPhotos.splice(index, 1);
      localStorage.setItem("myPhotos", JSON.stringify(myPhotos));
      renderMyPhotos();
    };
    wrapper.appendChild(delBtn);
    myPhotosList.appendChild(wrapper);
  });
}
photoInput.addEventListener("change", e => {
  const files = Array.from(e.target.files);
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      myPhotos.push(reader.result);
      localStorage.setItem("myPhotos", JSON.stringify(myPhotos));
      renderMyPhotos();
    };
    reader.readAsDataURL(file);
  });
});
renderMyPhotos();
