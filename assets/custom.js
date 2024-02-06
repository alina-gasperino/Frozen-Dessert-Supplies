$(document).ready(function () {
    $(".variant-input label").each(function() {
        $(this).click(function() {
            var value = $(this).text()
            $(this).closest(".variant-wrapper").find(".var_val").text(value)
        })
    })

    $(".add-to-cart-2").click(function() {
        $(".product-single__form .btn.btn--full.add-to-cart").click()
    })
});