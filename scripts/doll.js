$(document).ready(function () {
    var doll = $(".doll")[Math.trunc(Math.random() * $(".doll").length)];

    $(doll).css("visibility", "visible");
});
