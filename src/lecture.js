var acc = document.getElementsByClassName("accordion");
var videoLinks = document.getElementsByClassName("video-link");
var videoPlayer = document.getElementById("videoPlayer");
var videoTitle = document.getElementById("videoTitle");

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
  });
}
