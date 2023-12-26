var modal = document.createElement("div");
var modalClose = document.createElement("span");
var modalContent = document.createElement("img");

modal.classList.add("modal");
modalClose.classList.add("modal-close");
modalClose.innerHTML = "&times;";
modalContent.classList.add("modal-content");

modal.appendChild(modalClose);
modal.appendChild(modalContent);
document.body.insertBefore(
  modal,
  document.getElementsByClassName("nav-top")[0],
);

function openModal(img) {
  modal.style.display = "flex";
  modalContent.src = img;
}

document.body.insertBefore(
  modal,
  document.getElementsByClassName("nav-top")[0],
);
modalClose.onclick = function () {
  modal.style.display = "none";
};

function loadImages(file) {
  return fetch(file)
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

function createImage(image) {
  var gallery = document.createElement("div");

  gallery.classList.add("gallery");
  gallery.setAttribute("imagelink", image["link"]);
  gallery.setAttribute("postDate", image["date"]);
  gallery.style.backgroundImage = `url('${image["link"]}')`;

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

function shufflePosts(posts) {
  for (let i = posts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [posts[i], posts[j]] = [posts[j], posts[i]];
  }
  return posts;
}

function clearPosts() {
  var posts = document.getElementsByClassName("gallery");

  while (posts.length > 0) {
    posts[0].remove();
  }
}

function loadPost(old = false, random = false) {
  var content = document.getElementsByClassName("content")[0];

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

      if (random) {
        posts = shufflePosts(posts);
      } else {
        sortPosts(posts, old);
      }

      clearPosts();
      for (let post of posts) {
        content.appendChild(post);
      }
    })
    .catch((error) => {
      console.error("Error loading images:", error);
    });
}

window.onload = function () {
  loadPost();

  var buttonLatest = document.getElementById("buttonLatest");
  var buttonOldest = document.getElementById("buttonOldest");
  var buttonRandom = document.getElementById("buttonRandom");

  buttonLatest.onclick = function () {
    loadPost();
  };
  buttonOldest.onclick = function () {
    loadPost(true);
  };
  buttonRandom.onclick = function () {
    loadPost(false, true);
  };
};
