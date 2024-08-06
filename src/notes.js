function toggleSection(sectionNumber) {
    var content = document.getElementById('section-' + sectionNumber);
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

