var acc = document.getElementsByClassName("accordion");
var videoLinks = document.getElementsByClassName("video-link");
var videoPlayer = document.getElementById("videoPlayer");
var videoTitle = document.getElementById("videoTitle");
var progressElement = document.querySelector(".progress");
var notesArea = document.getElementById("notesArea");

// Track the progress of the video
var videoProgress = {};
var completedModules = new Set();

// Initialize progress tracking for each video
function initializeProgressTracking() {
  for (var i = 0; i < videoLinks.length; i++) {
    var videoId = videoLinks[i].getAttribute("data-video-id");
    videoProgress[videoId] = 0; // 0% progress by default
  }
}
initializeProgressTracking();

// Save progress to local storage
function saveProgress() {
  localStorage.setItem("videoProgress", JSON.stringify(videoProgress));
  localStorage.setItem(
    "completedModules",
    JSON.stringify(Array.from(completedModules))
  );
}

// Load progress from local storage
function loadProgress() {
  var savedProgress = localStorage.getItem("videoProgress");
  var savedModules = localStorage.getItem("completedModules");

  if (savedProgress) {
    videoProgress = JSON.parse(savedProgress);
  }

  if (savedModules) {
    completedModules = new Set(JSON.parse(savedModules));
    updateModuleCompletion();
  }
}
loadProgress();

// Update module completion based on progress
function updateModuleCompletion() {
  var sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    var sectionId = section.querySelector(".accordion").textContent;
    var allCompleted = Array.from(
      section.querySelectorAll(".video-link")
    ).every((link) => {
      var videoId = link.getAttribute("data-video-id");
      return videoProgress[videoId] >= 100; // Check if video is completed
    });

    if (allCompleted) {
      completedModules.add(sectionId);
    } else {
      completedModules.delete(sectionId);
    }
  });

  saveProgress();
}

// Track video progress
function trackVideoProgress(videoId, progress) {
  videoProgress[videoId] = progress;
  saveProgress();
}

// Event listeners for accordion and video links
for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

for (var j = 0; j < videoLinks.length; j++) {
  videoLinks[j].addEventListener("click", function () {
    var videoId = this.getAttribute("data-video-id");
    var title = this.textContent;
    videoPlayer.src =
      "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
    videoTitle.textContent = title;

    // Update progress tracking (example: 50% completion for demo purposes)
    trackVideoProgress(videoId, 50);
  });
}

// Add notes functionality
document.getElementById("saveNoteBtn").addEventListener("click", function () {
  var noteText = document.getElementById("noteInput").value;
  var videoId = videoPlayer.src.split("/").pop().split("?")[0];
  if (videoId && noteText) {
    var notes = JSON.parse(localStorage.getItem("videoNotes")) || {};
    if (!notes[videoId]) {
      notes[videoId] = [];
    }
    notes[videoId].push(noteText);
    localStorage.setItem("videoNotes", JSON.stringify(notes));
    updateNotesDisplay();
  }
});

function updateNotesDisplay() {
  var videoId = videoPlayer.src.split("/").pop().split("?")[0];
  var notes = JSON.parse(localStorage.getItem("videoNotes")) || {};
  var notesList = document.getElementById("notesList");
  notesList.innerHTML = "";

  if (videoId && notes[videoId]) {
    notes[videoId].forEach((note) => {
      var listItem = document.createElement("li");
      listItem.textContent = note;
      notesList.appendChild(listItem);
    });
  }
}

updateNotesDisplay(); // Load notes on page load
