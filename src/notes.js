function toggleSection(sectionNumber) {
  var content = document.getElementById("section-" + sectionNumber);
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}

document
  .querySelectorAll('.file-upload input[type="file"]')
  .forEach((input) => {
    input.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("pdf-frame").src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  });
