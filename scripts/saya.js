function sayaMode() {
  $("body").css("background", "url(/assets/dawa1.gif)");
  $(".content").css("background-color", "#400000");
  $(".content").css("filter", "drop-shadow(0 0 8px #6e2a2a)");
  $(".content-boxbg").css("background-color", "#6e2a2a");
  $("p, h1, h2, h3, a, i, span").css("color", "#d44848");
  $("a").hover(function() {
    $(this).css("filter", "drop-shadow(0 0 5px #d44848)");
  }, function() {
    $(this).css("filter", "none");
  });
  $(".gallery").css("filter", "none");
  $(".gallery").hover(function() {
    $(this).css("filter", "drop-shadow(0 0 10px #d44848)");
  }, function() {
    $(this).css("filter", "none");
  });
  $("#kitty-tail").attr("src", "/assets/blobber.gif");
  $("#kitty-tail").css("top", "20px");
  $("#berry-button").attr("src", "/assets/meaty.gif");
  $("#berry-button").css("filter", "none");
  $("#brand-sub").text("Welcome home!");
  $("#news-parent").css("border-bottom", "2px solid #6e2a2a");
  $("#fufu-plush").attr("src", "/assets/saya1.png");
  $("#fufu-plush").css("transform", "unset");
  $("#fufu-plush").css("height", "250px");
  $("#fufu-plush").css("right", "5px");
  $("#fufu-plush").css("bottom", "-5px");
  $("#longflowers-decor").css("background", "url(/assets/blood.gif)");
  $("#longflowers-decor").css("margin-left", "10px");
  $("#longflowers-decor").css("margin-right", "10px");
  $("#soggy-header").css("margin-bottom", "0");
  $("#welcome-kitty").attr("src", "/assets/brain.gif");
  $("#welcome-kitty").css("width", "200px");
  $("#welcome-kitty").css("height", "auto");
  $("body").css("cursor", "url(/assets/eye.png), auto");

  var icons = $(".content-icon");
  icons[0].src = "/assets/instagram_dawa.png";
  icons[1].src = "/assets/toyhouse_dawa.svg";
  icons[2].src = "/assets/furaffinity_dawa.png";
  icons[3].src = "/assets/itaku_dawa.png";
  icons[4].src = "/assets/linktree_dawa.png";
}

$(document).ready(function() {
  $("#buttons").children().each(function() {
    var link = $(this);
    var img = link.children()[0];

    if (img.src.endsWith("dawa.gif")) {
      link.css("cursor", "pointer");
      link.on("click", sayaMode);
    }
  });
});
