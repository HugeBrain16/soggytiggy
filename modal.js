var modal = document.createElement("div");
var modalClose = document.createElement("span");
var modalContent = document.createElement("img");

modal.classList.add("modal");
modalClose.classList.add("modal-close");
modalClose.innerHTML = "&times;";
modalContent.classList.add("modal-content");

modal.appendChild(modalClose);
modal.appendChild(modalContent);
document.body.appendChild(modal);

function openModal(img) {
  modal.style.display = "flex";
  modalContent.src = img;
}

document.body.appendChild(modal);
modalClose.onclick = function() {
  modal.style.display = "none";
}

document.body.onload = function() {
  var thumbs = document.getElementsByClassName("thumbnail");

  for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].onclick = function() {
      openModal(thumbs[i].src);
    }
  }
}
