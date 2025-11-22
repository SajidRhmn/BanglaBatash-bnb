let taxSwitch = document.getElementById("flexSwitchCheckDefault");
taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    for (let i of taxInfo) {
        if (window.getComputedStyle(i).display === "none") {
            i.style.display = "inline";
        } else {
            i.style.display = "none";
        }
    }
});
