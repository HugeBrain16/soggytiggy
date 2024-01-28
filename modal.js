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
modalClose.onclick = function () {
  modal.style.display = "none";
};

function getImage(url) {
  var result = "";
  var string = url.split("").reverse().join("");
  var skipmode = false;

  for (let c of string) {
    if (skipmode) {
      skipmode = false;
      continue;
    }

    if (c === ".") skipmode = true;
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
