$(document).ready(function() {
	$(".spoiler").each(function() {
		const spoiler = $(this);
		const content = $(this).html();

		if (!$(this).hasClass("spoiler-hidden"))
			$(this).addClass("spoiler-hidden");

		$(this).html("");

		$(this).append('<div class="spoiler-toggle"></div>');
		$(this).append('<div class="spoiler-content"></div>');
		$(this).find(".spoiler-content").html(content);

		const toggle = $(this).find(".spoiler-toggle");
		toggle.html("Show Spoiler");
		$(this).find(".spoiler-content").hide();

		toggle.on("click", function() {
			if (spoiler.hasClass("spoiler-hidden")) {
				spoiler.removeClass("spoiler-hidden");
				spoiler.addClass("spoiler-shown");

				$(this).html("Hide Spoiler");
				$(this).siblings(".spoiler-content").show();
			} else if (spoiler.hasClass("spoiler-shown")) {
				spoiler.removeClass("spoiler-shown");
				spoiler.addClass("spoiler-hidden");

				$(this).html("Show Spoiler");
				$(this).siblings(".spoiler-content").hide();
			}
		})
	});
});