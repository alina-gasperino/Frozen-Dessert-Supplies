$(document).ready(function () {
    $(".variant-input label").each(function() {
        $(this).click(function() {
            var value = $(this).text()
            $(this).closest(".variant-wrapper").find(".var_val").text(value)
        })
    })
});