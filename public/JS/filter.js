 const leftBtn = document.querySelector(".scroll-btn.left");
    const rightBtn = document.querySelector(".scroll-btn.right");
    const filtersContainer = document.getElementById("filters");

    leftBtn.addEventListener("click", () => {
        filtersContainer.scrollBy({ left: -200, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
        filtersContainer.scrollBy({ left: 200, behavior: "smooth" });
    });

    // Tax toggle logic
    const taxSwitch = document.getElementById("switchCheckDefault");
    taxSwitch.addEventListener("click", () => {
        const taxInfo = document.getElementsByClassName("tax-info");
        for (let info of taxInfo) {
            info.style.display = (info.style.display === "inline") ? "none" : "inline";
        }
    });