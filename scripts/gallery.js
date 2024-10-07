var modal = document.createElement("div");
var modalClose = document.createElement("span");

modal.classList.add("modal");
modalClose.classList.add("modal-close");
modalClose.innerHTML = "&times;";

modal.appendChild(modalClose);
document.body.insertBefore(
  modal,
  document.getElementsByClassName("content-floatsie")[0],
);

function openModal(img) {
  var modalContent = document.createElement("img");
  var oldModalContent = modal.getElementsByTagName("img")[0];

  if (oldModalContent) oldModalContent.remove();
  modalContent.classList.add("modal-content");
  modal.appendChild(modalContent);
  modal.style.display = "flex";
  modalContent.src = img;
}

modalClose.onclick = function () {
  modal.style.display = "none";
};

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modal.style.display = "none";
  }
});

function loadImages(file) {
  const timestamp = new Date().getTime();
  const url = `${file}?timestamp=${timestamp}`;

  return fetch(url)
    .then((response) => response.text())
    .then((images) => {
      var lines = images.split("\n");
      var result = [];

      for (let line of lines) {
        let image = {};
        line = line.trim();

        if (line.startsWith("#") || line === "") continue;

        let _image = line.split("|");
        if (_image.length < 2) continue;
        image["link"] = _image[0].trim();
        image["date"] = _image[1].trim();

        if (Object.keys(image).length !== 0) result.push(image);
      }

      return result;
    })
    .catch((error) => {
      console.error("Error reading file:", error);
    });
}

function getThumbnail(url) {
  var result = "";
  var string = url.split("").reverse().join("");
  var added = false;

  for (let c of string) {
    result += c;

    if (c === "." && !added) {
      result += "m";
      added = true;
    }
  }

  return result.split("").reverse().join("");
}

function createImage(image) {
  var gallery = document.createElement("div");

  gallery.classList.add("gallery");
  gallery.setAttribute("imagelink", image["link"]);
  gallery.setAttribute("postDate", image["date"]);
  gallery.style.backgroundImage = `url('${getThumbnail(image["link"])}')`;

  return gallery;
}

function sortPosts(posts, old = false) {
  posts.sort(function (a, b) {
    const dateA = new Date(a.getAttribute("postDate"));
    const dateB = new Date(b.getAttribute("postDate"));

    if (old) return dateA - dateB;
    else return dateB - dateA;
  });
}

function clearPosts() {
  var posts = document.getElementsByClassName("gallery");

  while (posts.length > 0) {
    posts[0].remove();
  }
}

function loadPost(old = false, max = 0) {
  var content = document.getElementsByClassName("gallery-content")[0];
  var maxPost = 0;

  loadImages("gallery.txt")
    .then((images) => {
      var posts = [];
      for (let image of images) {
        let gallery = createImage(image);
        gallery.onclick = function () {
          openModal(gallery.getAttribute("imagelink"));
        };
        posts.push(gallery);
      }
      sortPosts(posts, old);

      clearPosts();
      for (let post of posts) {
        if (maxPost >= max && max !== 0)
          break;
        content.appendChild(post);
        maxPost++;
      }
    })
    .catch((error) => {
      console.error("Error loading images:", error);
    });
}
