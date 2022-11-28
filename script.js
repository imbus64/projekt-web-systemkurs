/*
 * "data" is the json object that is loaded by the HTML. It contains values from the pages.json
*/

// Adds a link to the navigation bar
// Keep names short due to overflow
function add_link(name, destination) {
    let navbar = document.getElementById("link-list");
    let link = document.createElement("li");
    link.innerText = name;

    let a = document.createElement("a");
    a.href = destination;

    a.appendChild(link);
    a.addEventListener("click", () => {
        // Hack to make internal link actually update before we read it in link_handler
        window.location.hash = destination;
        link_handler();
    })
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

// This method removes the "loading cover"
function rem_cov() {
    let cover = document.getElementById("page-cover");
    cover.style.transition = "visibility 0s linear 300ms, opacity 300ms"
    cover.style.opacity = 0;
    cover.style.visibility = "hidden";
}

// Displays links
for (link of data["links"]) {
    add_link(link.name, link.href);
}

// Clears the page "canvas" called main and then retrieves the internal link "hash" of the url.
// The "hash" then determines which render function is called.
function link_handler() {
    // If the page already has a hash it means that we are changing pages -> it is not our initial visit.
    // This means that we should clear it before rendering another.
    if (window.location.hash) document.getElementById("main").innerHTML = "";

    switch (window.location.hash) {
        case "#1": render_main(); break;
        case "#2": render_second(); break;
        case "#3": ; break; // Uninmplemented
        case "#4": ; break; // Uninmplemented
        case "": render_main(); break;
        default: render_error(); break;
    }
}

// Responsible for inserting all elements associated with the main page
function render_main() {
    // Insert all posts.
    for (post of data["posts"]) {
        insert_text_area(post["title"], post["content"]);
    }
}

function render_second() {
    let main_area = document.getElementById("main");
    main_area.innerText = "Sida 2";
}

// Default "404" page
function render_error() {
    console.log("Invalid page");
    let main_area = document.getElementById("main");
    main_area.innerText = "Invalid page: 404";
}

// Call initial link_handler to render main page on first visit
link_handler();

// Make javascript remove the "loading cover" when site is fully loaded
document.addEventListener("DOMContentLoaded", rem_cov);
