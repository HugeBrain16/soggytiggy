function sayaMode() {
  var divider = $($(".content-divider")[0]);

  $(".content").css({
    "background-color": "#400000",
    "filter": "drop-shadow(0 0 8px #6e2a2a)"
  });
  $("body").css({
    "background": "url(/assets/dawa1.gif)",
    "cursor": "url(/assets/eye.png), auto",
    "font-family": "creaked, sans-serif"
  });
  $("#kitty-tail").attr("src", "/assets/blobber.gif");
  $("#kitty-tail").css({
    "bottom": "0",
    "top": "unset",
    "width": "85px"
  });
  $("#fufu-plush").attr("src", "/assets/saya1.png");
  $("#fufu-plush").css({
    "transform": "unset",
    "height": "250px",
    "right": "5px",
    "bottom": "-5px"
  });
  divider.css({
    "background": "url(/assets/blood.gif)",
    "margin-left": "10px",
    "margin-right": "10px"
  });
  $("#berry-button").attr("src", "/assets/meaty.gif");
  $("#berry-button").css({
    "filter": "none",
    "top": "unset",
    "bottom": "0"
  });
  $("#welcome-kitty").attr("src", "/assets/brain.gif");
  $("#welcome-kitty").css({
    "width": "200px",
    "height": "auto",
    "cursor": "pointer"
  });
  $("#welcome-kitty").on("click", function() {
    window.open("https://github.com/hugebrain16", "_blank");
  });

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

  $(".content-boxbg").css("background-color", "#6e2a2a");  
  $("#brand-sub").text("Welcome home!");
  $("#brand-sub").css("padding-bottom", "25px");
  $("#brand").css("padding-top", "20px");
  $("#news-parent").css("border-bottom", "2px solid #6e2a2a"); 
  $("#soggy-header").css("margin-bottom", "0"); 

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
