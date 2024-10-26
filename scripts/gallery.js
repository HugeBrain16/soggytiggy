var modal = document.createElement("div");
var modalClose = document.createElement("span");
var page = 1;
const hiddenTags = ["gore", "nsfw"];

modal.classList.add("modal");
modalClose.classList.add("modal-close");
modalClose.innerHTML = "&times;";
modalClose.style.position = "fixed";

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
  var gallery = document.createElement("img");

  gallery.classList.add("gallery");
  gallery.setAttribute("imagelink", image["link"]);
  gallery.setAttribute("postDate", image["date"]);
  if (image["tags"] !== undefined) {
    gallery.setAttribute("tags", image["tags"]);

    if (filterImage(image)) {
      gallery.style.display = "none";
      gallery.classList.add("gallery-nsfw");
    }
  }
  gallery.src = getThumbnail(image["link"]);
  gallery.style.objectPosition = (image["crop"] === undefined || image["crop"] === "default") ? "top center" : image["crop"];

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
  $(".gallery").remove();
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
          openModal(gallery.getAttribute("imagelink"));
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
    })
    .catch((error) => {
      console.error("Error loading images:", error);
    });
}
