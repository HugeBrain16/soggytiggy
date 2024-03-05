var modal = document.createElement("div");
var modalClose = document.createElement("span");

modal.classList.add("modal");
modalClose.classList.add("modal-close");
modalClose.innerHTML = "&times;";

modal.appendChild(modalClose);
document.body.appendChild(modal);

function openModal(img) {
  var modalContent = document.createElement("img");
  var oldModalContent = modal.getElementsByTagName("img")[0];

  if (oldModalContent) oldModalContent.remove();
  modalContent.classList.add("modal-content");
  modal.appendChild(modalContent);
  modal.style.display = "flex";
  modalContent.src = img;
}

document.body.appendChild(modal);
modalClose.onclick = function () {
  modal.style.display = "none";
};

function getImage(url) {
  var result = "";
  var string = url.split("").reverse().join("");
  var skipmode = false;
  var skipped = false;

  for (let c of string) {
    if (skipmode) {
      skipmode = false;
      continue;
    }

    if (c === "." && !skipped) {
      skipmode = true;
      skipped = true;
    }

    result += c;
  }

  return result.split("").reverse().join("");
}

window.onload = function () {
  var thumbs = document.getElementsByClassName("gallery-thumbnail");

  for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].onclick = function () {
      openModal(getImage(thumbs[i].style.backgroundImage.split(/"/)[1]));
    };
  }
};
