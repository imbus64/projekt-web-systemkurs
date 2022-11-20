console.log("Executing");

// Adds a link to the navigation bar
// Keep names short due to overflow
function add_link(name, destination) {
    let navbar = document.getElementById("link-list");
    let link = document.createElement("li");
    link.innerText = name;

    let a = document.createElement("a");
    a.href = destination;

    a.appendChild(link);
    navbar.appendChild(a);
}

// Function to add a section to the main content area
function insert_text_area(title, text) {
    let main_area = document.getElementById("main");
    let link = document.createElement("div");
    link.classList.add("text-section");

    header = document.createElement("h2");
    header.innerText = title;
    link.appendChild(header);
    link.innerHTML += text;
    main_area.appendChild(link);
}

add_link("Startsida", "#1");
add_link("Våra Delmål", "#2");
add_link("Samarbete", "#3");
add_link("Kontakt", "#4");

for (a = 0; a < 2; a++) {
    insert_text_area("Titel", "Hejsan svejsan");
    insert_text_area("Här kan man skriva saker", "Minsann");
    insert_text_area("Väldigt viktigt", "Här ska vi sannerligen fixa saker och ting så att det blir bra.");
}

function rem_cov() {
    let cover = document.getElementById("page-cover");
    cover.style.transition = "visibility 0s linear 300ms, opacity 300ms"
    cover.style.opacity = 0;
    cover.style.visibility = "hidden";
}

document.addEventListener("DOMContentLoaded", rem_cov);