function showMoreOnclick() {
    var contentElements = document.querySelectorAll(".see-more-collection");
    var btnElement = document.querySelectorAll(".see-more-collection-btn")[0];

    if (contentElements[0].style.display === "none") {
        contentElements.forEach((contentElement) => {
            contentElement.style.display = "block";
        });
        btnElement.innerHTML = "See Less";
    } else {
        contentElements.forEach((contentElement) => {
            contentElement.style.display = "none";
        });
        btnElement.innerHTML = "See More";
    }
}