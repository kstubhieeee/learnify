let pdfDoc = null,
  pageNum = 1,
  pageRendering = false,
  pageNumPending = null,
  scale = 1.5,
  canvas = document.getElementById("pdf-canvas"),
  ctx = canvas.getContext("2d");

function renderPage(num) {
  pageRendering = true;
  pdfDoc.getPage(num).then(function (page) {
    let viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    let renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };

    let renderTask = page.render(renderContext);
    renderTask.promise.then(function () {
      pageRendering = false;
      if (pageNumPending !== null) {
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  document.getElementById("page-num").textContent = num;
}

function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

function onPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}

function onNextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}

document.getElementById("prev-page").addEventListener("click", onPrevPage);
document.getElementById("next-page").addEventListener("click", onNextPage);

function loadPdf(path) {
  var loadingTask = pdfjsLib.getDocument(path);
  loadingTask.promise.then(function (pdf) {
    pdfDoc = pdf;
    document.getElementById("page-count").textContent = pdf.numPages;
    pageNum = 1;
    renderPage(pageNum);

    document.getElementById("download-pdf").onclick = function () {
      const link = document.createElement("a");
      link.href = path;
      link.download = path.split("/").pop();
      link.click();
    };
  });
}

function toggleSection(sectionNumber) {
  var content = document.getElementById("section-" + sectionNumber);
  if (content.style.display === "block" || content.style.display === "") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}

document.querySelectorAll(".complete-check").forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      this.previousElementSibling.classList.add("complete");
    } else {
      this.previousElementSibling.classList.remove("complete");
    }
  });
});
