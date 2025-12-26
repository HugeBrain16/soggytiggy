const fufudonHTML = `
<div class="fufudon-card">
    <div id="fufudon-layer-face" class="fufudon-card-item-row">
        <a id="fufudon-face-front" class="fufudon-button fufudon-button-active">Front</a>
        <a id="fufudon-face-back" class="fufudon-button">Back</a>
    </div>
    <img id="fufudon-body" src="" width="320px" height="400px">
    <div id="fufudon-layer-part" class="fufudon-card-item-row">
        <a id="fufudon-layer-outside" class="fufudon-button">Outside</a> 
        <a id="fufudon-layer-veins" class="fufudon-button">Veins</a>
        <a id="fufudon-layer-gas" class="fufudon-button">Gas</a>
        <a id="fufudon-layer-organs" class="fufudon-button">Organs</a>
    </div>
</div>`;

$(document).ready(function() {
    $('<link>', { href: '/styles/fufudon.css', rel: 'stylesheet' }).appendTo('head');
    $("#fufudon-entry").html(fufudonHTML);
    
    var fufudonFace = "front";
    var fufudonLayer = "outside";
    
    function fufudonUpdateBody() {
        if (fufudonFace === "back" && fufudonLayer === "veins")
            $("#fufudon-body").hide();
        else
            $("#fufudon-body").show();
    
        $("#fufudon-body").attr("src", `/assets/${fufudonFace}-${fufudonLayer}.png`);
    }
    
    $("#fufudon-face-front").click(function() {
        fufudonFace = "front";
    
        $(this).addClass("fufudon-button-active");
        $("#fufudon-face-back").removeClass("fufudon-button-active");
    
        fufudonUpdateBody();
    });
    
    $("#fufudon-face-back").click(function() {
        fufudonFace = "back";
        
        $(this).addClass("fufudon-button-active");
        $("#fufudon-face-front").removeClass("fufudon-button-active");
    
        fufudonUpdateBody();
    });
    
    $("#fufudon-layer-part").children().each(function() {
        $(this).hover(function() {
            fufudonLayer = $(this).attr("id").replace("fufudon-layer-", "");
    
            fufudonUpdateBody();
        });
    });

    fufudonUpdateBody();
});
