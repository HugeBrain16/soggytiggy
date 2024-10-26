function lainMode() {
  var divider = $($(".content-divider")[0]);

  $(".content").css({
    "background-color": "#000",
    "filter": "drop-shadow(0 0 3px #00ff00)"
  });
  $("body").css({
    "background-image": "url(/assets/haxx.gif)",
    "background-size": "30%",
    "font-family": "nouveau-ibm, sans-serif"
  });
  divider.css({
    "background": "url(/assets/pulse.gif)",
    "background-size": "100% 100%"
  });
  $("#berry-button").attr("src", "/assets/dvd.gif");
  $("#berry-button").css({
    "filter": "none",
    "top": "30px"
  });
  $("#brand-sub").html("Connecting to The Wired<span id='brand-subby'></span>");
  $("#brand-sub").css({
    "font-size": "15px",
    "padding-bottom": "20px"
  });
  $("#brand").css({
    "font-size": "40px",
    "padding-top": "10px"
  });

  $("#welcome-kitty").attr("src", "/assets/puter.gif");
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
  $("#kitty-tail").attr("src", "/assets/skull.gif");
  $("#fufu-plush").hide(); 
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
