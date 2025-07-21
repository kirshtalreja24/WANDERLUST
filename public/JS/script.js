document.addEventListener("DOMContentLoaded", function () {
    const deleteForms = document.querySelectorAll(".delete-form");
    const modal = document.getElementById("confirmModal");
    const yesBtn = document.getElementById("confirmYes");
    const noBtn = document.getElementById("confirmNo");

    let currentForm = null;

    deleteForms.forEach((form) => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            currentForm = form;
            modal.style.display = "block"; // Show modal
        });
    });

    yesBtn.addEventListener("click", function () {
        modal.style.display = "none";
        if (currentForm) currentForm.submit();
    });

    noBtn.addEventListener("click", function () {
        modal.style.display = "none";
        currentForm = null;
        window.location.href = "/listings";
    });
});
