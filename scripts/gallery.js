var modal = document.createElement("div");
var modalClose = document.createElement("span");
var modalPrev = document.createElement("span");
var modalNext = document.createElement("span");
var page = 1;
var postLoadPost = function() {};
const hiddenTags = ["gore", "nsfw", "doodle"];
const warnTags = ["gore", "nsfw"];

modal.classList.add("modal");
modalClose.classList.add("modal-close");
modalClose.innerHTML = "&times;";
modalClose.style.position = "fixed";
modalPrev.classList.add("modal-prev");
modalPrev.innerHTML = "&lt;";
modalPrev.style.position = "fixed";
modalNext.classList.add("modal-next");
modalNext.innerHTML = "&gt;";
modalNext.style.position = "fixed";

modal.appendChild(modalClose);
modal.appendChild(modalPrev);
modal.appendChild(modalNext);
document.body.insertBefore(
  modal,
  document.getElementsByClassName("content-floatsie")[0],
);

function addModalImage(image) {
  var oldContent = modal.getElementsByClassName("modal-inner")[0];
  var inner = document.createElement("div");
  var content = document.createElement("div");
  var contentImg = document.createElement("img");
  content.classList.add("modal-inner");
  content.classList.add("modal-content");
  content.classList.add("placeholder");
  content.style.cursor = "unset";
  if (oldContent) oldContent.remove();
  contentImg.addEventListener('click', (event) => {
    if (event.target == contentImg && contentImg.style.opacity === "1") {
      content.classList.toggle("zoomed");
    }
  });
  contentImg.onload = function () {
    content.classList.remove("placeholder");
    contentImg.style.opacity = 1;
    content.style.cursor = "zoom-in";
  };
  content.appendChild(contentImg);
  inner.appendChild(content);
  modal.appendChild(content);
  contentImg.src = image;
}

function openModal(gallery) {
  var modalItem = 0;
  var imageLinks = gallery.getAttribute("imagelinks").split(",");

  if (imageLinks.length > 1) {
    modalPrev.style.visibility = "visible";
    modalNext.style.visibility = "visible";
  }

  modal.style.display = "flex";
  addModalImage(imageLinks[modalItem]);
  modalPrev.addEventListener('click', (event) => {
    if (modalItem > 0) {
      modalItem--;
      addModalImage(imageLinks[modalItem]);
    }
  });

  modalNext.addEventListener('click', (event) => {
    if (modalItem < imageLinks.length - 1) {
      modalItem++;
      addModalImage(imageLinks[modalItem]);
    }
  });
}

modalClose.onclick = function () {
  modal.style.display = "none";
  modalPrev.style.visibility = "hidden";
  modalNext.style.visibility = "hidden";
};

modal.addEventListener('click', (event) => {
  var targetClass = event.target.classList;

  if (targetClass.contains("modal-inner") || targetClass.contains("modal-content")) {
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
        image["links"] = _image[0].trim().split(",");
        image["date"] = _image[1].trim();
        if (_image.length >= 3)
          image["crop"] = _image[2].trim();
        if (_image.length >= 4)
          image["tags"] = _image[3].trim().split(",");

        if (Object.keys(image).length !== 0) result.push(image);
      }

      return result;
    })
    .catch((error) => {
      console.error("Error reading file:", error);
    });
}

function filterImage(image) {
  if (image["tags"] !== undefined)
    return image["tags"].some(filter => hiddenTags.includes(filter));

  return false;
}

function warnImage(image) {
  if (image["tags"] !== undefined)
    return image["tags"].some(filter => warnTags.includes(filter));

  return false;
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
  const container = document.createElement("div");
  container.classList.add("gallery-container");
  container.style.position = "relative";
  container.style.display = "inline-block";

  const gallery = document.createElement("img");
  gallery.classList.add("gallery");
  gallery.classList.add("placeholder");
  gallery.style.objectPosition = image["crop"] === undefined || image["crop"] === "default" ? "top center" : image["crop"];
  container.setAttribute("displaylink", 0);
  container.setAttribute("imagelinks", image["links"].join(","));
  container.setAttribute("postDate", image["date"]);

  if (image["tags"] !== undefined) {
    gallery.setAttribute("tags", image["tags"]);
    if (filterImage(image)) {
      gallery.style.display = "none";
      if (warnImage(image)) gallery.classList.add("gallery-nsfw");
    }
  }

  const galleryL = document.createElement("span");
  galleryL.classList.add("gallery-multiple");
  galleryL.innerHTML = "<i class='fa-solid fa-images'></i>";

  container.appendChild(gallery);
  if (image["links"].length > 1)
    container.appendChild(galleryL);

  gallery.onload = function () {
    gallery.classList.remove("placeholder");
    gallery.style.opacity = 1;
    galleryL.style.opacity = 1;
  };
  gallery.src = getThumbnail(image["links"][0]);

  return container;
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
  $(".gallery-container").remove();
}

function loadPost(old = false, max = 0, filter = false, paged = false) {
  var content = document.getElementsByClassName("gallery-content")[0];
  var maxPost = 0;
  var posts = [];
  var chunks = [];
  var chunk = [];

  loadImages("gallery.txt")
    .then((images) => {
      for (let image of images) {
        if (filterImage(image) && filter === true)
          continue;

        let gallery = createImage(image);

        gallery.onclick = function () {
          openModal(gallery);
        };
        posts.push(gallery);
      }
      sortPosts(posts, old);

      if (paged) {
        for (let post of posts) {
          if (chunk.length === 30) {
            chunks.push(chunk);
            chunk = [];
          } else {
            chunk.push(post);
          }
        }

        if (chunk.length > 0)
          chunks.push(chunk);
      }

      if (page < 1)
        page = 1;
      else if (page > chunks.length)
        page--;

      clearPosts();
      for (let post of (paged ? chunks[page - 1] : posts)) {
        if (maxPost >= max && max !== 0)
          break;
        content.appendChild(post);
        maxPost++;
      }

      if (paged) {
        var pages = $("#gallery-page-pages");
        pages.empty();
        for (var pageX = 1; pageX <= chunks.length; pageX++) {
          let ePage = document.createElement("li");
          if (pageX === page)
            ePage.innerHTML = `<span id='gallery-page-current'>${pageX}</span>`;
          else
            ePage.innerHTML = `<span class="gallery-page-page">${pageX}</span>`;
          pages.append(ePage);
        }
      }

      $("body").off("click", ".gallery-page-page").on("click", ".gallery-page-page", function() {
        page = parseInt($(this).text());
        loadPost(old, max, filter, paged);
      });

      $("#gallery-page-prev").off("click").on("click", function() {
        var currentPage = parseInt($("#gallery-page-current").text());

        page = currentPage - 1;
        if (page < 1)
          return;

        loadPost(old, max, filter, paged);
      });

      $("#gallery-page-next").off("click").on("click", function() {
        var currentPage = parseInt($("#gallery-page-current").text());

        page = currentPage + 1;
        if (page > chunks.length)
          return;

        loadPost(old, max, filter, paged);
      });
      postLoadPost();
    })
    .catch((error) => {
      console.error("Error loading images:", error);
    });
}
