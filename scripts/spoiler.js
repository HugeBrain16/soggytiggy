$(document).ready(function() {
	$(".spoiler").each(function() {
		const content = $(this).html();

		if (!$(this).hasClass("spoiler-hidden"))
			$(this).addClass("spoiler-hidden");

		$(this).attr("spoiler-content", content);
		$(this).html("");

		$(this).on("click", function() {
			if ($(this).hasClass("spoiler-hidden")) {
				$(this).removeClass("spoiler-hidden");
				$(this).addClass("spoiler-shown");

				$(this).html($(this).attr("spoiler-content"));
				$(this).attr("spoiler-content", "");
			} else if ($(this).hasClass("spoiler-shown")) {
				$(this).removeClass("spoiler-shown");
				$(this).addClass("spoiler-hidden");

				$(this).attr("spoiler-content", $(this).html());
				$(this).html("");
			}
		})
	});
});