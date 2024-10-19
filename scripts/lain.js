function lainMode() {
  $("#welcome-kitty").attr("src", "/assets/puter.gif");
  $(".content").css("background-color", "#000");
  $(".content").css("filter", "drop-shadow(0 0 3px #00ff00)");
  $(".content-boxbg").css("background-color", "#001100");
  $("p, h1, h2, h3, a, i, span").css("color", "#00ff00");
  $("a").hover(function() {
    $(this).css("filter", "drop-shadow(0 0 5px #00ff00)");
  }, function() {
    $(this).css("filter", "none");
  });
  $(".gallery").css("filter", "none");
  $(".gallery").hover(function() {
    $(this).css("filter", "drop-shadow(0 0 5px #00ff00)");
  }, function() {
    $(this).css("filter", "none");
  });
  $("#buttons a").css("filter", "none");
  $("#berry-button").attr("src", "/assets/dvd.gif");
  $("#berry-button").css("filter", "none");
  $("#kitty-tail").attr("src", "/assets/skull.gif");
  $("#fufu-plush").hide();
  $("body").css("background-image", "url(/assets/haxx.gif)");
  $("body").css("background-size", "30%");
  $("#brand-sub").html("Connecting to The Wired<span id='brand-subby'></span>");
  $("#longflowers-decor").css("background-image", "url(/assets/pulse.gif)");
  $("#longflowers-decor").css("background-size", "100% 100%");
  $("#news-parent").css("border-bottom", "2px solid #00ff00");

  setInterval(function() {
    var subby = $("#brand-subby");
    if (subby.text().length < 3)
      subby.text(subby.text() + ".");
    else
      subby.text("");
  }, 1000);

  var icons = $(".content-icon");
  icons[0].src = "/assets/instagram_glow.png";
  icons[1].src = "/assets/toyhouse_glow.svg";
  icons[2].src = "/assets/furaffinity_glow.png";
  icons[3].src = "/assets/itaku_glow.png";
  icons[4].src = "/assets/linktree_glow.png";
}

$(document).ready(function() {
  $("#buttons").children().each(function() {
    var link = $(this);
    var img = link.children()[0];

    if (img.src.endsWith("lain.gif")) {
      link.css("cursor", "pointer");
      link.on("click", lainMode);
    }
  });
});
